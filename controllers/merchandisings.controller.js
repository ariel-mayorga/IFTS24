const db = require("../db/db.js");

/////////////METODO GET/////// consultar todos los merchandisings///////////
// elijo una forma para llamar la const que va a llamar a todos los merchandisings

const allMerchandisings = (req, res) => {
  const sql = "SELECT * FROM merchandisings"; //para que me traiga todos merchandisings
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar un merchandising especifico//////////

const showMerchandising = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM merchandisings WHERE id_producto = ?"; // Consulta SQL para seleccionar un merchandising especifico
  db.query(sql, [id], (error, rows) => {
    // Ejecuta la consulta
    console.log(rows); // Muestra las filas en la consola para depuración
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (rows.length == 0) {
      return res
        .status(400)
        .send({ error: "ERROR: No existe el merchandising requerido" }); // Manejo de caso en que no se encuentra el merchandising
    }
    res.json(rows[0]); // Devuelve el merchandising encontrado en la posición cero
  });
};

//////////METODO POST - agregar merchandising nuevo ////////////////////////

const storeMerchandising = (req, res) => {
  const { nombre_producto, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud
  const sql =
    "INSERT INTO merchandisings (nombre_producto, descripcion) VALUES ( ?, ?)"; // Consulta SQL para insertar un nuevo Merchandising
  db.query(sql, [nombre_producto, descripcion], (error, result) => {
    // Ejecuta la consulta
    console.log(result); // Muestra el resultado de la consulta en la consola para depuración
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    const merchandising = { ...req.body, id_producto: result.insertId }; // Reconstruye el objeto del merchandising con el ID generado
    res.status(201).json(merchandising); // Devuelve el merchandising creado con éxito
  });
};

/////////// METODO PUT  //// modificacion de merchandising////////////////

const updateMerchandising = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro en la URL
  const { nombre_producto, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud

  const sql = "UPDATE merchandisings SET nombre_producto = ?, descripcion = ?"; // Consulta SQL para actualizar los datos del merchandising

  db.query(sql, [nombre_producto, descripcion], (error, result) => {
    // Ejecuta la consulta
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: El merchandising a modificar no existe" }); // Manejo de caso en que no se encuentra el merchandising
    }

    const merchandising = { ...req.body, id_producto: id }; // Reconstruye el objeto del merchandising actualizado
    res.json(merchandising); // Devuelve el objeto actualizado
  });
};

//////////////////// METODO DELETE //// eliminacion de merchandising/////////

const destroyMerchandising = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro de la URL
  const sql = "DELETE FROM merchandisings WHERE id_producto = ?"; // Consulta SQL para eliminar el merchandising

  db.query(sql, [id], (error, result) => {
    // Ejecuta la consulta
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: el merchandising a borrar no existe" }); // Manejo de caso en que no se encuentra el merchandising
    }
    res.json({ mensaje: "merchandising eliminado" }); // Mensaje de éxito
  });
};

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allMerchandisings,
  showMerchandising,
  storeMerchandising,
  updateMerchandising,
  destroyMerchandising,
};
