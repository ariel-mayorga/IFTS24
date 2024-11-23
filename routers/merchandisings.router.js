const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const controller = require("../controllers/merchandisings.controller");

//METODO GET//
//para todos los merchandisings//
router.get("/", controller.allMerchandisings);

//para un merchandising
router.get("/:id", controller.showMerchandising);

//METODO POST//
router.post("/", controller.storeMerchandising);

//// METODO PUT  ////
router.put("/:id", controller.updateMerchandising);

///// METODO DELETE ////
router.delete("/:id", controller.destroyMerchandising);

//exportar las rutas,routers
module.exports = router;
