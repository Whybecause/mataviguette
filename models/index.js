const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.ROLES = ["user", "admin", "moderator"];
db.role = require("./role.model");
db.user = require("./user.model");
db.comment = require("./comment.model");
db.rental = require("./rental.model");
db.booking = require('./booking.model');
db.token = require('./tokenCheckRegister');


module.exports = db;