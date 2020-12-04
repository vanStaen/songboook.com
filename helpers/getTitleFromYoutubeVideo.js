const axios = require('axios');
require("dotenv/config");

async function getTitleFromYoutubeVideo(videoID) {

    const googleApiKey = process.env.GOOGLE_API_KEY;
    const googleApiUrl = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + videoID + "&key=" + googleApiKey;
    const resTitle = await axios.get(googleApiUrl)
        .then(response => {
            title = response.data.items[0].snippet.title;
            return title;
        })
        .catch(error => {
            console.log(error);
        });

    return resTitle;
}

module.exports = getTitleFromYoutubeVideo;