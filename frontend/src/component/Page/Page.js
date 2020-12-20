import { React, useState, useEffect } from "react";
import InfoDrawer from './InfoDrawer/InfoDrawer';
import Piano from './Piano/Piano';
import Bass from './Bass/Bass';
import CheckAdd from './CheckAdd/CheckAdd';
import Bookmark from './Bookmark/Bookmark';
import Title from './Title/Title';

import '../.././fonts/Dymo.ttf';
import './Page.css'

const Page = (props) => {
    const [isBookmarked, setIsBookmarked] = useState(props.page.bookmark)
    const [isPiano, setIsPiano] = useState(props.page.piano)
    const [isBass, setIsBass] = useState(props.page.bass)
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

            <div className="Page__opendrawer" onClick={handlerOpenDrawer}>
                <img src={props.page.picurl} alt="pic_missing" className="Page__artwork"></img>
            </div>

            <Bookmark
                id={props.page.id}
                setIsBookmarked={setIsBookmarked}
                isBookmarked={isBookmarked}
            />

            <div className="Page__icons">
                <Piano isPiano={isPiano} />
                <Bass isBass={isBass} />
            </div>

            <div className="Page__actionicon">
                <CheckAdd isVisitor={false} checked={props.page.checked} id={props.page.id} />
            </div>

            <Title
                title={props.page.title}
                id={props.page.id}
            />

            <InfoDrawer
                page={props.page}
                setDrawerVisible={setDrawerVisible}
                drawerVisible={drawerVisible}
                setTabsMissing={setTabsMissing}
                setTagsMissing={setTagsMissing}
                setVideoMissing={setVideoMissing}
                setPicMissing={setPicMissing}
                setIsPiano={setIsPiano}
                setIsBass={setIsBass}
            />

        </div>
    );
}

export default Page;