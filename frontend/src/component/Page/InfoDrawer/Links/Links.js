import { React, useState } from 'react';
import { Tag, Input } from 'antd';
import axios from 'axios';
import { PlusOutlined, LinkOutlined } from '@ant-design/icons';

import './Links.css'

const Links = props => {

    const [tabs, setTabs] = useState(props.tabs);
    const [video, setVideo] = useState(props.video);
    const [pic, setPic] = useState(props.pic);

    /*
    const [editInputValue, setEditInputValue] = useState('');

    const patchTagsInDB = (tags) => {
        async function patchEntry(tags) {
            const response = await axios({
                url: process.env.REACT_APP_API_URL + '/' + props.id,
                method: 'PATCH',
                data: { 'tags': tags }
            });
            if ((response.status !== 200) & (response.status !== 201)) {
                throw new Error("Error!");
            }
            const patchResult = await response.data;
            return patchResult;
        }
        patchEntry(tags).then((resData) => {
        }
        ).catch(error => {
            console.log("error", error.message);
        });
    }


    const handlerDeleteTag = (deleteTagIndex) => {
        let oldTags = tags;
        oldTags.splice(deleteTagIndex, 1);
        if (oldTags.length === 0) {
            props.setTagsMissing(true);
            patchTagsInDB("null");
        } else {
            patchTagsInDB(oldTags);
        }
        setTags(oldTags);
    }

    const handleEditInputConfirm = e => {
        tags[editInputIndex] = editInputValue.toLowerCase();
        setTags(tags);
        patchTagsInDB(tags);
        setEditInputIndex(-1)
        setEditInputValue('');
        props.setTagsMissing(false);
    };

    const handleEditInputCancel = e => {
        setEditInputIndex(-1)
        setEditInputValue('');
    };

    const handleEditInputChange = e => {
        setEditInputValue(e.target.value);
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
        setEditInputIndex(-1)
        setEditInputValue('');
    };

    const handleInputCancel = () => {
        setEditInputIndex(-1)
        setEditInputValue('');
    };

    */



    /*
    const formattedTabs = () => {
    const isLongTag = tag.length > 20;

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
    }*/


    return (
        <div className='links'>
            <div>
                &nbsp;&nbsp;Tabs:
                <Tag className="links__tag" key="tabs" >
                    <span
                        onDoubleClick={e => {
                            //setEditInputIndex(index);
                            //setEditInputValue(tag);
                            e.preventDefault();
                        }}
                    >
                        <LinkOutlined />&nbsp;
                    {tabs.length > 35 ? `${tabs.slice(0, 30)}...` : tabs}
                    </span>
                </Tag>
            </div>
            <div>
                Video:
                 <Tag className="links__tag" key="video" >
                    <span
                        onDoubleClick={e => {
                            //setEditInputIndex(index);
                            //setEditInputValue(tag);
                            e.preventDefault();
                        }}
                    >
                        <LinkOutlined />&nbsp;
                    {video.length > 35 ? `${video.slice(0, 30)}...` : video}
                    </span>
                </Tag>
            </div>
            <div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Pic:
                 <Tag className="links__tag" key="pic" >
                    <span
                        onDoubleClick={e => {
                            //setEditInputIndex(index);
                            //setEditInputValue(tag);
                            e.preventDefault();
                        }}
                    >
                        <LinkOutlined />&nbsp;
                    {pic.length > 35 ? `${pic.slice(0, 30)}...` : pic}
                    </span>
                </Tag>
            </div>
        </div>
    )
}

export default Links

