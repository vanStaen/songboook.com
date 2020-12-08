import { React } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Tooltip, notification } from 'antd';
import axios from 'axios';

import './CheckAdd.css';

const CheckAdd = props => {

    const isCheck = props.check;
    const isVisitor = props.isVisitor;

    const handlerMarkAsChecked = (value) => {
        console.log('click', value)
    }

    return (
        <div className="CheckAdd" id="checkAdd">
            {isCheck ?
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
                        className="CheckAdd__ico clickable grey"
                    />
                </Tooltip>)
            }
        </div >
    )
}

export default CheckAdd


/*

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