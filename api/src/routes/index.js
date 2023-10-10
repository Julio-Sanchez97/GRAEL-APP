const { Router } = require('express');
// Importar todos los routers;
const userRouter = require("./userRoute");
const publicRouter = require("./publicRoute")
const adminRouter = require("./adminRoute")

const router = Router();

/****************** CONFIGURAR LAS RUTAS ******************/

//RUTAS PUBLICAS
router.use("/public",publicRouter);
//RUTAS PRIVADAS
router.use("/user",userRouter);
router.use("/admin",adminRouter);


module.exports = router;