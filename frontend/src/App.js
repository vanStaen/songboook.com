import { useState } from 'react';
import axios from 'axios';

import './App.css';
import AddForm from './component/AddForm/AddForm'
import Book from './component/Book/Book'
import Menu from './component/Menu/Menu'
import Footer from './component/Footer/Footer'

const DEBUG = process.env.NODE_ENV === "development";

function App() {
  const [filterBass, setFilterBass] = useState(false);
  const [filterPiano, setFilterPiano] = useState(false);
  const [filterGuitar, setFilterGuitar] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyFlagKnown, setOnlyFlagKnown] = useState(0); // 0: all, 1: only unknown, 2: only known
  const [showAddForm, setShowAddForm] = useState(false);

  // Axios Interceptors
  axios.interceptors.request.use((config) => {
    if (DEBUG) { console.info("✉️ ", config); }
    // if refresh tokens exist, then run getToken
    return config;
  }, (error) => {
    if (DEBUG) { console.error("✉️ ", error); }
    return Promise.reject(error);
  });

  return (
    <div className="App">
      <header className="App-header">
        <AddForm
          showAddForm={showAddForm}
          setShowAddForm={setShowAddForm}
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
        />
        <Book
          filterBass={filterBass}
          filterPiano={filterPiano}
          filterGuitar={filterGuitar}
          onlyFlagKnown={onlyFlagKnown}
          onlyBookmarked={onlyBookmarked}
        />
      </header>
      <Footer />
    </div>
  );
}

export default App;
