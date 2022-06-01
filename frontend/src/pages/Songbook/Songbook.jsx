import React, { useState } from "react";
import { observer } from "mobx-react";

import { AddForm } from "../../component/AddForm/AddForm";
import { Book } from "../../component/Book/Book";
import { Menu } from "../../component/Menu/Menu";
import { Login } from "../../component/Login/Login";
import { Profil } from "../Profil/Profil";

import { displayStore } from "../../stores/displayStore";

import "./Songbook.css";

export const Songbook = observer(() => {
  const [searchValue, setSearchValue] = useState(null);
  const [newSongAdded, setNewSongAdded] = useState(false);
  const [randomPageId, setRandomPageId] = useState(null);

  return (
    <>
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

      <div
        className={`Songbook__container ${
          displayStore.showPage !== "book" && "Songbook__blury"
        }`}
      >
        <Book
          searchValue={searchValue}
          newSongAdded={newSongAdded}
          setNewSongAdded={setNewSongAdded}
          randomPageId={randomPageId}
          setRandomPageId={setRandomPageId}
        />
      </div>
    </>
  );
});
