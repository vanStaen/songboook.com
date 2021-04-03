import { React, useState } from 'react';
import { Tag, Input, notification } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import axios from 'axios';

import { authStore } from '../../../../../stores/authStore';
import './Tags.css'

const Tags = (props) => {
    const [tags, setTags] = useState(props.tags);
    const [editInputIndex, setEditInputIndex] = useState(-1);
    const [editInputValue, setEditInputValue] = useState('');
    const [inputVisible, setInputVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const patchTagsInDB = (tags) => {
        async function patchEntry(tags) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + '/songbook/' + props.id,
                method: 'PATCH',
                data: { 'tags': tags },
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
        patchEntry(tags).then((resData) => {
            //console.log("Sucess", resData);
        }
        ).catch(error => {
            authStore.logout();
            notification.error({ description: `Unauthorized! Please login.`, });
            console.log("error", error.message);
        });
    }


    const handlerDeleteTag = (deleteTagIndex) => {
        let oldTags = tags;
        oldTags.splice(deleteTagIndex, 1);
        setTags(oldTags);
    }

    const handleEditInputConfirm = e => {
        tags[editInputIndex] = editInputValue.toLowerCase();
        setTags(tags);
        patchTagsInDB(tags);
        setEditInputIndex(-1)
        setEditInputValue('');
        setInputValue('');
        setInputVisible(false);
        props.setTagsMissing(false);
    };

    const handleEditInputCancel = e => {
        setEditInputIndex(-1)
        setEditInputValue('');
        setInputValue('');
        setInputVisible(false);
    };

    const handleEditInputChange = e => {
        setEditInputValue(e.target.value);
        setInputValue('');
        setInputVisible(false);
    };

    const handleInputChange = e => {
        setInputValue(e.target.value);
    };

    const handleInputConfirm = e => {
        const inputValue = e.target.value.toLowerCase();
        if (tags === undefined || tags === null) {
            const newtags = [inputValue];
            patchTagsInDB(newtags);
            setTags(newtags);
        }
        else if (inputValue && tags.indexOf(inputValue) === -1) {
            const newtags = [...tags, inputValue];
            patchTagsInDB(newtags);
            setTags(newtags);
        }
        setInputValue('');
        setInputVisible(false);
        setEditInputIndex(-1)
        setEditInputValue('');
        props.setTagsMissing(false);
        props.setPageHasChanged("true");
    };

    const handleInputCancel = () => {
        setInputValue('');
        setInputVisible(false);
        setEditInputIndex(-1)
        setEditInputValue('');
    };

    const showInput = () => {
        setInputVisible(true);
        setEditInputIndex(-1)
        setEditInputValue('');
    };


    const formattedTags = tags ? tags.map((tag, index) => {
        const isLongTag = tag.length > 30;
        if (editInputIndex === index) {
            return (
                <Input
                    key={index}
                    size="small"
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditInputChange}
                    onBlur={handleEditInputCancel}
                    onPressEnter={handleEditInputConfirm}
                />
            );
        }

        return (
            <Tag
                className="edit-tag"
                key={index}
                closable={authStore.token ? true : false}
                onClose={() => handlerDeleteTag(index)}
            >
                <span
                    onDoubleClick={e => {
                        setEditInputIndex(index);
                        setEditInputValue(tag);
                        e.preventDefault();
                    }}
                >
                    {isLongTag ? `${tag.slice(0, 30)}...` : tag}
                </span>
            </Tag>
        );
    }) : [];

    return (
        <div className='tags'>
            {formattedTags}
            {inputVisible && (
                <Input
                    type="text"
                    size="small"
                    className="tag-input"
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleInputCancel}
                    onPressEnter={handleInputConfirm}
                />
            )}
            {!inputVisible && authStore.token && (
                <Tag className="site-tag-plus" onClick={showInput}>
                    <PlusOutlined /> Add Tag
                </Tag>
            )}
        </div>
    )
}

export default Tags

