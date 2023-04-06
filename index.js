const express = require('express');
const app = express();
const { login } = require("./controllers/login");
const { checkAuth } = require("./middlewares/jwt.middlewares");


app.listen(3000, console.log("SERVER ON"));
app.use(express.json())

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores')

const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos')
app.post("/login", login);


app.get("/equipos", obtenerEquipos)
app.post("/equipos", checkAuth, agregarEquipo)

app.get("/equipos/:teamID/jugadores", obtenerJugadores)
app.post("/equipos/:teamID/jugadores", checkAuth, registrarJugador)


module.exports = app;