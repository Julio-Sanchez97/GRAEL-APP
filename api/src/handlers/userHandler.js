const { getUserById, getSedes, getClients, getProducts, getMeasurementUnits, getPaymentTypes, getSedeByCode, createDocument, createPdf, getPdf } = require("../controllers/userController");

/***************** HANDLERS DEL USUARIO AUTENTICADO *****************/

//Obtener un usuario pasando un uuid
const getUserByIdHandler = async (req,res) => {
    const {userId} = req;
    try {
        const user = await getUserById(userId);
        if (!user) {
            throw Error("No se encontro al usuario");
        }
        //si todo sale bien se obtiene al usuario solicitado
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Crear un archivo luego de enviar el formulario
const createDocumentHandler = async (req,res) => {
    const {        
        precio,
        cantidadMedida,
        retornoCargo, 
        products,      
        UserId,
        sedeCode,
        ClientId,
        TipoPagoId,
        UnidadMedidaId
    } = req.body;
    try{
        if (
            precio<=0 ||
            cantidadMedida<=0||
            typeof retornoCargo !== "boolean" ||
            products.length <= 0 ||
            !UserId||
            !sedeCode ||
            !ClientId ||
            !TipoPagoId ||
            !UnidadMedidaId 
        ){
            throw Error("Invalidated values")
        }else{
            const document = await createDocument(     
                precio,
                cantidadMedida,
                retornoCargo,  
                products,     
                UserId,
                sedeCode,
                ClientId,
                TipoPagoId,
                UnidadMedidaId
            );
            if (!document) {
                throw Error("No se pudo crear el documento");
            }
            res.status(201).json(document);
        }
        
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Almacenar el archivo pdf en base 64 en el documento creado anteriormente
const createPdfHandler = async (req,res) => {
    const {DocumentId, pdfBase64} = req.body;
    try {
        if(!DocumentId || !pdfBase64){
            throw Error("No se pasaron los datos requeridos");
        }
        const pdf = await createPdf(DocumentId, pdfBase64);
        if (!pdf) {
            throw Error("No se creo el pdf en handler");
        }
        //si todo sale bien se obtiene al usuario solicitado
        res.status(200).json(pdf);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Descargar documento pdf
const downloadPdfHandler = async (req,res) => {
    const {id} = req.query
    try {
        if (!id) {
            throw Error("No se paso ningun id")
        }
        const pdf = await getPdf(id);
        if (!pdf) {
            throw Error("No se encontro el pdf");
        }
        //si todo sale bien se obtiene al usuario solicitado
        res.status(200).json(pdf);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
}

//Obtener todas las sedes o obtener la sede si por query me pasan el nombre
const getSedesHandler = async (req,res) => {
    const {code} = req.query;
    try {
        if (code) {
            const sede = await getSedeByCode(code);
            if (!sede) {
                throw Error("No se encontro a la sede con ese codigo");
            }
            //si todo sale bien se obtiene la sede
            res.status(200).json(sede);
        } else {
            const sedes = await getSedes();
            //Se verifica que se halla encontrado alguna sede
            if (sedes.length === 0) {
                throw Error("No se encontro ninguna sede");
            }
            //si todo sale bien se obtiene todas las sedes
            res.status(200).json(sedes);
        }
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Obtener todos los clientes
const getClientsHandler = async (req,res) => {
    try {
        const clients = await getClients();
        //Se verifica que se halla encontrado algun cliente
        if (clients.length === 0) {
            throw Error("No se encontro ningun cliente");
        }
        //si todo sale bien se obtienen todos los clientes
        res.status(200).json(clients);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Obtener todos los productos
const getProductsHandler = async (req,res) => {
    try {
        const products = await getProducts();
        //Se verifica que se halla encontrado algun producto
        if (products.length === 0) {
            throw Error("No se encontro ningun producto");
        }
        //si todo sale bien se obtienen todos las productos
        res.status(200).json(products);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Obtener todas las unidades de medida
const getMeasurementUnitsHandler = async (req,res) => {
    try {
        const measurementUnits = await getMeasurementUnits();
        //Se verifica que se halla encontrado algun unidad de medida de la carga
        if (measurementUnits.length === 0) {
            throw Error("No se encontro ninguna unidad de medida");
        }
        //si todo sale bien se obtienen todas las unidades de medida
        res.status(200).json(measurementUnits);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

//Obtener todos los tipos de pago
const getPaymentTypesHandler = async (req,res) => {
    try {
        const paymentTypes = await getPaymentTypes();
        //Se verifica que se halla encontrado algun tipo de pago
        if (paymentTypes.length === 0) {
            throw Error("No se encontro ningun tipo de pago");
        }
        //si todo sale bien se obtienen todos los tipos de pago
        res.status(200).json(paymentTypes);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};



module.exports = {
    getUserByIdHandler,
    createDocumentHandler,
    createPdfHandler,
    downloadPdfHandler,
    getSedesHandler,
    getClientsHandler,
    getProductsHandler,
    getMeasurementUnitsHandler,
    getPaymentTypesHandler
}