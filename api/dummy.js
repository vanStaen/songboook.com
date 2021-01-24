const express = require("express");
const router = express.Router();

// GET Dummy endpoimt
router.get("/", async (req, res) => {

  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }

  try {
    res.status(201).json({
      Dummy: "Success",
      User: req.userId,
      Email: req.email,
      isAuth: red.isAuth
    }
    );
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;



