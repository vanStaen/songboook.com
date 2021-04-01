import { React, useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { ConditionalWrapper } from '../../../helpers/ConditionnalWrapper';
import "./SettingsButton.css";

export const SettingsButton = observer((props) => {
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    showSettings ?
      setTimeout(function () { document.getElementById("SettingsButton__actionContainer").style.display = "inline-block"; }, 200) :
      document.getElementById("SettingsButton__actionContainer").style.display = "none";
  }, [showSettings])

  return (
    <ConditionalWrapper
      condition={!showSettings}
      wrap={(children) => (
        <Tooltip placement="left" title="Display">
          {children}
        </Tooltip>
      )}
    >
      <div
        className={showSettings ? "SettingsButton__float SettingsButton__open" : "SettingsButton__float"}
      >
        <div className="SettingsButton__actionContainer" id="SettingsButton__actionContainer">
          <div className="SettingsButton__action">1</div> <div className="SettingsButton__action">2</div> <div className="SettingsButton__action">3</div> | <div className="SettingsButton__action">4</div> <div className="SettingsButton__action">5</div> | <div className="SettingsButton__action">6</div> <div className="SettingsButton__action">7</div>
        </div>
        <EyeOutlined
          onClick={() => setShowSettings(!showSettings)}
          className="SettingsButton__icon" />
      </div>
    </ConditionalWrapper>
  );
});
