const express = require("express");
const router = express.Router();
const getfirstResultGoogleSearch = require('../helpers/getfirstResultGoogleSearch');
const { Client } = require("pg");


// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Randomized:', 'Connected to postgres db!')
  }
})

// GET and randowm row result
router.get("/", async (req, res) => {
  try {
    const randomized = await client.query(`SELECT * FROM songbook WHERE randomized=false`);
    if (randomized.rows.length > 0) {
      res.status(201).json(songbook.rows);
    } else {
      res.status(400).json({
        error: `No data found with id#${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// GET and randowm row result (based on "Checked" status)
router.get("/:checked", async (req, res) => {
  try {
    const randomized = await client.query(`SELECT * FROM songbook WHERE checked=${req.params.checked} AND randomized=false`);
    if (randomized.rows.length > 0) {
      res.status(201).json(songbook.rows);
    } else {
      res.status(400).json({
        error: `No data found with id#${req.params.id}`,
      });
    }
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

module.exports = router;



