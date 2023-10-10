const { Router } = require("express");
const { 
  createUserHandler,
  createRoleHandler,
  loginUserHandler,
  createSedeHandler,
  createProductHandler,
  createClientHandler,
  createTipoPagoHandler,
  createUnidadMedidaHandler
} = require("../handlers/publicHandlers")
const publicRouter = Router();

/***************** RUTAS PUBLICAS *****************/

//Ruta para crear un usuario
publicRouter.post("/user",createUserHandler);
//Ruta para crear un rol del usuario
publicRouter.post("/user/role",createRoleHandler);
//Ruta para loguearse y autenticarse
publicRouter.post("/login",loginUserHandler);
//Ruta para crear sede
publicRouter.post("/sede",createSedeHandler);
//Ruta para crear un producto
publicRouter.post("/product",createProductHandler);
//Ruta para crear un cliente
publicRouter.post("/client",createClientHandler);
//Ruta para crear tipo de pago para el documento
publicRouter.post("/document/tipoPago",createTipoPagoHandler);
//Ruta para crear unidad de medida para el documento
publicRouter.post("/document/unidadMedida",createUnidadMedidaHandler);




module.exports = publicRouter;