import { React, useEffect, useState } from "react";
import YouTube from 'react-youtube';
import { Drawer, Divider } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Tags from './Tags/Tags';
import Lyrics from './Lyrics/Lyrics';
import Links from './Links/Links';

const InfoDrawer = (props) => {
    const [widthDrawer, setWidthDrawer] = useState(350);
    const [isDrawerFold, setIsDrawerFold] = useState(true);

    const videoID = props.page.videourl ? props.page.videourl.split('=')[1] : '';
    const videoOptions = {
        height: widthDrawer - 124,
        width: widthDrawer - 50,
        playerVars: {
            autoplay: 0,
        },
    };

    // Use effect to fold drwaaer after close
    useEffect(() => {
        handlerFoldDrawer(isDrawerFold);
    }, [isDrawerFold]);

    const handlerFoldDrawer = (value) => {
        value ? setWidthDrawer(350) : setWidthDrawer(600);
        setIsDrawerFold(value);
    }

    const handlerCloseDrawer = () => {
        setIsDrawerFold(true);
        props.setDrawerVisible(false);
    };

    return (
        <Drawer
            title={
                <div>
                    {isDrawerFold ?
                        <MenuFoldOutlined onClick={() => handlerFoldDrawer(false)} />
                        :
                        <MenuUnfoldOutlined onClick={() => handlerFoldDrawer(true)} />
                    }
                    &nbsp;&nbsp;{props.page.song.toUpperCase()}
                </div>
            }
            placement="right"
            closable={true}
            onClose={handlerCloseDrawer}
            visible={props.drawerVisible}
            width={widthDrawer}
        >
            {props.page.videourl ?
                (<YouTube videoId={videoID} opts={videoOptions} />)
                : (<img src={props.page.picurl} className="Page-drawer__artwork" alt="pic_missing" ></img>)
            }

            <Divider orientation="left" plain>
                <span className="Page-drawer__diviser">
                    Tags
                </span>
            </Divider>
            <Tags
                tags={props.page.tags}
                id={props.page.id}
                setTagsMissing={props.setTagsMissing}
            />

            <Divider />
            <Links
                tabs={props.page.link}
                video={props.page.videourl}
                pic={props.page.picurl}
                id={props.page.id}
                setTabsMissing={props.setTabsMissing}
                setVideoMissing={props.setVideoMissing}
                setPicMissing={props.setPicMissing}
                isDrawerFold={isDrawerFold}
            />

            <Divider orientation="left" plain>
                <span className="Page-drawer__diviser">
                    Lyrics
                    </span>
            </Divider>
            <Lyrics artist={props.page.artist} song={props.page.song} />
        </Drawer>
    )

}

export default InfoDrawer;