import { React } from 'react';
import { Tooltip } from 'antd';

import piano from '../Page/Piano/piano.png'
import bass from '../Page/Bass/bass.png'

import './Menu.css';

const Menu = (props) => {

    return (
        <div className="menu__main">
            <div className="menu__items">
                <div
                    className={props.fitlerPiano ? "menu__item active" : "menu__item inactive"}
                    onClick={() => {
                        props.setFitlerPiano(!props.fitlerPiano);
                        props.setFitlerBass(false);
                    }
                    }
                >
                    <Tooltip
                        placement="right"
                        title={props.fitlerBass ? "Reset this filter" : "Show only for piano"}
                        mouseEnterDelay={1}
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
                        props.setFitlerPiano(false);
                    }
                    }
                >
                    <Tooltip
                        placement="right"
                        title={props.fitlerBass ? "Reset this filter" : "Show only for bass"}
                        mouseEnterDelay={1}
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
                <div className="menu__item inactive hidden">
                    <div className="menu__item-cell">?</div>
                </div>
            </div>
        </div >
    )

}

export default Menu; 