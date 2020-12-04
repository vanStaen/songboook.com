const express = require("express");
const router = express.Router();
const getTitleFromYoutubeVideo = require('../helpers/getTitleFromYoutubeVideo')
const { Client } = require("pg");

// Init Postgres
const client = new Client({ connectionString: process.env.DATABASE_URL, ssl: true })
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres 
client.connect(err => {
  if (err) {
    console.error('connection error', err.stack)
  } else {
    console.log('Connected to postgres db!')
  }
})

// GET all data from watchlist
router.get("/", async (req, res) => {
  try {
    const watchlist = await client.query('SELECT * FROM watchlist ORDER BY done ASC, id ASC;');
    res.status(201).json(watchlist.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET single data from watchlist (based on id)
router.get("/:id", async (req, res) => {
  try {
    const watchlist = await client.query('SELECT * FROM watchlist WHERE id=' + req.params.id);
    if (watchlist.rows.length > 0) {
      res.status(201).json(watchlist.rows);
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

// DELETE single data from watchlist (based on id)
router.delete("/:id", async (req, res) => {
  try {
    const watchlist = await client.query('DELETE FROM watchlist WHERE id=' + req.params.id);
    res.status(200).json({
      success: `Entry #${req.params.id} has been deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// PATCH single data from watchlist (based on id)
router.patch("/:id", async (req, res) => {

  let updateField = '';
  if (req.body.done !== undefined) {
    updateField = updateField + "done='" + req.body.done + "',";
  }
  if (req.body.link) {
    updateField = updateField + "link='" + req.body.link + "',";
  }
  if (req.body.active !== undefined) {
    updateField = updateField + "active=" + req.body.active + ",";
  }
  if (req.body.tags) {
    updateField = updateField + "tags= ARRAY ['" + req.body.tags.join("','") + "'],";
  }
  if (req.body.rate !== undefined) {
    updateField = updateField + "rate=" + req.body.rate + ",";
  }
  if (req.body.title) {
    updateField = updateField + "title='" + req.body.title + "',";
  }

  const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
  const updateQuery = 'UPDATE watchlist SET ' + updateFieldEdited + ' WHERE id=' + req.params.id;

  try {
    const watchlist = await client.query(updateQuery);
    if (watchlist.rowCount > 0) {
      res.status(200).json({
        success: `Entry #${req.params.id} has been updated.`,
      });
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

// POST add to watchlist
router.post("/", async (req, res) => {

  // Title and Link are Mandatory
  if (!req.body.link) {
    return res.status(400).json({ error: `Error: Some field are missing. You need to pass at least a Link to create a new entry.` });
  }

  const youtubeVideoID = req.body.link.split('&')[0].split('=')[1];
  const titleFromYoutube = await getTitleFromYoutubeVideo(youtubeVideoID);
  const link = req.body.link;
  const title = req.body.title ? req.body.title : titleFromYoutube;
  const tags = req.body.tags ? "ARRAY ['" + req.body.tags.join("','") + "']" : "null";
  const done = req.body.done ? req.body.done : false;
  const insertQuery = `INSERT INTO watchlist (title, link, tags, done) VALUES ('${title}', '${link}', ${tags}, ${done})`;

  try {
    const watchlist = await client.query(insertQuery);
    res.status(201).json({ success: "Success" });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }

});

module.exports = router;



