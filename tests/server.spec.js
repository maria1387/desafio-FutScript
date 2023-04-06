const request = require("supertest");
const app = require("../index").listen();



describe("Tests FutScript", () => {
 
  it("debe devolver un objeto y un código de estado de 200 al enviar las credenciales correctas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "admin", password: "1234" });
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toBe("object");
  });
  it("debe devolver un código de estado de 400 al enviar credenciales incorrectas", async () => {
    const res = await request(app)
      .post("/login")
      .send({ username: "user", password: "abcd" });
    expect(res.statusCode).toBe(401);
  });
  it("debe devolver un código de estado de 201 al enviar un nuevo jugador junto con un token válido en los encabezados", async () => {
    const loginRes = await request(app)
      .post("/login")
      .send({ username: "admin", password: "password" });
    const token = loginRes.body.token;
    request(app)
      .post("/equipos/7/jugadores")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "new player", position: 3 })
      .end((err, res) => {
        if (err) throw err;
        expect(res.statusCode).toBe(201);
      });
  });

});
