const express = require("express");
const router = express.Router();

const controller = require("../controllers/servicios.controller");

//METODO GET//
//para todos los accesorio//
router.get("/", controller.allServicios);

//para un producto,item
router.get("/:id", controller.showServicio);

//METODO POST//
router.post("/", controller.storeServicio);

//// METODO PUT  ////
router.put("/:id", controller.updateServicio);

///// METODO DELETE ////
router.delete("/:id", controller.destroyServicio);

//exportar las rutas,routers
module.exports = router;
