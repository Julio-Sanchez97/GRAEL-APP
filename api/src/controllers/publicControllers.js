const { User, Sede, Product, Client, Role, TipoPago, UnidadMedida } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { SECRET_SESSION } = process.env;

/********************* CONTROLLERS PUBLICOS *********************/

//Crear un usuario
const createUser = async (username, name, lastname, email, password, roleId, sedeId) => {
    //Buscamos si han pasado una sede existente
    const sede = await Sede.findByPk(sedeId);
    if (!sede) {
        throw Error("Sede does not exists");
    }
    //Buscamos si han pasado un rol existente
    const role = await Role.findByPk(roleId);
    if (!role) {
        throw Error("Role does not exists");
    }
    //La contraseña pasada se hashea y se manda a la bdd
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({username,name,lastname,email,password:hashedPassword,RoleId: roleId,SedeId:sedeId});
    return newUser;
}

//Crear un Rol
const createRole = async (name, code) => {
    const [role, created] = await Role.findOrCreate({
        where:{name},
        defaults:{code}
    });
    if (created) {
        return role
    }else{
        throw Error("Role already exists")
    }
}

//Login de un usuario
const loginUser = async (username,password) => {
    console.log("controller: ",SECRET_SESSION);
    const user = await User.findOne({where:{username}});
    //Error al loguearse
    if (!user) {
        throw Error("Invalid user or password");
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!(user && isPasswordValid)){
        throw Error("Invalid user or password");
    }
    if (!user.enabled) {
        throw Error("User is disabled");
    }
    const role = await Role.findByPk(user.RoleId);
    const userForToken = {
        id: user.id,
        role: role.name
    }
    //Una vez logueado el usuario correctamente se crea el token y se retorna
    const token = jwt.sign(userForToken, SECRET_SESSION, {expiresIn: 60*60*24});
    return token;
}

//Crear una Sede
const createSede = async (name, code, address, email, countryCode, phoneNumber) => {
    //se crea una sede si el nombre no existe
    const [sede, created] = await Sede.findOrCreate({
        where:{name},
        defaults:{code, address, email, countryCode, phoneNumber}
    });
    if (created) {
        return sede;
    }
    else{
        throw Error("Sede already exists");
    }
}

////Crear un Producto
const createProduct = async (name, code, price, weight) => {
    //se crea un producto si el nombre no existe
    const [product, created] = await Product.findOrCreate({
        where:{name},
        defaults:{code, price, weight}
    });
    if (created) {
        return product;
    }
    else{
        throw Error("Product already exists");
    }
}

//Crear un Cliente
const createClient = async (name, ruc, dni, address) => {
    //se crea un cliente si el dni no existe
    const [client, created] = await Client.findOrCreate({
        where:{dni},
        defaults:{name, ruc, address}
    });
    if (created) {
        return client;
    }
    else{
        throw Error("Client already exists");
    }
}

//Crear un tipo de pago
const createTipoPago = async (name) => {
    //se crea un tipo de pago si el nombre no existe
    const [tipoPago, created] = await TipoPago.findOrCreate({
        where:{name},
    });
    if (created) {
        return tipoPago;
    }
    else{
        throw Error("TipoPago already exists");
    }
}

//Crear una unidad de medida de la carga
const createUnidadMedida = async (name,simbolo) => {
    //se crea un unidad de medida si el nombre no existe
    const [unidadMedida, created] = await UnidadMedida.findOrCreate({
        where:{name},
        defaults:{simbolo}
    });
    if (created) {
        return unidadMedida;
    }
    else{
        throw Error("UnidadMedida already exists");
    }
}



module.exports = {
    createUser,
    createRole,
    loginUser,
    createSede,
    createProduct,
    createClient,
    createTipoPago,
    createUnidadMedida 
}