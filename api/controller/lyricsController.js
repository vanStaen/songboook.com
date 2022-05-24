const router = require("express").Router();
const levenshtein = require("js-levenshtein");
const cheerio = require("cheerio");
const { lyricsService } = require("../service/lyricsService");

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

  if (lyrics !== null && lyrics !== "") {
    res.status(201).json({ lyrics: lyrics });
  } else {
    try {
      // fetch Entries
      if (geniusUrl !== null) {
        lyricsService
          .fetchLyricsGenius(geniusUrl)
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
        lyricsService
          .fetchLyrics(artist, song)
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

module.exports = router;
