import { useState } from "react";
import { LockOutlined, UnlockOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./LoginButton.css";

export const LoginButton = (props) => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return (
    <Tooltip placement="left" title="Login">
      <div
        className={"LoginButton__float"}
        onClick={() => props.setShowLoginForm(!props.showLoginForm)}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {isMouseOver ?
          <UnlockOutlined className="LoginButton__icon" /> :
          <LockOutlined className="LoginButton__icon" />}
      </div>
    </Tooltip>
  );
};
