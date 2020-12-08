import { React, useState, useEffect } from "react";
import { Tooltip } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import InfoDrawer from './InfoDrawer/InfoDrawer';
import Piano from './Piano/Piano';
import Bass from './Bass/Bass';
import CheckAdd from './CheckAdd/CheckAdd';
import Bookmark from './Bookmark/Bookmark';

import '../.././fonts/Dymo.ttf';
import './Page.css'

const Page = (props) => {
    const [isBookmarked, setIsBookmarked] = useState(props.page.Bookmark)
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [tabsMissing, setTabsMissing] = useState(props.page.link === "null" ? true : false);
    const [tagsMissing, setTagsMissing] = useState(props.page.tags === null ? true : false);
    const [videoMissing, setVideoMissing] = useState(props.page.videourl === "null" ? true : false);
    const [picMissing, setPicMissing] = useState(props.page.picurl === "null" ? true : false);
    const [missing, setMissing] = useState((tabsMissing || tagsMissing || videoMissing || picMissing) ? true : false);

    useEffect(() => {
        setMissing((tabsMissing || tagsMissing || videoMissing || picMissing) ? true : false);
    }, [tabsMissing, tagsMissing, videoMissing, picMissing])

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

    const textForMissing = () => {
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
            const missingTextFormated = missingText.map((text, index) => {
                return (<div key={index} >{text} <br /></div>)
            });
            return missingTextFormated;
        }
    }

    return (
        <div className="Page__main" key={props.page.id}>

            { missing &&
                (<div className="Page__notab" onClick={handlerOpenDrawer}>
                    <div className="Page__notab-text">
                        {textForMissing()}
                    </div>
                    <div className="Page__notab Page__notab-background">
                    </div>
                </div>)}

            <div className="Page__opendrawer" handlerOpenDrawer onClick={handlerOpenDrawer}>
                <img src={props.page.picurl} alt="pic_missing" className="Page__artwork"></img>
            </div>

            <Bookmark
                id={props.page.id}
                setIsBookmarked={setIsBookmarked}
                isBookmarked={isBookmarked}
            />

            <div className="Page__title">{titlePage}</div>

            <div className="Page__icons">
                <Piano front={true} isPiano={props.page.piano} />
                <Bass front={true} isBass={props.page.bass} />
            </div>

            <div className="Page__actionicon">
                <CheckAdd isVisitor={false} checked={props.page.checked} id={props.page.id} />
            </div>

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