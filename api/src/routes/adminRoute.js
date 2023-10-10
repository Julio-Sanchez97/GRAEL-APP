const { Router } = require("express");
const { getAllUsersHandler, getAllAdminsHandler, enabledUserHandler} = require("../handlers/adminHandlers")
const { authenticateToken, authorizeRole } = require("../middlewares/auth");

const adminRouter = Router();

/***************** RUTAS DEL USUARIO AUTORIZADO(ADMIN) *****************/

//Ruta para obtener a todos los usuarios con rol user
adminRouter.get("/users", authenticateToken, authorizeRole("admin"), getAllUsersHandler);
//Ruta para obtener a todos los usuarios con rol admin
adminRouter.get("/admins", authenticateToken, authorizeRole("admin"), getAllAdminsHandler);
//Ruta para habilitar o deshabilitar a un usuario por su PK(uuid)
adminRouter.put("/user/enabled", authenticateToken, authorizeRole("admin"), enabledUserHandler);



module.exports = adminRouter;