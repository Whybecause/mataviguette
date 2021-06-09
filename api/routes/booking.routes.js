const controller = require ('../controllers/booking.controller');
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.post("/api/test/bookings/Mataviguette",[authJwt.verifyToken], controller.createBooking);
      app.get("/api/test/bookings/user/all", [authJwt.verifyToken], controller.getAllUserBookings);
      app.get("/api/test/bookings/all", [authJwt.verifyToken, authJwt.isAdmin], controller.getAllBookings);
      app.get("/api/test/bookings/current", [authJwt.verifyToken, authJwt.isAdmin], controller.getCurrentBookings);
      app.delete("/api/test/booking/delete/:id", [authJwt.verifyToken], controller.deleteBookingWhenPaymentFails);
      app.delete("/api/test/booking/delete/admin/:id", [authJwt.verifyToken, authJwt.isAdmin], controller.deleteBooking);
}