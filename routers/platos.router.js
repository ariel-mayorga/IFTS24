const express = require("express");
const router = express.Router();
const controller = require("../controllers/platos.controller");

// METODO GET
// Para todos los platos
router.get("/", controller.allPlatos);

// Para un plato por ID
router.get("/:id", controller.showPlato);

// METODO POST
router.post("/", controller.storePlato);

// METODO PUT
router.put("/:id", controller.updatePlato);

// METODO DELETE
router.delete("/:id", controller.destroyPlato);

// Exportar las rutas
module.exports = router;
