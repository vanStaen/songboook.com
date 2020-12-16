import { useState } from 'react';

import './App.css';
import Book from './component/Book/Book'
import Menu from './component/Menu/Menu'
import Footer from './component/Footer/Footer'

function App() {
  const [fitlerBass, setFitlerBass] = useState(false);
  const [fitlerPiano, setFitlerPiano] = useState(false);
  const [fitlerBookmarked, setFitlerBookmarked] = useState(false);
  const [fitlers, setFilter] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <Menu
          fitlerBass={fitlerBass}
          setFitlerBass={setFitlerBass}
          fitlerPiano={fitlerPiano}
          setFitlerPiano={setFitlerPiano}
          fitlerBookmarked={fitlerBookmarked}
          setFitlerBookmarked={setFitlerBookmarked}
        />
        <Book
          fitlerBass={fitlerBass}
          fitlerPiano={fitlerPiano}
          fitlerBookmarked={fitlerBookmarked}
        />
      </header>
      <Footer />
    </div>
  );
}

export default App;
