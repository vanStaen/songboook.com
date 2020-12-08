import { React } from 'react';
import bookmark from './bookmark.png'
import { Tooltip } from 'antd';
import axios from 'axios';

import './Bookmark.css';

const Bookmark = props => {

    const patchBookmark = (value) => {
        async function patchEntry(value) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + '/' + props.id,
                method: 'PATCH',
                data: { 'bookmark': value }
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // fetch Entries
        patchEntry(value).then((resData) => {
            const patchResult = resData;
            console.log("Sucess", patchResult);
        }
        ).catch(error => {
            console.log("error", error.message);
        });
    }

    const handlerBookmarking = (value) => {
        props.setIsBookmarked(value);
        patchBookmark(value);
    }

    const bookmarked = props.isBookmarked;
    const front = props.front;

    return (
        <div className="bookmark" id="bookmark">
            {bookmarked ?
                (<Tooltip placement="right" title="Delete the bookmark.">
                    <img
                        onClick={() => handlerBookmarking(false)}
                        className="bookmark__img clickable"
                        src={bookmark}
                        alt={bookmark}>
                    </img>
                </Tooltip>)
                :
                (<Tooltip placement="right" title="Bookmark this.">
                    <img
                        onClick={() => handlerBookmarking(true)}
                        className="bookmark__img clickable grey"
                        src={bookmark}
                        alt={bookmark}>
                    </img>
                </Tooltip>)
            }
        </div >
    )
}

export default Bookmark