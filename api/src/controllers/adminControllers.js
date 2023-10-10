const { User, Role, Sede, Document } = require("../db");
const { modifyArrayUsers } = require("../utils/index")


/************* CONTROLLERS DEL USUARIO AUTORIZADO(ADMIN) *************/

//Obtener todos los usuarios
const getAllUsers = async () => {
	try {
	// Encuentra a todos los usuarios con roles admin
		const RoleUser = await Role.findOne({ where: { name: "user" } });

		if (!RoleUser) {
			throw new Error("Role 'user' does not exist");
		}

		const users = await User.findAll({
			where: {
				RoleId: RoleUser.id
			},
			include: [
				{
					model: Sede,
					attributes: ["id", "name", "code"]
				},
				{
					model: Role,
					attributes: ["id", "name"]
				},
				{
					model: Document,
					attributes: ["id", "serieRegister"]
				}
			]
		});

		return users;
	} catch (error) {
		console.error("Error in getAllUsers:", error);
		throw error;
	}
};

//Obtener todos los usuarios
const getAllAdmins = async () => {
	//Encuentra a todos los usuarios con roles admin
	try {
		// Encuentra a todos los usuarios con roles admin
		const RoleAdmin = await Role.findOne({ where: { name: "admin" } });

		if (!RoleAdmin) {
			throw new Error("Role 'admin' does not exist");
		}

		const admins = await User.findAll({
			where: {
					RoleId: RoleAdmin.id
			},
			include: [
				{
					model: Sede,
					attributes: ["id", "name", "code"]
				},
				{
					model: Role,
					attributes: ["id", "name"]
				},
				{
					model: Document,
					attributes: ["id", "serieRegister"]
				}
			]
		});
		return admins;
	} catch (error) {
		console.error("Error in getAllAdmins:", error);
		throw error;
	}
};
//Habilitar o deshabilitar usuario
const enabledUser = async (id, enabled) => {
	const user = await User.findByPk(id);
	if (!user) {
		throw Error("User was not found");
	}
	//Actualizar el estado de habilitacion del usuario
	user.enabled = enabled;
	await user.save();
	if (enabled) {
		return {
			...user,
			status: "enabled"
		}
	}
	else{
		return {
			...user,
			status: "disabled"
		}
	}
}

module.exports = {
	getAllUsers,
	getAllAdmins,
	enabledUser
}