const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const { Client } = require("pg");
const levenshtein = require("js-levenshtein");

// Init Postgres
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});
process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // This bypasses the SSL verification

// Connect to Postgres
client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Lyrics:", "Connected to postgres db!");
  }
});

function sqlEscape(input) {
  try {
    let output;
    output = replaceAll(input, "'", "''");
    return output;
  } catch (err) {
    console.log(`${err}`);
  }
}

function replaceAll(str, find, replace) {
  const pieces = str.split(find);
  const resultingString = pieces.join(replace);
  return resultingString;
}

// GET lyrics
router.get("/:id", async (req, res) => {
  const songbook = await client.query(
    "SELECT * FROM songbook WHERE id=" + req.params.id
  );
  const artist = songbook.rows[0].artist;
  const song = songbook.rows[0].song;
  const geniusUrl = songbook.rows[0].geniusurl;
  const lyrics = songbook.rows[0].lyrics;

  if (lyrics !== null && lyrics !== "") {
    res.status(201).json({ lyrics: lyrics });
  } else {
    try {
      // fetch Entries
      if (geniusUrl !== null) {
        fetchLyricsGenius(geniusUrl)
          .then((resData) => {
            const $ = cheerio.load(resData);
            const lyrics = $(".lyrics").text().trim();
            const updateLyrics = `UPDATE songbook set lyrics='${sqlEscape(
              lyrics
            )}' WHERE id=${req.params.id}`;
            client.query(updateLyrics);
            //console.log('lyrics', lyrics)
            res.status(201).json({ lyrics: lyrics });
          })
          .catch((error) => {
            //console.log(error)
            res.status(400).json({
              error: `No lyrics found for ${artist} - ${song} (error: ${error})`,
            });
          });
      } else {
        fetchLyrics(artist, song)
          .then((resData) => {
            const cleanedOriginalArtist = artist
              .toLowerCase()
              .replace(/ /g, "");
            const cleanFoundArtist = resData.artist.name
              .toLowerCase()
              .replace(/ /g, "");
            const sameArtist =
              levenshtein(cleanedOriginalArtist, cleanFoundArtist) < 5
                ? true
                : false;
            if (sameArtist || resData.similarity > 0.9) {
              const updateLyrics = `UPDATE songbook set lyrics='${sqlEscape(
                resData.track.text
              )}' WHERE id=${req.params.id}`;
              client.query(updateLyrics);
              res.status(201).json({ lyrics: resData.track.text });
            } else {
              console.log(
                "levenshtein:",
                cleanedOriginalArtist,
                cleanFoundArtist,
                levenshtein(cleanedOriginalArtist, cleanFoundArtist)
              );
              console.log("similarity:", resData.similarity);
              res.status(400).json({
                error: `No lyrics found for ${artist} - ${song} (error: ${error})`,
              });
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (err) {
      res.status(400).json({
        error: `${err}`,
      });
    }
  }
});

async function fetchLyrics(artist, song) {
  const lyricsApiUrl =
    process.env.LYRICS_API_URL +
    artist.replace(/ /g, "%20") +
    "/" +
    song.replace(/ /g, "%20") +
    "?apikey=" +
    process.env.LYRICS_API_KEY;
  // console.log(lyricsApiUrl);
  const response = await axios({
    url: lyricsApiUrl,
    method: "GET",
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Error!");
  }
  const result = await response.data;
  const resultLyrics = result.result;
  return resultLyrics;
}

async function fetchLyricsGenius(geniusUrl) {
  const response = await axios({
    url: geniusUrl,
    method: "GET",
  });
  if ((response.status !== 200) & (response.status !== 201)) {
    throw new Error("Error!");
  }
  const result = await response.data;
  const resultLyrics = result;
  return resultLyrics;
}

module.exports = router;
