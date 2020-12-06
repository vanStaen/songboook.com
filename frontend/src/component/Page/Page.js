import { React, useState } from "react";
import { Tooltip, Drawer, Divider } from 'antd';
import { MenuUnfoldOutlined, } from '@ant-design/icons';
import Lyrics from './Lyrics/Lyrics';

import '../.././fonts/Dymo.ttf';
import './Page.css'

const Page = (props) => {
    const [visible, setVisible] = useState(false);

    const showDrawer = () => {
        setVisible(true);
    };
    const onClose = () => {
        setVisible(false);
    };

    const title = props.page.title.replace('-', '/').replace(/ /g, '');
    const howLongIsLong = 24;
    const isLongTitle = title.length > howLongIsLong;
    const titlePage = isLongTitle ? `${title.slice(0, howLongIsLong)}...` : title;
    const artist = props.page.artist;
    const song = props.page.song.toUpperCase();

    let video = '';
    if (props.page.videourl) {
        video = props.page.videourl.includes("youtube") ? `https://www.youtube.com/embed/${props.page.videourl.split('=')[1]}` : props.page.videourl;
    }



    return (
        <div className="Page__main">
            <a href={props.page.link} target="_blank">
                <img src={props.page.picurl} className="Page__artwork"></img>
            </a>
            <div className="Page__title">{titlePage}</div>
            <Tooltip title="Show text">
                <div className="Page__actionicon">
                    <MenuUnfoldOutlined onClick={showDrawer} />
                </div>
            </Tooltip>
            <Drawer
                title={song}
                placement="right"
                closable={true}
                onClose={onClose}
                visible={visible}
                className="Page__drawer"
                width="350"
            >
                {props.page.videourl ?
                    (<iframe width="300px" height="226px" src={video}></iframe>)
                    : (<img src={props.page.picurl} className="Page-drawer__artwork"></img>)
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
        </div>
    );
}

export default Page;