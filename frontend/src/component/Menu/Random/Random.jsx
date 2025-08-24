import React, { useState } from "react";
import { Tooltip } from "antd";

import { displayStore } from "../../../stores/displayStore";
import { getRandomPageId } from "./getRandomPageId";
import Dice from "../../../images/dice.svg";

import "./Random.css";

export const Random = (props) => {
  const [isLoading, setIsloading] = useState(false);

  const handleRandomPick = async () => {
    setIsloading(true);
    props.setSearchValue(null);
    displayStore.setBassOnly(false);
    displayStore.setPianoOnly(false);
    displayStore.setGuitarOnly(false);
    displayStore.setOnlyBookmarked(false);
    let option = undefined;
    if (displayStore.onlyFlagKnown === 1) {
      option = false;
    }
    if (displayStore.onlyFlagKnown === 2) {
      option = true;
    }
    try {
      const randomPageId = await getRandomPageId(option);
      props.setRandomPageId(randomPageId);
    } catch (error) {
      console.log(error);
    }
    setIsloading(false);
  };

  return (
    <div onClick={handleRandomPick}>
      <Tooltip placement="left" title="Random song">
        <img
          className={isLoading ? "Random__dice spining" : "Random__dice"}
          src={Dice}
          alt="logo"
        />
      </Tooltip>
    </div>
  );
};
