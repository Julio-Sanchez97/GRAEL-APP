//Importar los controllers
const { 
    createUser, 
    createRole,
    loginUser, 
    createSede,
    createProduct,
    createClient,
    createTipoPago,
    createUnidadMedida 
} = require("../controllers/publicControllers");
const jwt = require("jsonwebtoken");
const { SECRET_SESSION } = process.env;

/**************** HANDLERS PUBLICOS ****************/
//Crear un usuario
const createUserHandler = async (req,res) => {
    const { username, name, lastname, email, password, roleId, sedeId } = req.body;
    try{
        if ( !username|| !name || !lastname || !email || !password || !roleId || !sedeId  ) {
            throw Error("Did not pass all data");
        }else{
            const newUser = await createUser(username, name, lastname, email, password, roleId, sedeId);
            if(!newUser){
                throw Error("User was not created");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newUser);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
//Crear un rol del usuario
const createRoleHandler = async (req,res) => {
    const { name, code } = req.body;
    try{
        if ( !name || !code ) {
            throw Error("Did not pass all data");
        }else{
            const role = await createRole(name,code);
            if(!role){
                throw Error("Role could not be created");
            }
            //si todo sale bien se crea un nuevo rol
            res.status(201).json(role);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
//Logueo del usuario
const loginUserHandler = async (req,res) => {
    const { username, password} = req.body;
    try {
        if (!username || !password) {
            throw Error("No se pasaron todos los campos necesarios");
        } else {
            const token = await loginUser(username,password);
            //Decodificando el token para obtner el uuid y role del usuario
            const decodedToken = jwt.verify(token, SECRET_SESSION);
            //Si se identifico correctamente el usuario se recibira un token
            res.status(200).json({
                message: "Usuario autenticado",
                token: token,
                infoToken: decodedToken
            });
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Crear una Sede
const createSedeHandler = async (req,res) => {
    const { code, name, address, email, countryCode, phoneNumber } = req.body;
    try{
        if (!name || !code || !address || !email || !countryCode || !phoneNumber ) {
            throw Error("No se pasaron todos los valores");
        }else{
            const newSede = await createSede(name,code,address,email,countryCode,phoneNumber);
            if(!newSede){
                throw Error("No se pudo crear la sede");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newSede);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Crear un Producto
const createProductHandler = async (req,res) => {
    const { name, code, price, weight } = req.body;
    try{
        if (!name || !code || !price || !weight ) {
            throw Error("No se pasaron todos los valores");
        }else{
            const newProduct = await createProduct(name,code,price,weight);
            if(!newProduct){
                throw Error("No se pudo crear el producto");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newProduct);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Crear un destino 
const createClientHandler = async (req,res) => {
    const { name, ruc, dni, address } = req.body;
    try{
        if (!name || !dni || !address) {
            throw Error("No se pasaron todos los valores");
        }else{
            const newClient = await createClient(name,ruc,dni,address);
            if(!newClient){
                throw Error("No se pudo crear el cliente");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newClient);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Crear un destino 
const createTipoPagoHandler = async (req,res) => {
    const { name } = req.body;
    try{
        if (!name) {
            throw Error("No se pasaron todos los valores");
        }else{
            const newTipoPago = await createTipoPago(name);
            if(!newTipoPago){
                throw Error("No se pudo crear el tipo de pago");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newTipoPago);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//Crear una unidad de medida en que se expresa el producto o carga
const createUnidadMedidaHandler = async (req,res) => {
    const { name,simbolo } = req.body;
    try{
        if (!name || !simbolo) {
            throw Error("No se pasaron todos los valores");
        }else{
            const newUnidadMedida = await createUnidadMedida(name,simbolo);
            if(!newUnidadMedida){
                throw Error("No se pudo crear el lugar de destino");
            }
            //si todo sale bien se crea un nuevo usuario
            res.status(201).json(newUnidadMedida);
        }
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}



module.exports = {
    createUserHandler,
    createRoleHandler,
    loginUserHandler,
    createSedeHandler,
    createProductHandler,
    createClientHandler,
    createTipoPagoHandler,
    createUnidadMedidaHandler
}