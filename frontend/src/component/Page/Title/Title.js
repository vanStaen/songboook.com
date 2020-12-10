import { React, useEffect, useState } from "react";

import './Title.css';

const Title = (props) => {

    const title = props.title.replace('-', '/').replace(/ /g, '');
    const howLongIsLong = 23;
    const isLongTitle = title.length > howLongIsLong;
    const titlePage = isLongTitle ? `${title.slice(0, howLongIsLong)}...` : title;

    return (
        <div className="Page__title">{titlePage}</div>
    )

}

export default Title;