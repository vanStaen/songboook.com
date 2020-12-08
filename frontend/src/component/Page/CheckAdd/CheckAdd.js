import { React } from 'react';
import favorite from './favorite.png'
import { Tooltip, notification } from 'antd';
import axios from 'axios';

import './CheckAdd.css';

const CheckAdd = props => {

    const isFavorite = props.favorite;
    const front = props.front;

    const handlerMarkAsPIano = (value) => {
        console.log('click', value)
    }

    return (
        <div className="favorite" id="favorite">
            {front ?
                (isFavorite &&
                    (<img
                        className="favorite__img"
                        src={favorite}
                        alt={favorite}>
                    </img>)
                )
                :
                (isFavorite ?
                    (<Tooltip placement="right" title="Mehhhhh ...">
                        <img
                            onClick={() => handlerMarkAsPIano(false)}
                            className="piano__img clickable"
                            src={favorite}
                            alt={favorite}>
                        </img>
                    </Tooltip>)
                    :
                    (<Tooltip placement="right" title="I absolutely LOVE this!">
                        <img
                            onClick={() => handlerMarkAsPIano(true)}
                            className="favorite__img clickable grey"
                            src={favorite}
                            alt={favorite}>
                        </img>
                    </Tooltip>)
                )
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