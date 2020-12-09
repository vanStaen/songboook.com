import { React } from 'react';
import piano from './piano.png'
import { Tooltip } from 'antd';

import './Piano.css';

const Piano = props => {

    const isPiano = props.isPiano;
    const front = props.front;

    const handlerMarkAsPIano = (value) => {
        console.log('click', value)
    }

    return (
        <div className="piano" id="piano">
            {front ?
                (isPiano &&
                    (<Tooltip placement="bottomRight" title="Play this on keys!">
                        <img
                            className="piano__img"
                            src={piano}
                            alt={piano}>
                        </img>
                    </Tooltip>)
                )
                :
                (isPiano ?
                    (<Tooltip placement="right" title="Not for piano?">
                        <img
                            onClick={() => handlerMarkAsPIano(false)}
                            className="piano__img clickable"
                            src={piano}
                            alt={piano}>
                        </img>
                    </Tooltip>)
                    :
                    (<Tooltip placement="right" title="This is for piano!">
                        <img
                            onClick={() => handlerMarkAsPIano(true)}
                            className="piano__img clickable grey"
                            src={piano}
                            alt={piano}>
                        </img>
                    </Tooltip>)
                )
            }
        </div >
    )
}

export default Piano


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