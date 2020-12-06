import React from "react";

import './Page.css'

const Page = (props) => {

    let title = props.page.title.replace('-', '/').replace(/ /g, '');
    const howLongIsLong = 25;
    const isLongTitle = title.length > howLongIsLong;
    title = isLongTitle ? `${title.slice(0, howLongIsLong)}...` : title;


    return (
        <div className="Page__main">
            <a href={props.page.link} target="_blank">
                <img src={props.page.picurl} className="Page__artwork"></img>
            </a>
            <div className="Page__title">{title}</div>
        </div>
    );
}

export default Page;