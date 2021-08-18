const controller = require ('../controllers/rental.controller');
const googleCtrl = require('../controllers/googleCalendar.controller');
const { authJwt } = require("../middlewares");
const daysController = require ('../controllers/days.controller');


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      // app.get("/api/test/rentals/secret", [authJwt.verifyToken], controller.secret);
      app.post("/api/test/rentals/create", [authJwt.verifyToken, authJwt.isAdmin], controller.createRental);
      app.get("/api/test/rentals/manage", [authJwt.verifyToken, authJwt.isAdmin], controller.getUserRentals);
      // app.get("/api/test/rentals/:id", controller.getRentalById);
      app.get("/api/test/rentals/current", controller.getMataviguette);
      app.get('/api/test/rentals/booked', googleCtrl.getGoogleCalListEvents)
      app.patch("/api/test/rentals/update/mataviguette", [authJwt.verifyToken, authJwt.isAdmin], controller.rentalUpdateMataviguette);
      // app.delete("/api/test/rentals/delete/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteRentalById);
}