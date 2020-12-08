import { React } from "react";
import YouTube from 'react-youtube';
import { Drawer, Divider } from 'antd';
import Tags from './Tags/Tags'
import Lyrics from './Lyrics/Lyrics';
import Links from './Links/Links';

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