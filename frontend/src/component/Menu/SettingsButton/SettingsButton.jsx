import { React, useEffect } from "react";
import { EyeOutlined, AppstoreOutlined, BarsOutlined, CheckOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import "./SettingsButton.css";

export const SettingsButton = observer((props) => {

  useEffect(() => {
    props.showSettings ?
      setTimeout(function () { document.getElementById("SettingsButton__actionContainer").style.display = "inline-block"; }, 200) :
      document.getElementById("SettingsButton__actionContainer").style.display = "none";
  }, [props.showSettings])

  return (
    <Tooltip placement="left" title="Adjust what you see">
      <div
        className={props.showSettings ? "SettingsButton__float SettingsButton__open" : "SettingsButton__float"}
      >
        <div className="SettingsButton__actionContainer" id="SettingsButton__actionContainer">
          <div className="SettingsButton__action">1</div>
          <div className="SettingsButton__action">2</div>
          <div className="SettingsButton__action">3</div> |
          <CheckOutlined className="SettingsButton__action" />
          <div className="SettingsButton__action">5</div> |
          <BarsOutlined className="SettingsButton__action" />
          <AppstoreOutlined className="SettingsButton__action" /> |
        </div>
        <EyeOutlined
          onClick={() => props.setShowSettings(!props.showSettings)}
          className="SettingsButton__icon" />
      </div>
    </Tooltip>
  );
});
