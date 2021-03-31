import { EyeOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { ConditionalWrapper } from '../../../helpers/ConditionnalWrapper';
import "./SettingsButton.css";

export const SettingsButton = observer((props) => {

  return (
    <ConditionalWrapper
      condition={!props.showProfil}
      wrap={(children) => (
        <Tooltip placement="left" title="Custom view">
          {children}
        </Tooltip>
      )}
    >
      <div
        className={props.showSettings ? "SettingsButton__float SettingsButton__open" : "SettingsButton__float"}
        onClick={() => props.setShowSettings(!props.showSettings)}
      >
        <EyeOutlined className="SettingsButton__icon" />
      </div>

    </ConditionalWrapper>
  );
});
