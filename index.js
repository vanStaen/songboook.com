const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieSession = require("./middleware/cookieSession");
const redirectTraffic = require("./middleware/redirectTraffic");

const PORT = process.env.PORT || 5002;
require("dotenv/config");

// Init Express
const app = express();

// Redirect trafic to root and https
app.set("trust proxy", true);
app.use(redirectTraffic);

// Fix moongoose deprecation warning
mongoose.set('useCreateIndex', true);

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session Cookie Middleware
app.use(cookieSession);

// Allow cross origin request
app.use(function (req, res, next) {
  let corsOptions = {};
  if ((req.get('host') === 'localhost:5002')) {
    corsOptions = {
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }
  } else {
    corsOptions = {
      origin: [
        'https://www.songboook.com',
        'https://songboook.com',
        'http://songboook.herokuapp.com',
        'https://songboook.herokuapp.com',
      ],
      credentials: true,
      optionsSuccessStatus: 200
    }
  }
  cors(corsOptions)(req, res, next);
})

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")); });

// Router to API endpoints
app.use("/auth", require("./api/controller/authController"));
app.use("/songbook", require("./api/songbook"));
app.use("/lyrics", require("./api/lyrics"));
app.use("/randomized", require("./api/randomized"));
app.use("/dummy", require("./api/dummy"));
app.use("/passport", require("./api/passport"));
app.use("/token", require("./api/token"));


// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
