
import axios from 'axios';

export const getPages = async () => {
    const response = await axios({
        url: process.env.REACT_APP_API_URL + "/songbook",
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const entries = await response.data;
    return entries;
}