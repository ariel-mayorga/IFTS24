const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../db/db.js");

/////////////METODO GET/////// consultar todos los usuarios///////////
// elijo una forma para llamar la const que va a llamar a todos los usuarios

const allUsuarios = (req, res) => {
  const sql = "SELECT * FROM usuarios"; //para que me traiga todos los usuarios
  db.query(sql, (error, rows) => {
    //o me devuelve el error o las filas
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar un usuario especifico//////////

const showUsuario = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM usuarios WHERE id_usuario = ?"; // Consulta SQL para seleccionar un usuario especifico
  db.query(sql, [id], (error, rows) => {
    //si el id se corresponde con lo que viene de parametro
    // Ejecuta la consulta
    console.log(rows); // Muestra las filas en la consola para depuración
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (rows.length == 0) {
      //validacion: si el numero de filas es igual a 0 es xq no existe
      return res
        .status(400)
        .send({ error: "ERROR: No existe el usuario solicitado" }); // Manejo de caso en que no se encuentra al usuario
    }
    res.json(rows[0]); // Devuelve la carrera encontrado en la posición cero
  });
};

//////////Registrar usuario nuevo - storeUsuario ////////////////////////

const storeUsuario = (req, res) => {
  console.log(req.file);
  let imagenAsubir = ""; //nombre del archivo a subir
  if (req.file) {
    //si se subio el archivo:
    imagenAsubir = `/imagenes/${req.file.filename}`; //le asigno este nombre a la variable
  }

  const { nombre, email, password, rol } = req.body; //aca no va imagen xq no la traigo del body

  const sql =
    "INSERT INTO usuarios (nombre, email, password, rol, imagen) VALUES (?, ?, ?, ?, ?)";
  db.query(
    sql,
    [nombre, email, password, rol, imagenAsubir], //no se pone imagen xq no lo traigo del body
    (error, result) => {
      console.log(result);
      if (error) {
        return res.status(500).json({ error: "Error al registrar usuario" });
      }
      const usuario = {
        ...req.body,
        id: result.insertId,
        nombre,
        email,
        rol,
        imagen: imagenAsubir,
      };
      res.status(201).json(usuario);
    }
  );
};

// /////////// METODO PUT  //// modificacion de carrera////////////////

// const updateUsuario = async (req, res) => {
//   //funcion callback req = request(requerimiento) res = response(respuesta)
//   const { id_usuario } = req.params;
//   const { nombre, email, password, rol } = req.body;
//   const imagen = req.file ? req.file.filename : null;

//   let sql = "UPDATE usuarios SET nombre = ?, email = ?, rol = ?";
//   let params = [nombre, email, rol];

//   if (password) {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     sql += ", password = ?";
//     params.push(hashedPassword);
//   }

//   if (imagen) {
//     sql += ", imagen = ?";
//     params.push(imagen);
//   }

//   sql += " WHERE id_usuario = ?";
//   params.push(id_usuario);

//   db.query(sql, params, (error, result) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ error: "ERROR: Intente más tarde por favor" });
//     }
//     if (result.affectedRows == 0) {
//       return res
//         .status(404)
//         .send({ error: "ERROR: El usuario a modificar no existe" });
//     }
//     res.json({ mensaje: "Usuario actualizado exitosamente" });
//   });
// };

// //////////////////// METODO DELETE //// eliminacion de carrera/////////

// const destroyUsuario = (req, res) => {
//   const { id } = req.params;
//   const sql = "DELETE FROM usuarios WHERE id_usuario = ?";
//   db.query(sql, [id], (error, result) => {
//     if (error) {
//       return res
//         .status(500)
//         .json({ error: "ERROR: Intente más tarde por favor" });
//     }
//     if (result.affectedRows == 0) {
//       return res
//         .status(404)
//         .send({ error: "ERROR: El usuario a borrar no existe" });
//     }
//     res.json({ mensaje: "Usuario Eliminado" });
//   });
// };

// //////////login de usuario ////////////////////////
// const login = (req, res) => {
//   const { email, password } = req.body;
//   const sql = "SELECT * FROM usuarios WHERE email = ?";
//   db.query(sql, [email], async (error, results) => {
//     if (error) {
//       return res.status(500).json({ error: "Error en el servidor" });
//     }
//     if (results.length === 0) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }
//     const user = results[0];
//     const match = await bcrypt.compare(password, user.password);
//     if (!match) {
//       return res.status(401).json({ error: "Credenciales inválidas" });
//     }
//     const token = jwt.sign(
//       { id_usuario: user.id_usuario, email: user.email, rol: user.rol },
//       "enigma",
//       { expiresIn: "2h" }
//     );
//     res.json({
//       token,
//       user: {
//         id_usuario: user.id_usuario,
//         nombre: user.nombre,
//         email: user.email,
//         rol: user.rol,
//       },
//     });
//   });
// };

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allUsuarios,
  showUsuario,
  storeUsuario, //storeUsuario register
  //   updateUsuario,
  //destroyUsuario,
  //login, //storeUsuario login
};
