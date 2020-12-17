import { React } from 'react';
import { Tooltip } from 'antd';
import { QuestionOutlined, CheckOutlined } from '@ant-design/icons';

import bookmark from '../../component/Page/Bookmark/bookmark.png'

import './Menu.css';

const Menu = (props) => {

    // 0: all, 1: only unknown, 2: only known
    const classNameFlagKnown = () => {
        switch (props.onlyFlagKnown) {
            case 0:
                return "menu__check active";
            case 1:
                return "menu__check active";
            case 2:
                return "menu__check active";
        }
    }

    const toolTipFlagKnow = () => {
        switch (props.onlyFlagKnown) {
            case 0:
                return "Show only unknown songs";
            case 1:
                return "Show only known songs";
            case 2:
                return "Show everything";
        }
    }

    const handlerFlagKnown = (props) => {
        console.log('clicked', props.onlyFlagKnown)
        switch (props.onlyFlagKnown) {
            case 0:
                props.setOnlyFlagKnown(1);
                break;
            case 1:
                props.setOnlyFlagKnown(2);
                break;
            case 2:
                props.setOnlyFlagKnown(0);
                break;
        }
    }

    const iconFlagKnown = () => {
        switch (props.onlyFlagKnown) {
            case 0:
                return <CheckOutlined />;
            case 1:
                return <QuestionOutlined />;
            case 2:
                return <CheckOutlined />;
        }
    }

    return (
        <div className="menu__main">


            <div onClick={() => props.setFilterGuitar(!props.filterGuitar)}>
                <Tooltip placement="right" title={props.filterGuitar ? "Hide guitar tabs" : "Show guitar tabs"}>
                    <div className="menu__dymotagguitar">
                        &nbsp;Guitar&nbsp;
                </div>
                </Tooltip>
                <div className="menu__dymobgguitar"></div>
                {props.filterGuitar ? (<div className="guitar__strike"></div>) : ""}
            </div>

            <div onClick={() => props.setFilterPiano(!props.filterPiano)}>
                <Tooltip placement="right" title={props.filterPiano ? "Hide piano tabs" : "Show piano tabs"}>
                    <div className="menu__dymotagpiano">
                        &nbsp;&nbsp;&nbsp;Piano&nbsp;
                </div>
                </Tooltip >
                <div className="menu__dymobgpiano"></div>
                {props.filterPiano ? (<div className="piano__strike"></div>) : ""}
            </div>

            <div onClick={() => props.setFilterBass(!props.filterBass)} >
                <Tooltip placement="right" title={props.filterBass ? "Hide bass tabs" : "Show bass tabs"}>
                    <div className="menu__dymotagbass">
                        &nbsp;&nbsp;&nbsp;&nbsp;bass&nbsp;
                </div>
                </Tooltip >
                <div className="menu__dymobgbass"></div>
                {props.filterBass ? (<div className="bass__strike"></div>) : ""}
            </div>

            <Tooltip placement="right" title={"Show only bookmarked"}>
                <div className={props.onlyBookmarked ? "menu__favorite active" : "menu__favorite inactive"}
                    onClick={() => props.setOnlyBookmarked(!props.onlyBookmarked)}>
                    <img
                        width="25"
                        height="30"
                        src={bookmark}
                        alt={bookmark}>
                    </img>
                </div>
            </Tooltip>

            <Tooltip placement="bottomLeft" title={toolTipFlagKnow}>
                <div className={classNameFlagKnown} onClick={handlerFlagKnown}>
                    here
                    {iconFlagKnown}
                </div>
            </Tooltip>

        </div >
    )

}

export default Menu;