require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./config/db.config");
const app = express();
const corsOptions = {
  origin: "http://localhost:8081" && "https://mataviguette.herokuapp.com",
};
const db = require("./models");
const Role = db.role;
const path = require("path");

db.mongoose
  .connect(
    process.env.MONGODB_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/comment.routes")(app);
require("./routes/rental.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/formContact.routes")(app);
require("./routes/payment.routes")(app);

// Pour AWS
const appPath = path.join(__dirname, "../client/build");
app.use(express.static(appPath));

app.get("*", (req, res) => {
    res.sendFile(path.join(appPath, "index.html"));
});


// Pour HEROKU : 
// if (process.env.NODE_ENV === "production") {
//   const appPath = path.join(__dirname, "client", "build");
//   app.use(express.static(appPath));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(appPath, "index.html"));
//   });
// }

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}





    
    