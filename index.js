const express = require("express");
const path = require("path");
const app = express();

app.use(express.json());

// require("dotenv").config();
//ruta principal
app.get("/", (req, res) => {
  res.send("hola Casa Japonesa");
});

app.use("/imagenes", express.static(path.join(__dirname, "imagenes")));

// Rutas para platos
const platosRouter = require("./routers/platos.router");
app.use("/platos", platosRouter);

// Rutas para servicios
const serviciosRouter = require("./routers/servicios.router");
app.use("/servicios", serviciosRouter);

// Rutas para reservas
const reservasRouter = require("./routers/reservas.router");
app.use("/reservas", reservasRouter);

// Rutas para merchandisings
const merchandisingsRouter = require("./routers/merchandisings.router");
app.use("/merchandisings", merchandisingsRouter);

//Rutas para carreras
const carreraRouter = require("./routers/carreras.router");
app.use("/carreras", carreraRouter);

//Rutas para usuarios
const usuariosRouter = require("./routers/usuarios.router");
app.use("/usuarios", usuariosRouter);

// const authRouter = require("./routers/auth.router");
// app.use("/auth", authRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
