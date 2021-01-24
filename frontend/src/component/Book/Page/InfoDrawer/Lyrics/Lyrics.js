import { React, useState, useEffect } from "react";
import axios from 'axios';

const fixLatinEncoding = (input) => {
    let output = "";
    output = input
        .toString()
        .replaceAll("Ã©", "é")
        .replaceAll("Ãª", "ê")
        .replaceAll("Ã¨", "è")
        .replaceAll("Ã§", "ç")
        .replaceAll("Ã» ", "û")
        .replaceAll("Ã", "à");
    return output;
}

const Lyrics = (props) => {
    const [lyrics, setLyrics] = useState('Loading ...');

    useEffect(() => {
        if (lyrics === "Loading ..." || lyrics === "No lyrics found.") {
            loadLyrics();
        }
    });

    const loadLyrics = () => {
        if (lyrics !== "Loading ..." && lyrics !== null) { return }
        async function fetchLyrics() {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + `lyrics/${props.id}`,
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
                //console.log(resData.lyrics);
                if (resData.lyrics.length > 0) {
                    setLyrics(fixLatinEncoding(resData.lyrics));
                } else {
                    setLyrics('No lyrics found.');
                }
            })
            .catch(error => {
                console.log(error);
                setLyrics('No lyrics found.');
            });
    };

    return (
        <div style={{ whiteSpace: "pre-line" }}>
            {lyrics}
        </div>
    );
}

export default Lyrics;