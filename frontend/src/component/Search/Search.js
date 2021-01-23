import { React } from 'react';
import { Input } from 'antd';

import './Search.css';

const { Search } = Input;

const SearchField = (props) => {

    const onSearch = value => console.log(value);
    const display = props.showSearchInput ? "block" : "none";

    return (
        <div className="search__container">
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                className="search__bar"
                style={{ display: display }}
            />
        </div>
    );
}

export default SearchField;
