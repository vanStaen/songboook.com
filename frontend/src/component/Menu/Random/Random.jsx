import Dice from "../../../images/dice.svg";
import { Tooltip } from "antd";

import "./Random.css";

export const Random = (props) => {
  return (
    <Tooltip placement="bottom" title="Random pick">
      <div className="Random__float" onClick={() => props.setShowProfil(true)}>
        <img className="Random__dice" src={Dice} alt="logo" />
      </div>
    </Tooltip>
  );
};
