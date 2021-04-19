import { React, useState, useEffect } from "react";
import { observer } from "mobx-react";

import { displayStore } from '../../../stores/displayStore'

import InfoDrawer from './InfoDrawer/InfoDrawer';
import Piano from './Piano/Piano';
import Bass from './Bass/Bass';
import CheckAdd from './CheckAdd/CheckAdd';
import Bookmark from './Bookmark/Bookmark';
import Title from './Title/Title';

import '../../.././fonts/Dymo.ttf';
import './Page.css'

const Page = observer((props) => {
    const [isBookmarked, setIsBookmarked] = useState(props.page.bookmark);
    const [isPiano, setIsPiano] = useState(props.page.piano);
    const [isBass, setIsBass] = useState(props.page.bass);
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
        props.setRandomPageId(null);
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

    const hasHalo = props.randomPageId !== null;
    const isHalo = props.randomPageId === props.page.id;
    const classNamePage = hasHalo ? (isHalo ? "Page__main Page__halo Page__main__white" : "Page__main Page__main__transparent") : "Page__main Page__main__white";
    const classNameList = hasHalo ? (isHalo ? "List__main Page__halo Page__main__white" : "List__main Page__main__transparent") : "List__main Page__main__white";

    return (
        <>
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
                setPageHasChanged={props.setPageHasChanged}
            />
            {!displayStore.displayedAsList ?
                <div className={classNamePage} key={props.page.id}>
                    {(missing || hasHalo) &&
                        (<div className="Page__notab" onClick={handlerOpenDrawer}>
                            <div className={hasHalo ? "Page__notab-text Page__notabnotselected-textcolor" : "Page__notab-text"}>{textForMissing()}</div>
                            { missing && (<div className="Page__notab Page__notab-background"></div>)}
                            { hasHalo && !isHalo && (<div className="Page__notab Page__notselected-background"></div>)}
                        </div>)}

                    <div className="Page__opendrawer" onClick={handlerOpenDrawer}>
                        <img src={props.page.picurl} alt="pic_missing" className="Page__artwork"></img>
                    </div>

                    <Bookmark
                        id={props.page.id}
                        setIsBookmarked={setIsBookmarked}
                        isBookmarked={isBookmarked}
                        setPageHasChanged={props.setPageHasChanged}
                    />

                    <div className="Page__icons">
                        <Piano isPiano={isPiano} />
                        <Bass isBass={isBass} />
                    </div>

                    <div className="Page__actionicon">
                        <CheckAdd
                            isVisitor={false}
                            checked={props.page.checked}
                            id={props.page.id}
                            setPageHasChanged={props.setPageHasChanged}
                        />
                    </div>

                    <Title
                        title={props.page.title}
                        id={props.page.id}
                    />
                </div>
                :
                (<div className={classNameList}
                    style={{ width: displayStore.sizeListview }}>
                    <div className="List__artworkContainer" onClick={handlerOpenDrawer}>
                        <img src={props.page.picurl} alt="pic_missing" className="List__artwork"></img>
                    </div>
                    <div className="List__left">
                        <div>{props.page.artist}</div>
                        <div>{props.page.song}</div>
                    </div>
                    <div className="List__right">
                    </div>
                </div>)}
        </>
    )
});

export default Page;