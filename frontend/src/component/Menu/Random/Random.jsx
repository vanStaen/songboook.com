import { useState } from "react";
import { Tooltip } from "antd";
import { SyncOutlined } from '@ant-design/icons';


import { getRandomized } from "./getRandomized";
import Dice from "../../../images/dice.svg";

import "./Random.css";

export const Random = (props) => {
  const [isLoading, setIsloading] = useState(false);

  const handleRandomPick = async () => {
    setIsloading(true);
    let option = undefined;
    if (props.onlyFlagKnown === 1) {
      option = false;
    }
    if (props.onlyFlagKnown === 2) {
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
    <Tooltip placement="left" title="Random song">
      <div className="Random__float" onClick={handleRandomPick}>
        {isLoading && <SyncOutlined spin className="Random__spin" style={{ color: "#6E0F1C" }} />}
        <img className={isLoading ? "Random__dice Random__diceLoading" : "Random__dice"} src={Dice} alt="logo" />
      </div>
    </Tooltip>
  );
};
