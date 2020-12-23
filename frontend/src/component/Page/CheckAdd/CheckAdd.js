import { React, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';
import axios from 'axios';

import './CheckAdd.css';

const CheckAdd = props => {

    const [isChecked, setIsChecked] = useState(props.checked);
    const isVisitor = props.isVisitor;

    const patchCheck = (value) => {
        async function patchEntry(value) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + 'songbook/' + props.id,
                method: 'PATCH',
                data: { 'checked': value }
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // fetch Entries
        patchEntry(value).then((resData) => {
            // const patchResult = resData;
        }
        ).catch(error => {
            console.log("error", error.message);
        });
    }

    const handlerMarkAsChecked = (value) => {
        patchCheck(value);
        setIsChecked(value);
    }

    return (
        <div className="CheckAdd" id="checkAdd">
            {isChecked ?
                (<Tooltip placement="top" title="Click to mark this song as unknown.">
                    <CheckOutlined
                        onClick={() => handlerMarkAsChecked(false)}
                        className="CheckAdd__ico clickable"
                    />
                </Tooltip>)
                :
                (<Tooltip placement="top" title="Click to mark this song as known.">
                    <CheckOutlined
                        onClick={() => handlerMarkAsChecked(true)}
                        className="CheckAdd__ico clickable grey_check"
                    />
                </Tooltip>)
            }
        </div >
    )
}

export default CheckAdd


/*



    const handlerBookmarking = (value) => {
        props.setIsBookmarked(value);
        patchBookmark(value);

        const messageTitle = value ? 'Bookmarked!' : 'Bookmarked deleted';
        const messageText = value ? 'will appears with a bookmark from now on.' : 'is not bookmarked anymore';

        notification.success({
            message: messageTitle,
            description:
                `Watchlist entry #${props.id} ${messageText}.`,
            placement: "bottomRight",
        });

    }

*/