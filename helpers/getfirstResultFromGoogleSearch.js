const axios = require('axios');
const cheerio = require('cheerio');
require("dotenv/config");

async function getFirstResultFromGoogleSearch(searchWords) {

    const googleSearchUrl = `https://www.google.com/search?q=${searchWords.join("+")}`;
    const resTitle = await axios.get(googleSearchUrl)
        .then(response => {
            const $ = cheerio.load(response.data);
            const firstLink = $('.kCrYT').children('a').attr('href');
            const cleanLink = firstLink.split("=")[1].split("&")[0];
            // console.log('link', cleanLink);
            return cleanLink;
        })
        .catch(error => {
            console.log(error);
        });

    return resTitle;
}

module.exports = getFirstResultFromGoogleSearch;