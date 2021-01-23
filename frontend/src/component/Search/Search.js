import { React } from 'react';
import { Input } from 'antd';

import './Search.css';

const { Search } = Input;

const SearchField = () => {

    const onSearch = value => console.log(value);

    return (
        <div className="search__container">
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                className="search__bar"
            />
        </div>
    );
}

export default SearchField;
