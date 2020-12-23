import { React, useState } from "react";
import axios from 'axios';

const Lyrics = (props) => {
    const [lyrics, setLyrics] = useState('Loading ...');

    const loadLyrics = () => {
        async function fetchLyrics() {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + `lyrics/${props.artist}/${props.song}`,
                method: "GET",
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const result = await response.data;
            const resultLyrics = result;
            return resultLyrics;
        }
        // fetch Entries
        fetchLyrics()
            .then((resData) => {
                setLyrics(resData.lyrics)
            })
            .catch(error => {
                console.log(error);
                setLyrics('No lyrics found.');
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