import { React, useState } from "react";
import { Input, notification } from 'antd';
import axios from 'axios';
import './Title.css';

const Title = (props) => {
    const [title, setTitle] = useState(props.title.replace(/ /g, '').length > 23 ? `${props.title.replace('-', '/').replace(/ /g, '').slice(0, 23)}...` : props.title.replace('-', '/').replace(/ /g, ''));
    const [isEditMode, setIsEditmode] = useState(false);
    const [editInputValue, setEditInputValue] = useState(props.title.replace('-', '/'));

    const patchTitleInDB = (title) => {
        async function patchEntry(title) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + 'songbook/' + props.id,
                method: 'PATCH',
                data: { 'title': title },
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + props.token,
                },
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        // fetch Entries
        patchEntry(title).then((resData) => {
            console.log("Sucess", resData);
        }
        ).catch(error => {
            notification.error({ description: `Unauthorized! Please login.`, });
            console.log("error", error.message);
        });
    }

    const handleEditChange = e => {
        setEditInputValue(e.target.value);
    };

    const handleEditCancel = () => {
        setIsEditmode(false);
        setEditInputValue(props.title.replace('-', '/'));
        console.log('cancel');
    };

    const handleEditConfirm = () => {
        patchTitleInDB(editInputValue.replace('/', '-'))
        setTitle(editInputValue.replace(/ /g, '').length > 23 ? `${editInputValue.replace('-', '/').replace(/ /g, '').slice(0, 23)}...` : editInputValue.replace('-', '/').replace(/ /g, ''))
        setIsEditmode(false);
    };

    return (
        <>
            {isEditMode ?
                (<Input
                    key={`title_input_${props.id}`}
                    size="small"
                    className="title__input"
                    value={editInputValue}
                    onChange={handleEditChange}
                    onBlur={handleEditCancel}
                    onPressEnter={handleEditConfirm}
                />)
                :
                (<div className="Page__title" onDoubleClick={() => setIsEditmode(true)} >{title}</div>)
            }
        </>

    )

}

export default Title;