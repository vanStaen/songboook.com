import { React } from 'react';
import { Tooltip } from 'antd';
import { HeartFilled, SelectOutlined } from '@ant-design/icons';

import './Menu.css';

const Menu = (props) => {

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
                    <HeartFilled style={{ fontSize: '24px', color: '#C70039' }} />
                </div>
            </Tooltip>

        </div >
    )

}

export default Menu;