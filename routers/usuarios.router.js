const express = require("express");
const router = express.Router();

////MULTER/////
const multer = require("multer");
const path = require("path");

//donde y como se va a llamar el archivo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //si en el callback me aparece nulo o uploads
    cb(null, path.join(__dirname, "imagenes")); // esta carpeta debe existir en el proyecto (upload o imagen)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //segundos desde 1970
  }, //el date.noe() lo que hace es que saca un numero a partir de 1970 y se lo pone a la img para que no se repita
});

//configurar la subida del archivo
const uploads = multer({
  storage,
  fileFilter: (req, file, cb) => {
    console.log(file);
    const filetypes = /jpg|jpeg|png|webp/; //poner tipo de archivo que admite
    const mimetype = filetypes.test(file.mimetype); //que me diga que tipo de archivo es...jpg/png etc
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Tipo de archivo no soportado"));
    }
  },
  limits: { fileSize: 1024 * 1024 * 3 }, //aprox es 3mb (si quiero mas o menos modifico el 3)
});
/////FIN MULTER////

const controller = require("../controllers/usuarios.controller");
//METODO GET//
//para todos los usuarios//
router.get("/", controller.allUsuarios);

//para un usuario
router.get("/:id", controller.showUsuario);

//METODO POST//
router.post("/", uploads.single("imagen"), controller.storeUsuario); //
//el upload.single("imagen")  me trae tmb la img

// //// METODO PUT  ////
// router.put("/:id", upload.single("imagen"), controller.updateUsuario);

// ///// METODO DELETE ////
// router.delete("/:id", controller.destroyUsuario);

// router.post("/login", controller.login);

//exportar las rutas,routers
module.exports = router;
