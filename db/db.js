const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root", //cuando este hosteado voy a tener un usuario en lugar de root
  password: "",
  database: "casajaponesa",
});

connection.connect((error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Estamos conectados a la Base de Datos - casajaponesa");
});

module.exports = connection;
