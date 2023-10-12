const { getAllUsers, getAllAdmins, enabledUser } = require("../controllers/adminControllers")

/*********** HANDLERS DEL USUARIO AUTORIZADO(ADMIN) ***********/

//Obtener todos los usuarios con rol user
const getAllUsersHandler = async (req,res) => {
    try {
        const users = await getAllUsers();
        if (users.length===0) {
            throw Error("No hay usuarios")
        }
        //si todo sale bien se obtiene en el response todos los usuarios
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(400).json({error: error.message});
    }
}
//Obtener todos los usuarios con rol admin
const getAllAdminsHandler = async (req,res) => {
    try {
        const admins = await getAllAdmins();
        if (admins.length===0) {
            throw Error("No hay admins")
        }
        //si todo sale bien se obtiene en el response todos los admins
        res.status(200).json(admins);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}
//Habilitar o deshabilitar un usuario por ID
const enabledUserHandler = async (req,res) => {
    const { id, enabled } = req.body
    try {
        if (!id || typeof enabled!=="boolean") {
            throw Error("Did not pass all data")
        }
        const user = await enabledUser(id,enabled);
        //Al habilitar o deshabilitar un usuario, se recibe un mensaje de su estado
        res.status(200).json({message:`User ${user.name} with id ${id} is ${user.status}`,userId:id,userStatus:user.status});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


module.exports = {
    getAllUsersHandler,
    getAllAdminsHandler,
    enabledUserHandler
}