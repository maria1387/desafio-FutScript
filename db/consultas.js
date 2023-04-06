const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'postgres',
    database: 'futscript',
    allowExitOnIdle: true
})

const getTeams = async () => {
    const queryString = "SELECT * FROM equipos";
    const { rows: teams } = await pool.query(queryString);
    return teams;
}

const getPlayers = async (teamID) => {
    const values = [teamID];
  const queryString =
    "SELECT jugadores.name, jugadores.position FROM jugadores INNER JOIN equipos ON jugadores.id_equipo = equipos.id WHERE equipos.id = $1;";

  const { rows: players } = await pool.query(queryString, values);

  return players;
}

const addTeam = async (equipo) => {
    let { name } = equipo;
    const values = [name];
    const queryString = "INSERT INTO equipos VALUES (DEFAULT, $1)";
    await pool.query(queryString, values);
}

const addPlayer = async ({ jugador, teamID }) => {
    let { name, position } = jugador;
  let id_equipo = teamID;
  const values = [id_equipo, name, position];
  const queryString = "INSERT INTO jugadores VALUES (DEFAULT, $1, $2, $3)";
  await pool.query(queryString, values);
}

module.exports = { getTeams, addTeam, getPlayers, addPlayer }