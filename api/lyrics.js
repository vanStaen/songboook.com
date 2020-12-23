const express = require("express");
const router = express.Router();
const axios = require('axios');
const levenshtein = require('js-levenshtein');

const Genius = require('genius-api');

const accessToken = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
const genius = new Genius(accessToken)

async function fetchLyrics(artist, song) {
    const lyricsApiUrl = process.env.LYRICS_API_URL + artist.replace(/ /g, "%20") + '/' + song.replace(/ /g, "%20") + '?apikey=' + process.env.LYRICS_API_KEY;
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

// GET lyrics
router.get("/:artist/:song", async (req, res) => {
    try {
        // fetch Entries
        fetchLyrics(req.params.artist, req.params.song).then((resData) => {
            const cleanedOriginalArtist = req.params.artist.toLowerCase().replace(/ /g, "");
            const cleanFoundArtist = resData.artist.name.toLowerCase().replace(/ /g, "");
            const sameArtist = levenshtein(cleanedOriginalArtist, cleanFoundArtist) < 5 ? true : false;
            if (sameArtist || resData.similarity > 0.9) {
                res.status(201).json({ lyrics: resData.track.text });
            } else {
                console.log('levenshtein:', cleanedOriginalArtist, cleanFoundArtist, levenshtein(cleanedOriginalArtist, cleanFoundArtist))
                console.log('similarity:', resData.similarity);
                res.status(400).json({
                    error: `No lyrics found for ${req.params.artist} - ${req.params.song} (error: ${error})`,
                });
            }
        }
        ).catch(error => {
            console.log(error);
            res.status(400).json({
                error: `No lyrics found for ${req.params.artist} - ${req.params.song} (error: ${error})`,
            });
        });

    } catch (err) {
        res.status(400).json({
            error: `${err}`,
        });
    }
});

module.exports = router;



