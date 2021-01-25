const express = require("express");
const router = express.Router();

// GET Dummy endpoint
router.get("/", async (req, res) => {

  if (!req.isAuth) {
    res.status(401).json({
      Dummy: "Unauthorized",
      isAuth: req.isAuth
    });
    return;
  }

  try {
    res.status(201).json({
      Dummy: "Success",
      User: req.userId,
      Email: req.email,
      isAuth: req.isAuth
    }
    );
  } catch (err) {
    res.status(400).json({
      Dummy: "Failure",
      error: `${err})`,
      isAuth: req.isAuth
    });
  }
});

module.exports = router;
