import { useState } from 'react';

import './App.css';
import Book from './component/Book/Book'
import Menu from './component/Menu/Menu'
import Footer from './component/Footer/Footer'

function App() {
  const [filterBass, setFilterBass] = useState(false);
  const [filterPiano, setFilterPiano] = useState(false);
  const [filterGuitar, setFilterGuitar] = useState(false);
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [onlyFlagKnown, setOnlyFlagKnown] = useState(0); // 0: all, 1: only unknown, 2: only known
  const [filters, setFilter] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
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
