import axios from "axios";
import { userStore } from "../../store/userStore";

export const getUser = async () => {

  const response = await axios({
    url: process.env.REACT_APP_API_URL + `/user`,
    method: "GET",
  });

  if ((response.status !== 200) & (response.status !== 201)) {
    if (response.status === 401) {
      throw new Error(`Error! Unauthorized(401)`);
    } else {
      throw new Error(`Error! Status ${response.status}`);
    }
  }

  const user = await response.data[0];
  userStore.setUserName(user.name);
  userStore.setPicUrl(user.picurl);
  return user;

};