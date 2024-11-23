const express = require("express");
const router = express.Router();

const controller = require("../controllers/carreras.controller");

//METODO GET//
//para todas las carreras//
router.get("/", controller.allCarreras);

//para una carrera
router.get("/:id", controller.showCarrera);

//METODO POST//
router.post("/", controller.storeCarrera);

//// METODO PUT  ////
router.put("/:id", controller.updateCarrera);

///// METODO DELETE ////
router.delete("/:id", controller.destroyCarrera);

//exportar las rutas,routers
module.exports = router;
