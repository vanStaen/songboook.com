import { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { observer } from "mobx-react";
import { Input } from "antd";

import "./SearchButton.css";

export const SearchButton = observer((props) => {
  const [mouseHover, setMouseHover] = useState(false);

  const handleClick = () => {
    props.setShowSearch(!props.showSearch);
  };

  const showToolTip = () => {
    if (props.showSearch) {
      return false;
    } else if (mouseHover) {
      return true;
    }
    return false;
  };

  const onSearch = (e) => {
    props.setSearchValue(e.target.value);
  };

  return (
    <Tooltip placement="left" title="Search" visible={showToolTip()}>
      <div
        onMouseEnter={() => {
          setMouseHover(true);
        }}
        onMouseLeave={() => {
          setMouseHover(false);
        }}
        className={
          props.showSearch
            ? "SearchButton__float SearchButton__open"
            : "SearchButton__float"
        }
      >
        {!props.showSearch && props.searchValue && <div className="FilterButton__badge"></div>}
        {props.showSearch && (
          <div className="SearchButton__input">
            <Input
              placeholder="input search text"
              defaultValue={props.searchValue}
              onChange={onSearch}
              onPressEnter={onSearch}
              className="SearchButton__input"
            />
          </div>
        )}
        <SearchOutlined
          className={
            props.showSearch
              ? "SearchButton__icon SearchButton__iconOpen"
              : "SearchButton__icon"
          }
          onClick={handleClick}
        />
      </div>
    </Tooltip>
  );
});
