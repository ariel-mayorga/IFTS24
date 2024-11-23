const express = require("express");
const router = express.Router();
const controller = require("../controllers/reservas.controller");

//METODO GET//
//para todas las reservas//
router.get("/", controller.allReservas);

//para una reserva
router.get("/:id", controller.showReserva);

//METODO POST//
router.post("/", controller.storeReserva);

//// METODO PUT  ////
router.put("/:id", controller.updateReserva);

///// METODO DELETE ////
router.delete("/:id", controller.destroyReserva);

//exportar las rutas,routers
module.exports = router;
