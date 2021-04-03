import { SearchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { Input } from 'antd';

import "./SearchButton.css";

export const SearchButton = observer((props) => {

  const onSearch = value => props.setSearchValue(value);

  const handleClick = () => {
    props.setShowSearch(!props.showSearch);
  }

  return (
    <Tooltip placement="left" title="Search">
      <div
        className={props.showSearch ? "SearchButton__float SearchButton__open" : "SearchButton__float"}
      >
        {props.showSearch &&
          <div className="SearchButton__input">
            <Input
              placeholder="input search text"
              onPressEnter={onSearch}
              className="SearchButton__input"
            />
          </div>
        }
        <SearchOutlined
          className={props.showSearch ? "SearchButton__icon SearchButton__iconOpen" : "SearchButton__icon"}
          onClick={handleClick} />
      </div>
    </Tooltip>
  );
});
