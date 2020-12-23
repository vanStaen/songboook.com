const express = require("express");
const router = express.Router();
//const getFirstResultFromGoogleSearch = require('../helpers/getFirstResultFromGoogleSearch')
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

// GET all data from songbook
router.get("/", async (req, res) => {
  try {
    const songbook = await client.query('SELECT * FROM songbook ORDER BY id ASC;');
    res.status(201).json(songbook.rows);
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

// GET single data from songbook (based on id)
router.get("/:id", async (req, res) => {
  try {
    const songbook = await client.query('SELECT * FROM songbook WHERE id=' + req.params.id);
    if (songbook.rows.length > 0) {
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

// DELETE single data from songbook (based on id)
router.delete("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  try {
    const songbook = await client.query('DELETE FROM songbook WHERE id=' + req.params.id);
    res.status(200).json({
      success: `Entry #${req.params.id} has been deleted.`,
    });
  } catch (err) {
    res.status(400).json({
      error: `${err}`,
    });
  }
});

// PATCH single data from songbook(based on id)
router.patch("/:id", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  let updateField = '';
  if (req.body.active !== undefined) {
    updateField = updateField + "active=" + req.body.active + ",";
  }
  if (req.body.link) {
    updateField = updateField + "link='" + req.body.link + "',";
  }
  if (req.body.checked !== undefined) {
    updateField = updateField + "checked=" + req.body.checked + ",";
  }
  if (req.body.tags) {
    updateField = updateField + "tags= ARRAY ['" + req.body.tags.replace("'", "").join("','") + "'],";
  }
  if (req.body.title) {
    updateField = updateField + "title='" + req.body.title.replace("'", "") + "',";
  }
  if (req.body.picurl) {
    updateField = updateField + "picurl='" + req.body.picurl + "',";
  }
  if (req.body.bookmark !== undefined) {
    updateField = updateField + "bookmark='" + req.body.bookmark + "',";
  }
  if (req.body.videourl) {
    updateField = updateField + "videourl='" + req.body.videourl + "',";
  }
  if (req.body.artist) {
    updateField = updateField + "artist='" + req.body.artist.replace("'", "") + "',";
  }
  if (req.body.song) {
    updateField = updateField + "song='" + req.body.song.replace("'", "") + "',";
  }
  if (req.body.piano !== undefined) {
    updateField = updateField + "piano='" + req.body.piano + "',";
  }
  if (req.body.bass !== undefined) {
    updateField = updateField + "bass='" + req.body.bass + "',";
  }
  if (req.body.geniusurl !== undefined) {
    updateField = updateField + "geniusurl='" + req.body.geniusurl + "',";
  }
  const updateFieldEdited = updateField.slice(0, -1) // delete the last comma
  const updateQuery = 'UPDATE songbook SET ' + updateFieldEdited + ' WHERE id=' + req.params.id;
  //console.log(updateQuery);
  try {
    const songbook = await client.query(updateQuery);
    if (songbook.rowCount > 0) {
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

// POST add to songbook
router.post("/", async (req, res) => {
  if (!req.isAuth) {
    res.status(401).json({
      error: "Unauthorized",
    });
    return;
  }
  // Title and Link are Mandatory
  if (!req.body.artist || !req.body.song) {
    return res.status(400).json({ error: `Error: Some field are missing. You need to pass at least an 'artist' name, and a 'song' name to create a new entry.` });
  }
  const artist = req.body.artist.replace("'", "");
  const song = req.body.song.replace("'", "");
  const picurl = req.body.picurl ? req.body.picurl : null;
  const link = req.body.link ? req.body.link : null;
  const title = req.body.title ? req.body.title.replace("'", "") : artist + '-' + song;
  const tags = req.body.tags ? "ARRAY ['" + req.body.tags.replace("'", "").join("','") + "']" : `ARRAY ['${artist}','${song}']`;
  const bookmark = req.body.bookmark ? req.body.bookmark : false;
  const active = req.body.active ? req.body.active : true;
  const videourl = req.body.videourl ? req.body.videourl : null;
  const piano = req.body.piano ? req.body.piano : false;
  const bass = req.body.bass ? req.body.bass : false;
  const checked = req.body.checked ? req.body.checked : false;
  const geniusurl = null;
  //const geniusurl = await getFirstResultFromGoogleSearch(['"' + artist.split(' ').join('","'), song.split(" ").join("', '") + '"', 'lyrics', 'genius']);
  const insertQuery = `INSERT INTO songbook (title, link, tags, picurl, active, bookmark, artist, song, videourl, piano, checked, bass, geniusurl) VALUES ('${title}', '${link}', ${tags}, '${picurl}', ${active}, ${bookmark}, '${artist}', '${song}', '${videourl}', ${piano}, ${checked}, ${bass}, '${geniusurl}')`;
  try {
    const songbook = await client.query(insertQuery);
    res.status(201).json({ success: "Success" });
  } catch (err) {
    res.status(400).json({
      error: `${err})`,
    });
  }
});

module.exports = router;



