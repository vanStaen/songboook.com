import { React, useState } from "react";
import axios from 'axios';
import levenshtein from 'js-levenshtein';

const Lyrics = (props) => {
    const [lyrics, setLyrics] = useState('Loading ...');
    const lyricsApiUrl = process.env.REACT_APP_LYRICS_API_URL + props.artist.replace(/ /g, "%20") + '/' + props.song.replace(/ /g, "%20") + '?apikey=' + process.env.REACT_APP_LYRICS_API_KEY;

    const loadLyrics = () => {
        async function fetchLyrics() {
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
        // fetch Entries
        fetchLyrics().then((resData) => {
            const cleanedOriginalArtist = props.artist.toLowerCase().replace(/ /g, "");
            const cleanFoundArtist = resData.artist.name.toLowerCase().replace(/ /g, "");
            const sameArtist = levenshtein(cleanedOriginalArtist, cleanFoundArtist) < 5 ? true : false;
            if (sameArtist || resData.similarity > 0.9) {
                setLyrics(resData.track.text);
            } else {
                console.log('levenshtein:', cleanedOriginalArtist, cleanFoundArtist, levenshtein(cleanedOriginalArtist, cleanFoundArtist))
                console.log('similarity:', resData.similarity);
                setLyrics('No lyrics found.');
            }
        }
        ).catch(error => {
            setLyrics('No lyrics found.');
            console.log(error.message);
        });
    };

    if (lyrics === 'Loading ...') {
        loadLyrics();
    }

    return (
        <div style={{ whiteSpace: "pre-line" }}>
            {lyrics}
        </div>
    );
}

export default Lyrics;