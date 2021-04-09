import { React, useState } from "react";
import { observer } from "mobx-react";

import { AddSongButton } from "./AddSongButton/AddSongButton";
import { ProfilButton } from "./ProfilButton/ProfilButton";
import { SearchButton } from "./SearchButton/SearchButton";
import { SettingsButton } from "./SettingsButton/SettingsButton";
import { LoginButton } from "./LoginButton/LoginButton";
import { Random } from "./Random/Random";
import { InfoButton } from "./InfoButton/InfoButton";
import { HelpButton } from "./HelpButton/HelpButton"
import { authStore } from "../../stores/authStore";
import { displayStore } from "../../stores/displayStore";

import "./Menu.css";
const Menu = observer((props) => {
  const [showSearch, setShowSearch] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div>
      <div className="Menu__top">
        {!authStore.token ? (
          <LoginButton
            showLoginForm={props.showLoginForm}
            setShowLoginForm={props.setShowLoginForm}
          />
        ) : (
          <ProfilButton
            showPage={displayStore.showPage}
            setShowPage={props.setShowPage}
          />
        )}
        {displayStore.showPage === "book" && (
          <>
            {authStore.token && (
              <AddSongButton
                setShowAddForm={props.setShowAddForm}
                showAddForm={props.showAddForm}
              />
            )}
            <SettingsButton
              showSettings={showSettings}
              setShowSettings={setShowSettings}
            />
            <SearchButton
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              searchValue={props.searchValue}
              setSearchValue={props.setSearchValue}
            />
            <Random
              setRandomPageId={props.setRandomPageId}
            />
          </>
        )}
      </div>

      <div className="Menu__bottom">
        <InfoButton/>
        <HelpButton/>
      </div>

    </div>
  );
});

export default Menu;
