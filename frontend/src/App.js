import { useEffect, useState } from 'react';
import { notification } from "antd";
import jsonwebtoken from "jsonwebtoken";

import './App.css';

import AddForm from './component/AddForm/AddForm';
import Login from './component/Login/Login';
import Book from './component/Book/Book';
import Menu from './component/Menu/Menu';
import Search from './component/Search/Search';
import Footer from './component/Footer/Footer';

const DEBUG = process.env.NODE_ENV === "development";

const openNotification = (msg, desc, showtime, type) => {
  notification.open({
    message: msg,
    description: desc,
    duration: showtime,
    type: type,
    placement: "topRight",
  });
};

function App() {

  const [token, setToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken"));

  const [filterBass, setFilterBass] = useState(false);
  const [filterPiano, setFilterPiano] = useState(false);
  const [filterGuitar, setFilterGuitar] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyFlagKnown, setOnlyFlagKnown] = useState(0); // 0: all, 1: only unknown, 2: only known
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const login = (token, refreshToken) => {
    setToken(token);
    setRefreshToken(refreshToken);
    if (DEBUG) {
      console.log("[login] Access Token:  ", token);
      console.log("[login] Refresh Token:  ", refreshToken);
    }
  };

  const logout = () => {
    // Delete refreshtoken from localstorage, 
    localStorage.removeItem("refreshToken");
    localStorage.clear();
    // Delete token from state
    setToken(null);
    setRefreshToken(null);
    // Delete refreshtoken from db
    const deleteRequest = { refreshToken: refreshToken }
    if (DEBUG) {
      console.log("[logout] Delete request:", deleteRequest);
    }
    fetch(process.env.REACT_APP_AUTH_URL + "logout", {
      method: "DELETE",
      body: JSON.stringify(deleteRequest),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 204) {
          openNotification("Error " + res.status,
            "Error on logout: The refresh token was not found in the token database.", 0, "error");
          throw new Error("Error when logout!"); // Probably was the refresh not found in the db
        }
        openNotification("You have successfully logged out.", "", 3, "success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getNewToken = (refreshToken) => {
    if (DEBUG) {
      console.log("[script] Check access token");
    }

    // Check if refreshtoken is expired
    if (refreshToken != null) {
      let decodedRefreshToken = jsonwebtoken.decode(refreshToken, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedRefreshToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("[script] REFRESH TOKEN HAS EXPIRED!");
        logout();
      }
    }

    // Check if token is expired
    if (token != null) {
      let decodedToken = jsonwebtoken.decode(token, {
        complete: true,
      });
      let dateNow = new Date();
      if (decodedToken.exp < Math.floor(dateNow.getTime() / 1000)) {
        console.log("[script] TOKEN HAS EXPIRED!");
        login(
          null,
          refreshToken
        );
      }
    }

    // Refresh token if token missing
    if (token === null && refreshToken != null) {
      if (DEBUG) {
        console.log("[script] Fetching a new token");
      }
      let requestBody = { refreshToken: refreshToken };
      console.log("requestBody", requestBody);
      fetch(process.env.REACT_APP_AUTH_URL + "token", {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 201) {
            throw new Error("Error when refreshing the token!");
          }
          return res.json();
        })
        .then((resData) => {
          localStorage.setItem("refreshToken", resData.refreshToken);
          if (resData.token) {
            login(
              resData.token,
              resData.refreshToken
            );
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => { setToken(token) }, [token])

  useEffect(() => {
    if (refreshToken != null && token === null) {
      console.log('Interceptor thinks it needs a new token!')
      getNewToken(refreshToken);
    }
  })

  return (
    <div className="App">
      <Search
        showSearchInput={showSearchInput}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
      <header className="App-header">
        <AddForm
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          token={token}
        />
        <Login
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          token={token}
          login={login}
          logout={logout}
        />
        <Menu
          filterBass={filterBass}
          setFilterBass={setFilterBass}
          filterPiano={filterPiano}
          setFilterPiano={setFilterPiano}
          filterGuitar={filterGuitar}
          setFilterGuitar={setFilterGuitar}
          onlyBookmarked={onlyBookmarked}
          setOnlyBookmarked={setOnlyBookmarked}
          onlyFlagKnown={onlyFlagKnown}
          setOnlyFlagKnown={setOnlyFlagKnown}
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          token={token}
          logout={logout}
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
        />
        <Book
          filterBass={filterBass}
          filterPiano={filterPiano}
          filterGuitar={filterGuitar}
          onlyFlagKnown={onlyFlagKnown}
          onlyBookmarked={onlyBookmarked}
          searchValue={searchValue}
          token={token}
        />
      </header>
      <Footer />
    </div>
  );
}

export default App;
