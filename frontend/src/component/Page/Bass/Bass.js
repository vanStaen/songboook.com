import { React } from 'react';
import bass from './bass.png'
import { Tooltip, notification } from 'antd';
import axios from 'axios';

import './Bass.css';

const Bass = props => {

    const isBass = props.isBass;
    const front = props.front;

    const handlerMarkBass = (value) => {
        console.log('click', value)
    }

    return (
        <div className="bass" id="piano">
            {front ?
                (isBass &&
                    (<Tooltip placement="bottomRight" title="Play this on bass!">
                        <img
                            className="bass__img"
                            src={bass}
                            alt={bass}>
                        </img>
                    </Tooltip>)
                )
                :
                (isBass ?
                    (<Tooltip placement="right" title="Not for bass?">
                        <img
                            onClick={() => handlerMarkBass(false)}
                            className="bass__img clickable"
                            src={bass}
                            alt={bass}>
                        </img>
                    </Tooltip>)
                    :
                    (<Tooltip placement="right" title="This is for bass!">
                        <img
                            onClick={() => handlerMarkBass(true)}
                            className="bass__img clickable grey"
                            src={bass}
                            alt={bass}>
                        </img>
                    </Tooltip>)
                )
            }
        </div >
    )
}

export default Bass


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