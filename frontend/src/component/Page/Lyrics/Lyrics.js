import { React, useState } from "react";
import axios from 'axios';
import { Tooltip, Drawer, Divider, Result } from 'antd';
import { MenuUnfoldOutlined, } from '@ant-design/icons';

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
            const resultLyrics = result.result.track.text;
            return resultLyrics;
        }
        // fetch Entries
        fetchLyrics().then((resData) => {
            setLyrics(resData);
        }
        ).catch(error => {
            setLyrics('No lyrics found.');
            console.log(error.message);
        });
    };

    loadLyrics();

    return (
        <div style={{ whiteSpace: "pre-line" }}>
            {lyrics}
        </div>
    );
}

export default Lyrics;