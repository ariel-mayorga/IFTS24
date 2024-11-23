const db = require("../db/db.js");

/////////////METODO GET/////// consultar todos las carreras///////////
// elijo una forma para llamar la const que va a llamar a todas las carreras

const allCarreras = (req, res) => {
  const sql = "SELECT * FROM carreras"; //para que me traiga todos las carreras
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar una carrera especifica//////////

const showCarrera = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM carreras WHERE id_carrera = ?"; // Consulta SQL para seleccionar una carrera especifica
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
        .send({ error: "ERROR: No existe la carrera requerida" }); // Manejo de caso en que no se encuentra la carrera
    }
    res.json(rows[0]); // Devuelve la carrera encontrado en la posición cero
  });
};

//////////METODO POST - agregar carrera nuevo ////////////////////////

const storeCarrera = (req, res) => {
  const { nombre_carrera, descripcion, duracion, horario } = req.body; // Extrae los campos del cuerpo de la solicitud
  const sql =
    "INSERT INTO carreras (nombre_carrera, descripcion, duracion, horario) VALUES (?, ?, ?, ?)"; // Consulta SQL para insertar una nueva carrera
  db.query(
    sql,
    [nombre_carrera, descripcion, duracion, horario],
    (error, result) => {
      // Ejecuta la consulta
      console.log(result); // Muestra el resultado de la consulta en la consola para depuración
      if (error) {
        return res
          .status(500)
          .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
      }
      const carrera = { ...req.body, id_carrera: result.insertId }; // Reconstruye el objeto de la carrera con el ID generado
      res.status(201).json(carrera); // Devuelve la carrera creada con éxito
    }
  );
};

/////////// METODO PUT  //// modificacion de carrera////////////////

const updateCarrera = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro en la URL
  const { nombre_carrera, descripcion, duracion, horario } = req.body; // Extrae los datos del cuerpo de la solicitud

  const sql =
    "UPDATE carreras SET nombre_carrera = ?, descripcion = ?, duracion = ?, horario = ? WHERE id_carrera = ?"; // Consulta SQL para actualizar los datos de la carrera

  db.query(
    sql,
    [nombre_carrera, descripcion, duracion, horario, id], // Asegúrate de pasar todos los valores correctamente
    (error, result) => {
      // Ejecuta la consulta
      if (error) {
        return res
          .status(500)
          .json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .send({ error: "ERROR: La carrera a modificar no existe" }); // Manejo de caso en que no se encuentra la carrera
      }

      // Devuelve el objeto actualizado
      const carrera = {
        id_carrera: id,
        nombre_carrera,
        descripcion,
        duracion,
        horario,
      };

      res.json(carrera); // Devuelve la carrera actualizada
    }
  );
};

//////////////////// METODO DELETE //// eliminacion de carrera/////////

const destroyCarrera = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro de la URL
  const sql = "DELETE FROM carreras WHERE id_carrera = ?"; // Consulta SQL para eliminar la carrera
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
        .send({ error: "ERROR: La carrera a borrar no existe" }); // Manejo de caso en que no se encuentra la carrera
    }
    res.json({ mensaje: "Carrera eliminado" }); // Mensaje de éxito
  });
};

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allCarreras,
  showCarrera,
  storeCarrera,
  updateCarrera,
  destroyCarrera,
};
