const controller = require ('../controllers/comment.controller');
const { authJwt } = require("../middlewares");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.post('/api/test/comment/:id', [authJwt.verifyToken], controller.createComment);
      app.get('/api/test/comment/:id', controller.getComment);
      app.patch('/api/test/comment/update/:id', [authJwt.verifyToken], controller.updateComment);
      app.delete('/api/test/comment/delete/:id', [authJwt.verifyToken], controller.deleteComment);
      app.get('/api/test/comment', controller.getAllComments);
}