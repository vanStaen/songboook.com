import { React, useState } from "react";
import { observer } from "mobx-react";

import { AddSongButton } from "./AddSongButton/AddSongButton";
import { ProfilButton } from "./ProfilButton/ProfilButton";
import { SearchButton } from "./SearchButton/SearchButton";
import { SettingsButton } from "./SettingsButton/SettingsButton";
import { LoginButton } from "./LoginButton/LoginButton";
import { Random } from "./Random/Random";
import { InfoButton } from "./InfoButton/InfoButton"
import { authStore } from "../../stores/authStore";

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
            showProfil={props.showProfil}
            setShowProfil={props.setShowProfil}
          />
        )}
        {!props.showProfil && (
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
              onlyFlagKnown={props.onlyFlagKnown}
              setOnlyFlagKnown={props.setOnlyFlagKnown}
              filterPiano={props.filterPiano}
              filterBass={props.filterBass}
              filterGuitar={props.filterGuitar}
              setFilterPiano={props.setFilterPiano}
              setFilterBass={props.setFilterBass}
              setFilterGuitar={props.setFilterGuitar}
              onlyBookmarked={props.onlyBookmarked}
              setOnlyBookmarked={props.setOnlyBookmarked}
            />
            <SearchButton
              showSearch={showSearch}
              setShowSearch={setShowSearch}
              searchValue={props.searchValue}
              setSearchValue={props.setSearchValue}
            />
            <Random
              onlyFlagKnown={props.onlyFlagKnown}
              setRandomPageId={props.setRandomPageId}
            />
          </>
        )}
      </div>

      <div className="Menu__bottom">
        <InfoButton/>
      </div>

    </div>
  );
});

export default Menu;
