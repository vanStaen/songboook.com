import { useEffect, useState } from "react";
import { observer } from "mobx-react";

import AddForm from "./component/AddForm/AddForm";
import Login from "./component/Login/Login";
import Book from "./component/Book/Book";
import Menu from "./component/Menu/Menu";
import Footer from "./component/Footer/Footer";
import { authStore } from "./stores/authStore";

import "./App.css";
import "./helpers/axiosInterceptor";

const App = observer(() => {
  const [filterBass, setFilterBass] = useState(false);
  const [filterPiano, setFilterPiano] = useState(false);
  const [filterGuitar, setFilterGuitar] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyFlagKnown, setOnlyFlagKnown] = useState(0); // 0: all, 1: only unknown, 2: only known
  const [showAddForm, setShowAddForm] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const [randomPageId, setRandomPageId] = useState(null);

  useEffect(() => {
    // On mount, update token
    authStore.refreshToken &&
      authStore.login(authStore.getNewToken(), authStore.refreshToken);
  }, []);

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
          showSearchInput={showSearchInput}
          setShowSearchInput={setShowSearchInput}
          setRandomPageId={setRandomPageId}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />
        <Book
          filterBass={filterBass}
          filterPiano={filterPiano}
          filterGuitar={filterGuitar}
          onlyFlagKnown={onlyFlagKnown}
          onlyBookmarked={onlyBookmarked}
          searchValue={searchValue}
          newSongAdded={newSongAdded}
          setNewSongAdded={setNewSongAdded}
          randomPageId={randomPageId}
          setRandomPageId={setRandomPageId}
        />
      </header>
      <Footer />
    </div>
  );
});

export default App;
