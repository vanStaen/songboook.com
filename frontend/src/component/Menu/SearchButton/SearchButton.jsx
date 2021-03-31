import { SearchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";

import { ConditionalWrapper } from '../../../helpers/ConditionnalWrapper';
import "./SearchButton.css";

export const SearchButton = observer((props) => {

  return (
    <ConditionalWrapper
      condition={!props.showProfil}
      wrap={(children) => (
        <Tooltip placement="left" title="Search">
          {children}
        </Tooltip>
      )}
    >
      <div
        className={props.showSearch ? "SearchButton__float SearchButton__open" : "SearchButton__float"}
        onClick={() => props.setShowSearch(true)}
      >
        <SearchOutlined className="SearchButton__icon" />
      </div>

    </ConditionalWrapper>
  );
});
