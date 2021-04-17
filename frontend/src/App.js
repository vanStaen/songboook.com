import { useEffect, useState, useCallback } from "react";
import { observer } from "mobx-react";

import AddForm from "./component/AddForm/AddForm";
import Book from "./component/Book/Book";
import Menu from "./component/Menu/Menu";
import Footer from "./component/Footer/Footer";
import { Login } from "./component/Login/Login";
import { Profil } from "./component/Profil/Profil";

import { authStore } from "./stores/authStore";
import { displayStore } from "./stores/displayStore";

import "./App.css";
import "./helpers/axiosInterceptor";

const App = observer(() => {
  const [searchValue, setSearchValue] = useState(null);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const [randomPageId, setRandomPageId] = useState(null);

  const keyDownHandler = useCallback((event) => {
    event.preventDefault();
    const keyPressed = event.key.toLowerCase();
    if (keyPressed === "enter") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", keyDownHandler);
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [keyDownHandler]);

  useEffect(() => {
    authStore.refreshToken &&
      authStore.login(authStore.getNewToken(), authStore.refreshToken);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Menu
          setRandomPageId={setRandomPageId}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {displayStore.showPage === "addsong" && (
          <AddForm setNewSongAdded={setNewSongAdded} />
        )}
        {displayStore.showPage === "login" && <Login />}
        {displayStore.showPage === "profil" && <Profil />}
        {displayStore.showPage === "book" && (
          <Book
            searchValue={searchValue}
            newSongAdded={newSongAdded}
            setNewSongAdded={setNewSongAdded}
            randomPageId={randomPageId}
            setRandomPageId={setRandomPageId}
          />
        )}
      </header>
      <Footer />
    </div>
  );
});

export default App;
