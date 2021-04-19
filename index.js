const express = require("express");
const path = require("path");
const isAuth = require("./middleware/is-auth");

const PORT = process.env.PORT || 5002;
require("dotenv/config");

// Init Express
const app = express();

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
app.get('/.well-known/acme-challenge/:content', function (req, res) {
  res.send('k2HJjcoGkBYNQgZ4U6TpevjSzz6tOSKyn6f7RSdYE0M.Jr5r8DGVQ4AD-PDm8eKRyzFImCTHpPmykZ4DY_41uOk')
})

// Router to API endpoints
app.use("/songbook", require("./api/songbook"));
app.use("/lyrics", require("./api/lyrics"));
app.use("/randomized", require("./api/randomized"));
app.use("/dummy", require("./api/dummy"));

// Listen on a port
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
