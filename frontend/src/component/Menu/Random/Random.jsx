import { useState } from "react";
import { Tooltip } from "antd";

import { displayStore } from "../../../stores/displayStore";
import { getRandomized } from "./getRandomized";
import Dice from "../../../images/dice.svg";

import "./Random.css";

export const Random = (props) => {
  const [isLoading, setIsloading] = useState(false);

  const handleRandomPick = async () => {
    setIsloading(true);
    props.setSearchValue(null);
    let option = undefined;
    if (displayStore.onlyFlagKnown === 1) {
      option = false;
    }
    if (displayStore.onlyFlagKnown === 2) {
      option = true;
    }
    try {
      const randomPage = await getRandomized(option);
      props.setRandomPageId(randomPage.id);
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
