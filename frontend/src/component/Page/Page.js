import { React, useState } from "react";
import { Tooltip } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import InfoDrawer from './InfoDrawer/InfoDrawer';
import Piano from './Piano/Piano';
import Bass from './Bass/Bass';
import Favorite from './Favorite/Favorite';

import '../.././fonts/Dymo.ttf';
import './Page.css'

const Page = (props) => {
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [tabsMissing, setTabsMissing] = useState(props.page.link === "null" ? true : false);
    const [tagsMissing, setTagsMissing] = useState(props.page.tags === null ? true : false);
    const [videoMissing, setVideoMissing] = useState(props.page.videourl === "null" ? true : false);
    const [picMissing, setPicMissing] = useState(props.page.picurl === "null" ? true : false);
    const [missing, setMissing] = useState((tabsMissing || tagsMissing || videoMissing || picMissing) ? true : false);

    const handlerOpenDrawer = () => {
        setDrawerVisible(true);
    };
    const handlerCloseDrawer = () => {
        setDrawerVisible(false);
    };

    const title = props.page.title.replace('-', '/').replace(/ /g, '');
    const howLongIsLong = 23;
    const isLongTitle = title.length > howLongIsLong;
    const titlePage = isLongTitle ? `${title.slice(0, howLongIsLong)}...` : title;

    let missingText = [];
    if (missing) {
        if (tabsMissing === true) {
            missingText.push("TABS MISSING");
        }
        if (tagsMissing === true) {
            missingText.push("HASHTAGS MISSING");
        }
        if (videoMissing === true) {
            missingText.push("VIDEO MISSING");
        }
        if (picMissing === true) {
            missingText.push("PICTURE MISSING");
        }
    }

    const missingTextFormated = missingText.map(text => {
        return (<>{text} <br /></>)
    });

    return (
        <div className="Page__main">

            { missing &&
                (<div className="Page___notab_main">
                    <div className="Page__notab Page__notab-text">
                        {missingTextFormated}
                    </div>
                    <div className="Page__notab Page__notab-background">
                    </div>
                </div>)}

            <a href={props.page.link} target="_blank" rel="noopener noreferrer">
                <img src={props.page.picurl} alt="pic_missing" className="Page__artwork"></img>
            </a>
            <div className="Page__title">{titlePage}</div>

            <div className="Page__icons">
                <Piano front={true} isPiano={props.page.piano} />
                <Bass front={true} isBass={props.page.bass} />
                <Favorite front={true} favorite={props.page.favorite} />
            </div>

            <Tooltip title="Show more">
                <div className="Page__actionicon">
                    <MenuUnfoldOutlined onClick={handlerOpenDrawer} />
                </div>
            </Tooltip>

            <InfoDrawer
                page={props.page}
                handlerCloseDrawer={handlerCloseDrawer}
                drawerVisible={drawerVisible}
                setTabsMissing={setTabsMissing}
                setTagsMissing={setTagsMissing}
                setVideoMissing={setVideoMissing}
                setPicMissing={setPicMissing}
            />


        </div>
    );
}

export default Page;