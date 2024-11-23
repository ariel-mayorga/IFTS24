const db = require("../db/db.js");

/////////////METODO GET/////// consultar todas las reservas///////////
// elijo una forma para llamar la const que va a llamar a todos las reservas

const allReservas = (req, res) => {
  const sql = "SELECT * FROM reservas"; //para que me traiga todas las reservas
  db.query(sql, (error, rows) => {
    if (error) {
      return res
        .status(500)
        .json({ error: "ERROR: Intente mas tarde por favor" });
    }
    res.json(rows); //si esta bien me devuelve un json con toda la fila de esa columna
  }); //ejecuto la const sql
};

//////////////METODO GET///////consultar una reserva especifico//////////

const showReserva = (req, res) => {
  const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
  const sql = "SELECT * FROM reservas WHERE id_reserva = ?"; // Consulta SQL para seleccionar una reserva especifica
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
        .send({ error: "ERROR: No existe la reserva solicitada" }); // Manejo de caso en que no se encuentra la reserva
    }
    res.json(rows[0]); // Devuelve la reserva encontrado en la posición cero
  });
};

//////////METODO POST - agregar reserva nueva ////////////////////////

const storeReserva = (req, res) => {
  const { nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno } =
    req.body; // Extrae los campos del cuerpo de la solicitud
  const sql =
    "INSERT INTO reservas (nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno) VALUES ( ?, ?, ?, ?, ?)"; // Consulta SQL para insertar una nueva reserva
  db.query(
    sql,
    [nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno],
    (error, result) => {
      // Ejecuta la consulta
      console.log(result); // Muestra el resultado de la consulta en la consola para depuración
      if (error) {
        return res.status(500).json({
          error: "ERROR: No se pudo crear la reserva. Intente más tarde.",
        }); // Manejo de errores
      }
      const reserva = {
        ...req.body,
        id_reserva: result.insertId,
        nombre_cliente,
        fecha_hora,
        num_personas,
        id_mesa,
        id_turno,
      }; // Reconstruye el objeto de la reserva con el ID generado
      res.status(201).json({
        message: "Reserva creada con éxito",
        reserva,
      }); // Devuelve la reserva creado con éxito
    }
  );
};

/////////// METODO PUT  //// modificacion de reserva////////////////

const updateReserva = (req, res) => {
  const { id } = req.params; // Extrae el ID de la reserva desde los parámetros de la URL
  const { nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno } =
    req.body; // Extrae los datos a actualizar desde el cuerpo de la solicitud

  const sql = `
    UPDATE reservas 
    SET nombre_cliente = ?, fecha_hora = ?, num_personas = ?, id_mesa = ?, id_turno = ?  WHERE id_reserva = ?`; // Consulta SQL para actualizar los datos de la reserva

  db.query(
    sql,
    [nombre_cliente, fecha_hora, num_personas, id_mesa, id_turno, id], // Pasa los valores, incluyendo el ID desde `req.params`
    (error, result) => {
      if (error) {
        return res
          .status(500)
          .json({ error: "ERROR: Intente más tarde por favor" });
      }
      if (result.affectedRows === 0) {
        return res
          .status(404)
          .json({ error: "ERROR: La reserva a modificar no existe" });
      }

      const reserva = { id_reserva: id, ...req.body }; // Devuelve el objeto actualizado con el ID incluido
      res.json(reserva);
    }
  );
};

//////////////////// METODO DELETE //// eliminacion de reserva/////////

const destroyReserva = (req, res) => {
  const { id } = req.params; // Extrae el ID del parámetro de la URL
  const sql = "DELETE FROM reservas WHERE id_reserva = ?"; // Consulta SQL para eliminar la reserva

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
        .send({ error: "ERROR: La reserva a borrar no existe" }); // Manejo de caso en que no se encuentra la reserva
    }
    res.json({ mensaje: "Reserva eliminada" }); // Mensaje de éxito
  });
};

//exportar todas las funciones del modulo para las rutas
module.exports = {
  allReservas,
  showReserva,
  storeReserva,
  updateReserva,
  destroyReserva,
};
