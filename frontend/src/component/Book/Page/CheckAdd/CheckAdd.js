import { React, useState } from 'react';
import { CheckOutlined } from '@ant-design/icons';
import { Tooltip, notification } from 'antd';
import { observer } from "mobx-react";
import axios from 'axios';

import { authStore } from '../../../../stores/authStore';
import './CheckAdd.css';

const CheckAdd = observer((props) => {

    const [isChecked, setIsChecked] = useState(props.checked);
    //const isVisitor = props.isVisitor;

    const patchCheck = (value) => {
        async function patchEntry(value) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + '/songbook/' + props.id,
                method: 'PATCH',
                data: { 'checked': value },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + authStore.token,
                },
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // fetch Entries
        patchEntry(value)
            .catch(error => {
                authStore.logout();
                notification.error({ description: `Unauthorized! Please login.`, });
                console.log("error", error.message);
            });
    }

    const handlerMarkAsChecked = (value) => {
        patchCheck(value);
        setIsChecked(value);
        props.setPageHasChanged(true);
    }

    return (
        <div className="CheckAdd" id="checkAdd">
            {authStore.token && (isChecked ?
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
            )}
        </div >
    )
});

export default CheckAdd;