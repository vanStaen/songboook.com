import React, { useState, useEffect, useCallback } from "react";
import { RedoOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
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
    const [lyrics, setLyrics] = useState(props.lyrics ? props.lyrics : 'Loading ...');
    const [notFound, setNotFound] = useState(false);

    const loadLyrics = useCallback(() => {
        if (lyrics === "Loading ..." || lyrics === null) {
            const fetchLyrics = async () => {
                const response = await axios({
                    url: process.env.REACT_APP_API_URL + `/lyrics/${props.id}`,
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
                        setNotFound(false);
                    } else {
                        setNotFound(true);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setNotFound(true);
                });
        }
    }, [lyrics, props.id]);

    useEffect(() => {
        loadLyrics();
    }, [loadLyrics]);

    const handleRetryFetchLyrics = () => {
        setLyrics("Loading ...");
        setNotFound(false);
        loadLyrics();
    }

    return (
        <div style={{ whiteSpace: "pre-line" }}>
            {
                !notFound ? lyrics :
                    (<div>
                        No lyrics found.
                        &nbsp;
                        <Tooltip title={"Try again to fetch lyrics."}>
                            <RedoOutlined onClick={handleRetryFetchLyrics} />
                        </Tooltip>
                    </div>)
            }


        </div>
    );
}

export default Lyrics;