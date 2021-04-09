import { PlusOutlined, CloseOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { displayStore } from "../../../stores/displayStore";

import "./AddSongButton.css";

export const AddSongButton = () => {
  return displayStore.showPage === "addsong" ? (
    <div
      className="ProfilButton__float"
      onClick={() => displayStore.setShowPage("book")}
    >
      <CloseOutlined className="ProfilButton__close" />
    </div>
  ) : (
    <Tooltip placement="left" title="Add Song">
      <div
        className={"AddSongButton__float"}
        onClick={() => displayStore.setShowPage("addsong")}
      >
        <PlusOutlined className="AddSongButton__icon" />
      </div>
    </Tooltip>
  );
};
