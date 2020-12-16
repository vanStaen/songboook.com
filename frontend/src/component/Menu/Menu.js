import { React } from 'react';
import { Tooltip } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

import piano from '../Page/Piano/piano.png'
import bass from '../Page/Bass/bass.png'
import bookmark from '../Page/Bookmark/bookmark.png'

import './Menu.css';

const Menu = (props) => {

    return (
        <div className="menu__main">
            <div className="menu__items">
                <div
                    className={props.fitlerPiano ? "menu__item active" : "menu__item inactive"}
                    mouseLeaveDelay={1000}
                    onClick={() => {
                        props.setFitlerPiano(!props.fitlerPiano);
                        props.setFitlerBookmarked(false);
                        props.setFitlerBass(false);
                    }
                    }
                >
                    <Tooltip
                        placement="right"
                        title={props.fitlerBass ? "Reset this filter" : "Show only for piano"}
                    >
                        <div className="menu__item-cell">
                            <img
                                width="32px"
                                src={piano}
                                alt={piano}>
                            </img>
                        </div>
                    </Tooltip>
                </div>
                <div
                    className={props.fitlerBass ? "menu__item active" : "menu__item inactive"}
                    onClick={() => {
                        props.setFitlerBass(!props.fitlerBass);
                        props.setFitlerBookmarked(false);
                        props.setFitlerPiano(false);
                    }
                    }
                >
                    <Tooltip
                        placement="right"
                        title={props.fitlerBass ? "Reset this filter" : "Show only for bass"}
                    >
                        <div className="menu__item-cell">
                            <img
                                width="25px"
                                src={bass}
                                alt={bass}>
                            </img>
                        </div>
                    </Tooltip>
                </div>
                <div
                    className={props.fitlerBookmarked ? "menu__item active" : "menu__item inactive"}
                    onClick={() => {
                        props.setFitlerBookmarked(!props.fitlerBookmarked);
                        props.setFitlerBass(false);
                        props.setFitlerPiano(false);
                    }
                    }
                >
                    <Tooltip
                        placement="right"
                        title={props.fitlerBookmarked ? "Reset this filter" : "Show bookmarked"}
                    >
                        <div className="menu__item-cell">
                            <HeartOutlined style={{ paddingTop: '3px', fontSize: '24px', color: '#C70039' }} />
                        </div>
                    </Tooltip>
                </div>
                <div className="menu__item inactive hidden">
                    <div className="menu__item-cell">?</div>
                </div>
            </div>
        </div >
    )

}

export default Menu; 