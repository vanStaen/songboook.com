const axios = require("axios");

exports.lyricsService = {
  async fetchLyrics(artist, song) {
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
  },

  async fetchLyricsGenius(geniusUrl) {
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
  },
};
