const { User, Sede, Document, Client, Product, ProductDocument, Pdf, TipoPago, UnidadMedida } = require("../db");

/***************** CONTROLLERS DEL USUARIO AUTENTICADO *****************/

//Obtener al usuario especificado por id de la DB
const getUserById = async (id) => {
	const user = await User.findByPk(id);
	return user;
};

//Obtener todas las sedes
const getSedes = async () => {
	const sedes = await Sede.findAll();
	return sedes;
};

//Obtener todos los clientes
const getClients = async () => {
	const clients = await Client.findAll();
	return clients;
};

//Obtener todos los productos
const getProducts = async () => {
	const products = await Product.findAll();
	return products;
};

//Obtener todos los productos
const getMeasurementUnits = async () => {
	const measurementUnits = await UnidadMedida.findAll();
	return measurementUnits;
};

//Obtener todos los productos
const getPaymentTypes = async () => {
	const paymentTypes = await TipoPago.findAll();
	return paymentTypes;
};

//Obtener al usuario especificado por id de la DB
const getSedeByCode = async (code) => {
	const sede = await Sede.findOne({where:{code:code}});
	return sede;
};

//Crear un documento
const createDocument = async (      
	precio,
	cantidadMedida,
	retornoCargo, 
	products,      
	UserId,
	sedeCode,
	ClientId,
	TipoPagoId,
	UnidadMedidaId 
) => {	
	const sede = await getSedeByCode(sedeCode);
	const user = await User.findByPk(UserId);
	const client = await Client.findByPk(ClientId);
	const tipoPago = await TipoPago.findByPk(TipoPagoId);
	const unidadMedida = await UnidadMedida.findByPk(UnidadMedidaId);

	if (!sede || !user || !client || !tipoPago || !unidadMedida) {
		throw Error("Values does not exists")
	}else{
		//Crear documento
		let document = await Document.create({      
			precio,
			cantidadMedida,
			retornoCargo,       
			UserId,
			SedeId:sede.id,
			ClientId,
			TipoPagoId,
			UnidadMedidaId
		})
		//obtener todos los productos por nombre y precio
		if (products && products.length>0) {
			for (const productData of products) {
				const {name, amount} = productData;
				// Buscar el producto por nombre
        const product = await Product.findOne({ where: { name } });

				// Asociar el producto al documento con la cantidad
        if (product) {
          await ProductDocument.create({
            DocumentId: document.id,
            ProductId: product.id,
            amountProduct: amount,
          });
        }
			}
		}

		// Calcular el valor para serieRegister utilizando el id generado y actualizando la data
		const serieRegisterValue = document.id + sede.defaultSerieNumber;
		document.serieRegister = serieRegisterValue;
		await document.save();

		//Actualizando el numero de documentos por sede
		sede.amountDocuments = sede.amountDocuments + 1;
		await sede.save();

		// Cargar los productos asociados al documento con sus cantidades
    let documentWithProducts = await Document.findByPk(document.id, {
			attributes: ["id","precio","cantidadMedida","retornoCargo","serieRegister","createdAt","updatedAt" ],
      include: [
        {
          model: Product,
          attributes: ["name", "id", "code", "price"],
          through: { attributes: ['amountProduct'] },
        },
      ],
    });
		//agregando a la respuesta del documento sus objetos relacionales
		documentWithProducts ={
			...documentWithProducts.dataValues,
			sede,
			user,
			client,
			tipoPago,
			unidadMedida
		}
		//retorno el objeto con su numero de registro
		return documentWithProducts;
	}
    
}

//Crear pdf del documento
const createPdf = async(DocumentId, pdfBase64) => {
	const document = await Document.findByPk(DocumentId);
	if (!document) {
		throw Error("Document does not exists");
	}
	const sede = await Sede.findByPk(document.SedeId);
	if(!sede){
		throw Error("Sede does not exists");
	}
	const [pdf, created] = await Pdf.findOrCreate({
		where: {documentBase64: pdfBase64},
		defaults: {}
	})
	//Una vez creado el pdf se asocia con su modelo documento
	if (created) {
		document.PdfId = pdf.id;
		await document.save();

		return pdf;
	}else{
		throw Error("No se creo el pdf en controller")
	}
};

//Obtener el pdf
const getPdf = async (id) => {
	const document = await Document.findOne({
		where:{PdfId:id}
	})
	if (!document) {
		throw Error("No se encontro ningun documento que tenga un pdf con el id");
	}
	const sede = await Sede.findByPk(document.SedeId);
	if(!sede){
		throw Error("Error al encontrar la sede");
	}
	let pdf = await Pdf.findByPk(id);
	if (!pdf) {
		throw Error("No se encontro ningun pdf");
	}
	pdf = {
		...pdf,
		fileName: `${sede.code}-${document.serieRegister}`
	}
	return pdf;
}

module.exports = {
    getUserById,
    getSedes,
		getClients,
		getProducts,
		getMeasurementUnits,
		getPaymentTypes,
    getSedeByCode,
		createDocument,
		createPdf, getPdf
}