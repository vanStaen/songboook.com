import { React } from 'react';
import { Tooltip } from 'antd';
import { QuestionOutlined, CheckOutlined } from '@ant-design/icons';

import bookmark from '../../component/Page/Bookmark/bookmark.png'

import './Menu.css';

const Menu = (props) => {

    // 0: all, 1: only unknown, 2: only known
    const classNameFlagKnown = () => {
        if (props.onlyFlagKnown === 0) { return "menu__check inactive white" }
        else if (props.onlyFlagKnown === 1) { return "menu__check active black" }
        else if (props.onlyFlagKnown === 2) { return "menu__check active green" }
    }

    const toolTipFlagKnow = () => {
        if (props.onlyFlagKnown === 0) { return null }
        else if (props.onlyFlagKnown === 1) { return "Show only unknown songs" }
        else if (props.onlyFlagKnown === 2) { return "Show only known songs" }
    }

    const iconFlagKnown = () => {
        if (props.onlyFlagKnown === 0) { return <CheckOutlined />; }
        else if (props.onlyFlagKnown === 1) { return <QuestionOutlined />; }
        else if (props.onlyFlagKnown === 2) { return <CheckOutlined />; }
    }

    const handlerFlagKnown = () => {
        if (props.onlyFlagKnown === 0) { props.setOnlyFlagKnown(1); }
        else if (props.onlyFlagKnown === 1) { props.setOnlyFlagKnown(2); }
        else if (props.onlyFlagKnown === 2) { props.setOnlyFlagKnown(0); }
    }


    return (
        <div className="menu__main">


            <div onClick={() => props.setFilterGuitar(!props.filterGuitar)}>
                <Tooltip placement="right" title={props.filterGuitar && "Guitar tabs hidden"}>
                    <div className="menu__dymotagguitar">
                        &nbsp;Guitar&nbsp;
                </div>
                </Tooltip>
                <div className="menu__dymobgguitar"></div>
                {props.filterGuitar ? (<div className="guitar__strike"></div>) : ""}
            </div>

            <div onClick={() => props.setFilterPiano(!props.filterPiano)}>
                <Tooltip placement="right" title={props.filterPiano && "Piano songs hidden"}>
                    <div className="menu__dymotagpiano">
                        &nbsp;&nbsp;&nbsp;Piano&nbsp;
                </div>
                </Tooltip >
                <div className="menu__dymobgpiano"></div>
                {props.filterPiano ? (<div className="piano__strike"></div>) : ""}
            </div>

            <div onClick={() => props.setFilterBass(!props.filterBass)} >
                <Tooltip placement="right" title={props.filterBass && "Bass tabs hidden"}>
                    <div className="menu__dymotagbass">
                        &nbsp;&nbsp;&nbsp;&nbsp;bass&nbsp;
                </div>
                </Tooltip >
                <div className="menu__dymobgbass"></div>
                {props.filterBass ? (<div className="bass__strike"></div>) : ""}
            </div>

            <Tooltip placement="right" title={props.onlyBookmarked && "Show only bookmarked"}>
                <div className={props.onlyBookmarked ? "menu__favorite active" : "menu__favorite inactive"}
                    onClick={() => props.setOnlyBookmarked(!props.onlyBookmarked)}>
                    <img
                        width="25"
                        height="30"
                        src={bookmark}
                        alt={bookmark}>
                    </img>
                </div>
            </Tooltip >

            <Tooltip placement="bottomLeft" title={toolTipFlagKnow()}>
                <div className={classNameFlagKnown()} onClick={handlerFlagKnown}>
                    {iconFlagKnown()}
                </div>
            </Tooltip>

        </div >
    )

}

export default Menu;