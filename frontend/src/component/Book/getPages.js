
import axios from 'axios';

export const getPages = async () => {
    const response = await axios({
        url: process.env.API_URL + "/song",
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const entries = await response.data;
    return entries;
}