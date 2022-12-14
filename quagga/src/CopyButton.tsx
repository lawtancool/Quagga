import React, {useState} from 'react';
import {RoutesProps} from "react-router-dom";


function CopyButton(props: ButtonProps) {
    const [link, setLink] = useState({link: `COPY LINK`});
    const copyTooltip = () => {
        navigator.clipboard.writeText(props.link);
        setLink({...link, link: `Copied!`});
    }

    return (
        <button className='short-button' onClick={copyTooltip}> {link.link} </button>
    )
}

interface ButtonProps extends RoutesProps {
    link: string
}

export default CopyButton;