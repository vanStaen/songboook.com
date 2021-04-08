import { PlusOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./AddSongButton.css";

export const AddSongButton = (props) => {
  return (
    <Tooltip placement="left" title="Add Song">
      <div
        className={"AddSongButton__float"}
        onClick={() => props.setShowAddForm(!props.showAddForm)}
      >
        <PlusOutlined className="AddSongButton__icon" />
      </div>
    </Tooltip>
  );
};
