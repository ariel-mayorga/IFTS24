const db = require("../db/db.js");

/////////////METODO GET/////// consultar todas los platos///////////
// elijo una forma para llamar la const que va a llamar a todos los platos

const allPlatos = (req, res) => {
  const sql = "SELECT * FROM platos"; //para que me traiga todos los platos
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar un plato especifico//////////

const showPlato = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM platos WHERE id_plato = ?"; // Consulta SQL para seleccionar un plato especifico
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
        .send({ error: "ERROR: No existe el plato requerido" }); // Manejo de caso en que no se encuentra el plato
    }
    res.json(rows[0]); // Devuelve el plato encontrada en la posición cero
  });
};

//////////METODO POST - agregar plato nuevo ////////////////////////

const storePlato = (req, res) => {
  const { nombre_plato, categoria, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud
  const sql =
    "INSERT INTO platos (nombre_plato, categoria, descripcion) VALUES (?, ?, ?)"; // Consulta SQL para insertar un nuevo plato
  db.query(sql, [nombre_plato, categoria, descripcion], (error, result) => {
    // Ejecuta la consulta
    console.log(result); // Muestra el resultado de la consulta en la consola para depuración
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    const plato = { ...req.body, id_plato: result.insertId }; // Reconstruye el objeto del plato con el ID generado
    res.status(201).json(plato); // Devuelve el plato creado con éxito
  });
};

/////////// METODO PUT  //// modificacion de plato////////////////

const updatePlato = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro en la URL
  const { nombre_plato, categoria, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud

  const sql =
    "UPDATE platos SET nombre_plato = ?, categoria = ?, descripcion = ? WHERE id_plato = ?"; // Agrega WHERE para limitar la actualización

  db.query(sql, [nombre_plato, categoria, descripcion, id], (error, result) => {
    // Ejecuta la consulta
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: El plato a modificar no existe" }); // Manejo de caso en que no se encuentra el plato
    }

    const plato = { id_plato: id, nombre_plato, categoria, descripcion }; // Reconstruye el objeto del plato actualizado
    res.json(plato); // Devuelve el objeto actualizado
  });
};

//////////////////// METODO DELETE //// eliminacion de plato/////////

const destroyPlato = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro de la URL
  const sql = "DELETE FROM platos WHERE id_plato = ?"; // Consulta SQL para eliminar el plato

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
        .send({ error: "ERROR: el plato a borrar no existe" }); // Manejo de caso en que no se encuentra el plato
    }
    res.json({ mensaje: "Plato eliminado" }); // Mensaje de éxito
  });
};

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allPlatos,
  showPlato,
  storePlato,
  updatePlato,
  destroyPlato,
};
