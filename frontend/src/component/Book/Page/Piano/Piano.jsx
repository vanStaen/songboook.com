import React from 'react';
import piano from './../../../../images/piano.png';
import { Tooltip } from 'antd';

import './Piano.css';

const Piano = props => {

    const isPiano = props.isPiano;

    return (
        <div className="piano" id="piano">
            {
                isPiano &&
                (<Tooltip placement="bottomRight" title="Play this on keys!">
                    <img
                        className="piano__img"
                        src={piano}
                        alt={piano}>
                    </img>
                </Tooltip>)
            }
        </div >
    )
}

export default Piano