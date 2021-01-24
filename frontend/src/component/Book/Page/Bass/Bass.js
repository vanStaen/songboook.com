import { React } from 'react';
import bass from './../../../../images/bass.png'
import { Tooltip } from 'antd';

import './Bass.css';

const Bass = props => {

    const isBass = props.isBass;

    return (
        <div className="bass" id="piano">
            {isBass &&
                (<Tooltip placement="bottomRight" title="Play this on bass!">
                    <img
                        className="bass__img"
                        src={bass}
                        alt={bass}>
                    </img>
                </Tooltip>)
            }
        </div >
    )
}

export default Bass