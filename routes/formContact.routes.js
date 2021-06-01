const controller = require('../controllers/formContact.controller');
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

    app.post("/api/test/send", controller.sendContactForm);
    app.post("/api/test/booker/send/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.sendEmailToBooker);
    app.post("/api/test/host/send/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.sendEmailToHost);
}