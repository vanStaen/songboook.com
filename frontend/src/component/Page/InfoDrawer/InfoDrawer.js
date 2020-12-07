import { React, useState, useEffect } from "react";
import YouTube from 'react-youtube';
import { Drawer, Divider } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import Lyrics from '../Lyrics/Lyrics';

const cElement = null;

const InfoDrawer = (props) => {

    const videoID = props.page.videourl ? props.page.videourl.split('=')[1] : '';
    const videoOptions = {
        height: '226',
        width: '300',
        playerVars: {
            autoplay: 0,
        },
    };

    return (
        <Drawer
            title={props.page.song}
            placement="right"
            closable={true}
            onClose={props.handlerCloseDrawer}
            visible={props.drawerVisible}
            className="Page__drawer"
            width="350"
        >
            {props.page.videourl ?
                (<YouTube videoId={videoID} opts={videoOptions} />)
                : (<img src={props.page.picurl} className="Page-drawer__artwork" alt="pic_missing" ></img>)
            }

            <Divider orientation="left" plain>
                <span className="Page-drawer__diviser">
                    Lyrics
                    </span>
            </Divider>
            <Lyrics artist={props.page.artist} song={props.page.song} />
            <Divider orientation="left" plain>
                <span className="Page-drawer__diviser">
                    Tags
                    </span>
            </Divider>
            <p>{props.page.tags}</p>
        </Drawer>
    )

}

export default InfoDrawer;