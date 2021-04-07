import { QuestionOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./InfoButton.css";

export const InfoButton = (props) => {
  return (
    <Tooltip placement="left" title="Infos & Impressum">
      <div className={"InfoButton__float"}>
        <QuestionOutlined className="InfoButton__icon" />
      </div>
    </Tooltip>
  );
};
