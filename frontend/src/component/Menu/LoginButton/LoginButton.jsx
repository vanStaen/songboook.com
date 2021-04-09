import { useState } from "react";
import { LockOutlined, UnlockOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import { displayStore } from "../../../stores/displayStore";

import "./LoginButton.css";

export const LoginButton = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);
  return displayStore.showPage === "login" ? (
    <div
      className="ProfilButton__float"
      onClick={() => displayStore.setShowPage("book")}
    >
      <CloseOutlined className="ProfilButton__close" />
    </div>
  ) : (
    <Tooltip placement="left" title="Login">
      <div
        className={"LoginButton__float"}
        onClick={() => displayStore.setShowPage("login")}
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        {isMouseOver ? (
          <UnlockOutlined className="LoginButton__icon" />
        ) : (
          <LockOutlined className="LoginButton__icon" />
        )}
      </div>
    </Tooltip>
  );
};
