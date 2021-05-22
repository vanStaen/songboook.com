import { action, makeObservable, observable } from "mobx";
import jsonwebtoken, { TokenExpiredError } from "jsonwebtoken";

import { displayStore } from "./displayStore";

export class AuthStore {
  token = null;
  refreshToken = localStorage.getItem("refreshToken") || null;

  constructor() {
    makeObservable(this, {
      token: observable,
      refreshToken: observable,
      login: action,
      logout: action,
      getNewToken: action,
    });
  }

  login = (token, refreshToken) => {
    this.token = token;
    this.refreshToken = refreshToken;
    displayStore.setShowPage("book");
  };

  logout = () => {
    // Delete refreshtoken from localstorage,
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("user");
    localStorage.clear();
    const deleteRequest = { refreshToken: this.refreshToken };
    this.token = null;
    this.refreshToken = null;
    // Delete token from store
    fetch(process.env.REACT_APP_API_URL + "/logout", {
      method: "DELETE",
      body: JSON.stringify(deleteRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          throw new Error("Error when logout!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    displayStore.setShowPage("book");
  };

  getNewToken = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    // Check if refreshtoken is expired
    if (refreshToken) {
      try {
        jsonwebtoken.decode(refreshToken, { complete: true });
        this.refreshToken = refreshToken;
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          console.log("refreshtoken is expired", err);
          this.logout();
        } else {
          console.log("unknown error:", err);
        }
      }
    }
    // Check if token exist and/or is expired
    if (this.token !== null) {
      try {
        jsonwebtoken.decode(this.token, { complete: true });
      } catch (err) {
        if (err instanceof TokenExpiredError) {
          console.log("token is expired", err);
          this.logout();
        } else {
          console.log("unknown error:", err);
        }
      }
    }
    // Refresh token if token missing
    else if (this.refreshToken) {
      let requestBody = { refreshToken: this.refreshToken };
      return fetch(process.env.REACT_APP_API_URL + "/token", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            this.logout();
            throw new Error("Error when refreshing the token!");
          }
          return res.json();
        })
        .then((resData) => {
          localStorage.setItem("refreshToken", resData.refreshToken);
          if (resData.token) {
            this.login(resData.token, resData.refreshToken);
            return resData.token;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

export const authStore = new AuthStore();
