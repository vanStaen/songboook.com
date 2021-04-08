import { QuestionOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

import "./HelpButton.css";

export const HelpButton = (props) => {
  return (
    <Tooltip placement="left" title="Help">
      <div className={"HelpButton__float"}>
        <QuestionOutlined className="HelpButton__icon" />
      </div>
    </Tooltip>
  );
};
