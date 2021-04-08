import Info from "./../../../images/info.svg";
import { Tooltip } from "antd";

import "./InfoButton.css";

export const InfoButton = (props) => {
  return (
    <Tooltip placement="left" title="Infos & Impressum">
      <div className={"InfoButton__float"}>
        <img className="InfoButton__icon" src={Info} alt="info" />
      </div>
    </Tooltip>
  );
};
