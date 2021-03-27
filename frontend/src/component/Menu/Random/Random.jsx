import Dice from "../../../images/dice.svg";
import { getRandomized } from "./getRandomized";
import { Tooltip } from "antd";

import "./Random.css";

export const Random = (props) => {
  const handleRandomPick = async () => {
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
  };

  return (
    <Tooltip placement="left" title="Random song">
      <div className="Random__float" onClick={handleRandomPick}>
        <img className="Random__dice" src={Dice} alt="logo" />
      </div>
    </Tooltip>
  );
};
