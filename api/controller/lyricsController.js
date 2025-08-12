const router = require("express").Router();
const levenshtein = require("js-levenshtein");
const cheerio = require("cheerio");

const { songService } = require("../service/songService");
const { lyricsService } = require("../service/lyricsService");

// GET lyrics
router.get("/:id", async (req, res) => {
  const song = await songService.getSongById(req.params.id);
  if (!song) {
    return res.status(400).json({
      error: `No song with id${req.params.id} was found!`,
    });
  }
  const artist = song.artist;
  const songName = song.song;
  const geniusUrl = song.geniusurl;
  const lyrics = song.lyrics;

  if (lyrics !== null && lyrics !== "") {
    res.status(201).json({ lyrics: lyrics });
  } else {
    try {
      if (geniusUrl !== null) {
        try {
          const lyricsGenius = await lyricsService.fetchLyricsGenius(geniusUrl);
          const $ = await cheerio.load(lyricsGenius);
          const lyrics = $(".lyrics").text().trim();
          /*const updateLyrics = `UPDATE songbook set lyrics='${sqlEscape(
              lyrics
            )}' WHERE id=${req.params.id}`;
            client.query(updateLyrics);
          console.log("lyrics", lyrics);*/
          res.status(201).json({ lyrics: lyrics });
        } catch (error) {
          //console.log(error)
          res.status(400).json({
            error: `No lyrics found for ${artist} - ${songName} (error: ${error})`,
          });
        }
      } else {
        try {
          const lyricsFetched = await lyricsService.fetchLyrics(
            artist,
            songName
          );
          if (!lyricsFetched) {
            return res.status(400).json({
              error: `No lyrics found for '${artist} - ${songName}'`,
            });
          }
          const cleanedOriginalArtist = await artist
            .toLowerCase()
            .replace(/ /g, "");
          const cleanFoundArtist = lyricsFetched.artist.name
            .toLowerCase()
            .replace(/ /g, "");
          const sameArtist =
            levenshtein(cleanedOriginalArtist, cleanFoundArtist) < 5
              ? true
              : false;
          if (sameArtist || lyricsFetched.similarity > 0.9) {
            /*const updateLyrics = `UPDATE songbook set lyrics='${sqlEscape(
              lyricsFetched.track.text
            )}' WHERE id=${req.params.id}`;
            client.query(updateLyrics);*/
            res.status(201).json({ lyrics: lyricsFetched.track.text });
          } else {
            res.status(400).json({
              error: `No lyrics found for '${artist} - ${songName}'`,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (err) {
      res.status(400).json({
        error: `${err}`,
      });
    }
  }
});

module.exports = router;
