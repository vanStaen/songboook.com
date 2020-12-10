import { React, useState } from "react";
import { Input } from 'antd';
import './Title.css';

const Title = (props) => {
    const [isEditMode, setIsEditmode] = useState(false);
    const [editInputValue, setEditInputValue] = useState(props.title);

    const handleEditChange = e => {
        setEditInputValue(e.target.value);
    };

    const handleEditCancel = () => {
        setIsEditmode(false);
        setEditInputValue(props.title);
        console.log('cancel');
    };

    const handleEditConfirm = () => {
        console.log(editInputValue);
    };

    const title = props.title.replace('-', '/').replace(/ /g, '');
    const howLongIsLong = 23;
    const isLongTitle = title.length > howLongIsLong;
    const titlePage = isLongTitle ? `${title.slice(0, howLongIsLong)}...` : title;

    return (
        <>
            {isEditMode ?
                (<Input
                    key={`title_input_${props.id}`}
                    size="small"
                    style={{ width: 250 }}
                    className="tag-input"
                    value={editInputValue}
                    onChange={handleEditChange}
                    onBlur={handleEditCancel}
                    onPressEnter={handleEditConfirm}
                />)
                :
                (<div className="Page__title" onDoubleClick={() => setIsEditmode(true)} >{titlePage}</div>)
            }
        </>

    )

}

export default Title;