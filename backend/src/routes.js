const routes = require('express').Router();

const authMiddleware = require("./middleware/auth");
const AuthController = require("./controllers/AuthController");
const CepController = require("./controllers/CepController");

routes.post("/auth", AuthController.auth);

routes.use(authMiddleware);
routes.get("/ceps", CepController.index);
routes.post("/ceps", CepController.create);

/*
routes.put("/ceps/update", CepController.update);
routes.delete("/ceps/delete", CepController.delete);
*/

module.exports = routes;