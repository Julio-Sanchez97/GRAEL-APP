const { Router } = require("express");
const { 
  getUserByIdHandler, 
  createDocumentHandler, 
  createPdfHandler,
  downloadPdfHandler,
  getSedesHandler, 
  getClientsHandler, 
  getProductsHandler, 
  getMeasurementUnitsHandler, 
  getPaymentTypesHandler } = require("../handlers/userHandler");
const { authenticateToken } = require("../middlewares/auth");

const userRouter = Router();

/***************** RUTAS DEL USUARIO AUTENTICADO *****************/

//Ruta para crear un registro en la tabla Documentos al llenar el formulario
userRouter.post("/form", authenticateToken, createDocumentHandler);
//Ruta para almacenar el pdf en base64 en el documento creado
userRouter.post("/pdf", authenticateToken, createPdfHandler);
//Ruta para obtener las sedes
userRouter.get("/sedes", authenticateToken, getSedesHandler);
//Ruta para obtene los clientes
userRouter.get("/clients", authenticateToken, getClientsHandler);
//Ruta para obtener los productos
userRouter.get("/products", authenticateToken, getProductsHandler);
//Ruta para obtener los productos
userRouter.get("/measurementUnits", authenticateToken, getMeasurementUnitsHandler);
//Ruta para obtener los productos
userRouter.get("/paymentTypes", authenticateToken, getPaymentTypesHandler);
//Ruta para almacenar el pdf en base64 en el documento creado
userRouter.get("/pdf/:id", authenticateToken, downloadPdfHandler);
//Ruta para obtener la informacion del usuario
userRouter.get("/:id", authenticateToken, getUserByIdHandler);

module.exports = userRouter;