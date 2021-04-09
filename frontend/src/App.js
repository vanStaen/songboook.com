import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import AddForm from "./component/AddForm/AddForm";
import Login from "./component/Login/Login";
import Book from "./component/Book/Book";
import Menu from "./component/Menu/Menu";
import Footer from "./component/Footer/Footer";
import { Profil } from "./component/Profil/Profil";

import { authStore } from "./stores/authStore";
import { displayStore } from "./stores/displayStore";

import "./App.css";
import "./helpers/axiosInterceptor";

const App = observer(() => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const [randomPageId, setRandomPageId] = useState(null);

  useEffect(() => {
    authStore.refreshToken &&
      authStore.login(authStore.getNewToken(), authStore.refreshToken);
  }, []);

  useEffect(() => {
    if (!authStore.token) {
      if (displayStore.showPage === "profil") {
        displayStore.setShowPage("daily");
      }
    };
  }, [authStore.token]);

  return (
    <div className="App">
      <header className="App-header">
        <AddForm
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          setNewSongAdded={setNewSongAdded}
        />
        <Login
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
        />
        <Menu
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
          showLoginForm={showLoginForm}
          setShowLoginForm={setShowLoginForm}
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
          setRandomPageId={setRandomPageId}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        {displayStore.showPage === "profil" && <Profil />}
        {displayStore.showPage === "book" && 
          <Book
            searchValue={searchValue}
            newSongAdded={newSongAdded}
            setNewSongAdded={setNewSongAdded}
            randomPageId={randomPageId}
            setRandomPageId={setRandomPageId}
          />}
      </header>
      <Footer />
    </div>
  );
});

export default App;
