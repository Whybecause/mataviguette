const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const { authJwt } = require("../middlewares");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], controller.signup );
  app.post("/api/auth/signin", controller.signin);
  app.post("/api/confirmation", controller.confirmationPost);
  app.post("/api/resend", controller.resendTokenPost);
  app.post("/api/password/send", controller.sendEmailResetPassword);
  app.post("/api/password/reset", controller.resetPassword )
  app.get("/api/token", [authJwt.verifyToken], controller.isValidToken);
  app.get("/api/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.isValidAdmin);
  app.patch("/api/auth/password/update", [authJwt.verifyToken], controller.changePassword);
  app.patch("/api/auth/email/update", [authJwt.verifyToken], controller.changeEmail);
  app.delete("/api/v1/user/delete", [authJwt.verifyToken], controller.deleteUser)
};