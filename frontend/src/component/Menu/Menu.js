import { React } from 'react';
import { Tooltip } from 'antd';
import { QuestionOutlined, CheckOutlined } from '@ant-design/icons';

import piano from './../../component/Page/Piano/piano.png'
import bass from './../../component/Page/Bass/bass.png'
import guitar from './../../images/guitar.png'
import bookmark from '../../component/Page/Bookmark/bookmark.png'

import './Menu.css';

const Menu = (props) => {

    // 0: all, 1: only unknown, 2: only known
    const classNameFlagKnown = () => {
        if (props.onlyFlagKnown === 0) { return "menu__check inactive white" }
        else if (props.onlyFlagKnown === 1) { return "menu__check active neonwhite" }
        else if (props.onlyFlagKnown === 2) { return "menu__check active green" }
    }

    const toolTipFlagKnow = () => {
        if (props.onlyFlagKnown === 0) { return null }
        else if (props.onlyFlagKnown === 1) { return "Showing unknown only" }
        else if (props.onlyFlagKnown === 2) { return "Showing known only" }
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

            <div className="menu__element" onClick={() => props.setFilterGuitar(!props.filterGuitar)}>
                <Tooltip placement="right" title={props.filterGuitar && "Guitar tabs hidden"}>
                    <div className="menu__dymotagguitar">
                        &nbsp;Guitar&nbsp;
                    </div>
                </Tooltip>
                <Tooltip placement="topLeft" title={props.filterGuitar && "Guitar tabs hidden"}>
                    <div className={!props.filterGuitar ? "menu__iconguitar" : "menu__iconguitar inactive"}>
                        <img
                            width="27"
                            height="27"
                            src={guitar}
                            alt={guitar}>
                        </img>
                    </div>
                </Tooltip>
                <div className="menu__dymobgguitar"></div>
                {props.filterGuitar ? (<div className="guitar__strike"></div>) : ""}
            </div>

            <div className="menu__element" onClick={() => props.setFilterPiano(!props.filterPiano)}>
                <Tooltip placement="right" title={props.filterPiano && "Piano songs hidden"}>
                    <div className="menu__dymotagpiano">
                        &nbsp;&nbsp;&nbsp;Piano&nbsp;
                    </div>
                    <div className="menu__dymobgpiano"></div>
                    {props.filterPiano ? (<div className="piano__strike"></div>) : ""}
                </Tooltip >
                <Tooltip placement="top" title={props.filterPiano && "Piano songs hidden"}>
                    <div className={!props.filterPiano ? "menu__iconpiano" : "menu__iconpiano inactive"}>
                        <img
                            width="37"
                            height="37"
                            src={piano}
                            alt={piano}>
                        </img>
                    </div>
                </Tooltip >
            </div>

            <div className="menu__element" onClick={() => props.setFilterBass(!props.filterBass)} >
                <Tooltip placement="right" title={props.filterBass && "Bass tabs hidden"}>
                    <div className="menu__dymotagbass">
                        &nbsp;&nbsp;&nbsp;&nbsp;bass&nbsp;
                    </div>
                    <div className="menu__dymobgbass"></div>
                    {props.filterBass ? (<div className="bass__strike"></div>) : ""}
                </Tooltip >
                <Tooltip placement="top" title={props.filterBass && "Bass tabs hidden"}>
                    <div className={!props.filterBass ? "menu__iconbass" : "menu__iconbass inactive"}>
                        <img
                            width="27"
                            height="27"
                            src={bass}
                            alt={bass}>
                        </img>
                    </div>
                </Tooltip >
            </div>

            <div className="menu__element">
                <div className="menu__sidebookmark">
                    <Tooltip placement="right" title={props.onlyBookmarked && "Showing bookmarked only"}>
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
                </div>
                <div className="menu__bottombookmark">
                    <Tooltip placement="top" title={props.onlyBookmarked && "Showing bookmarked only"}>
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
                </div>
            </div>

            <div className="menu__element">
                <div className="menu__sidecheck">
                    <Tooltip placement="bottomLeft" title={toolTipFlagKnow()}>
                        <div className={classNameFlagKnown()} onClick={handlerFlagKnown}>
                            {iconFlagKnown()}
                        </div>
                    </Tooltip>
                </div>
                <div className="menu__bottomcheck">
                    <Tooltip placement="topRight" title={toolTipFlagKnow()}>
                        <div className={classNameFlagKnown()} onClick={handlerFlagKnown}>
                            {iconFlagKnown()}
                        </div>
                    </Tooltip>
                </div>
            </div>

        </div >
    )

}

export default Menu;