const db = require("../db/db.js");

/////////////METODO GET/////// consultar todos los servicios///////////
// elijo una forma para llamar la const que va a llamar a todos los servicios

const allServicios = (req, res) => {
  const sql = "SELECT * FROM servicios"; //para que me traiga todos los servicios
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar un servicio especifico//////////

const showServicio = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM servicios WHERE id_servicio = ?"; // Consulta SQL para seleccionar un servicio especifico
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
        .send({ error: "ERROR: No existe el servicio requerido" }); // Manejo de caso en que no se encuentra el servicio
    }
    res.json(rows[0]); // Devuelve el servicio encontrado en la posición cero
  });
};

//////////METODO POST - agregar servicio nuevo ////////////////////////

const storeServicio = (req, res) => {
  const { nombre_servicio, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud
  const sql =
    "INSERT INTO servicios (nombre_servicio, descripcion) VALUES ( ?, ?)"; // Consulta SQL para insertar un nuevo servicio
  db.query(sql, [nombre_servicio, descripcion], (error, result) => {
    // Ejecuta la consulta
    console.log(result); // Muestra el resultado de la consulta en la consola para depuración
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    const servicio = { ...req.body, id_servicio: result.insertId }; // Reconstruye el objeto del servicio con el ID generado
    res.status(201).json(servicio); // Devuelve el servicio creado con éxito
  });
};

/////////// METODO PUT  //// modificacion de servicio////////////////

const updateServicio = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro en la URL
  const { nombre_servicio, descripcion } = req.body; // Extrae los campos del cuerpo de la solicitud

  const sql = "UPDATE servicios SET nombre_servicio = ?, descripcion = ?"; // Consulta SQL para actualizar los datos del servicio

  db.query(sql, [nombre_servicio, descripcion], (error, result) => {
    // Ejecuta la consulta
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
    }
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .send({ error: "ERROR: El servicio a modificar no existe" }); // Manejo de caso en que no se encuentra el servicio
    }

    const servicio = { ...req.body, id_servicio: id }; // Reconstruye el objeto del servicio actualizado
    res.json(servicio); // Devuelve el objeto actualizado
  });
};

//////////////////// METODO DELETE //// eliminacion de servicio/////////

const destroyServicio = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro de la URL
  const sql = "DELETE FROM servicios WHERE id_servicio = ?"; // Consulta SQL para eliminar el servicio

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
        .send({ error: "ERROR: el servicio a borrar no existe" }); // Manejo de caso en que no se encuentra el servicio
    }
    res.json({ mensaje: "Servicio eliminado" }); // Mensaje de éxito
  });
};

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allServicios,
  showServicio,
  storeServicio,
  updateServicio,
  destroyServicio,
};
