const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const isAuth = require("./middleware/is-auth");
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

// Authorization Middleware
app.use(isAuth);

// Allow cross origin request
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PATCH, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

// Set up for React
app.use(express.static(path.join(__dirname, "build")));
app.get('/', (req, res) => { res.sendFile(path.join(__dirname, "build", "index.html")); });

// Router to API endpoints
app.use("/songbook", require("./api/songbook"));
app.use("/lyrics", require("./api/lyrics"));
app.use("/randomized", require("./api/randomized"));
app.use("/dummy", require("./api/dummy")); app.use("/passport", require("./api/passport"));
app.use("/login", require("./api/login"));
app.use("/token", require("./api/token"));
app.use("/logout", require("./api/logout"));


// Connect to Mongo db
mongoose.connect(
  process.env.DB_REWAER_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to db!")
);

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
