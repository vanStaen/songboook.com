import { LockOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./LoginButton.css";

export const LoginButton = (props) => {
  return (
    <Tooltip placement="left" title="Login">
      <div
        className={"LoginButton__float"}
        onClick={() => props.setShowLoginForm(!props.showLoginForm)}
      >
        <LockOutlined className="LoginButton__icon" />
      </div>
    </Tooltip>
  );
};
