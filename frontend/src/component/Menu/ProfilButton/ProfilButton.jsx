import React, { useEffect } from "react";
import { UserOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { ConditionalWrapper } from "../../../helpers/ConditionnalWrapper";
// import { getUser } from "../Profil/getUser";
import { userStore } from "../../../stores/userStore";
import { displayStore } from "../../../stores/displayStore";

import "./ProfilButton.css";

export const ProfilButton = observer(() => {
  useEffect(() => {
    //getUser();
  }, []);

  return (
    <ConditionalWrapper
      condition={displayStore.showPage === "book"}
      wrap={(children) => (
        <Tooltip placement="left" title="Profil">
          {children}
        </Tooltip>
      )}
    >
      {displayStore.showPage === "profil" ? (
        <div
          className="ProfilButton__float"
          onClick={() => displayStore.setShowPage("book")}
        >
          <CloseOutlined className="ProfilButton__close" />
        </div>
      ) : userStore.picUrl ? (
        <div
          className="ProfilButton__float"
          style={{
            backgroundImage: `url(${userStore.picUrl})`,
            backgroundSize: "cover",
          }}
          onClick={() => displayStore.setShowPage("profil")}
        ></div>
      ) : (
        <div
          className="ProfilButton__float ProfilButton__background"
          onClick={() => displayStore.setShowProfil("profil")}
        >
          <UserOutlined className="ProfilButton__icon" />
        </div>
      )}
    </ConditionalWrapper>
  );
});
