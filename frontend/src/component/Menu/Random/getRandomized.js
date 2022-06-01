
import axios from 'axios';

export const getRandomized = async (checked) => {
    let option = "";
    if (checked !== undefined) {
        option = `/${checked}`;
    }
    const response = await axios({
        url: process.env.API_URL + "/randomized" + option,
        method: "GET",
    });
    if ((response.status !== 200) & (response.status !== 201)) {
        throw new Error("Error!");
    }
    const random = await response.data;
    return random;
}