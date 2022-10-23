import React from 'react';
import {useState} from 'react';
import {database} from "./firebase";
import {push, ref} from "firebase/database";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

function FrontPage() {
    const newLinkKey = push(ref(database, 'games'), {gameState: "lobby"}).key;
    const [link, setLink] = useState({link: `quagga.io/${newLinkKey}`});

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `${newLinkKey}`; 
        navigate(path);
    }
    
    const copyTooltip = () => {
        navigator.clipboard.writeText(`quagga.io/${newLinkKey}`)
        setLink({...link, link: `Copied!`});
    }

    return (
        <div>
            <img src={logo} className='logo'/>
            <div className='h1'>QUAGGA</div>
            <div>
                <input className='input-box' value={link.link}></input>
                <button className='link-button' onClick={copyTooltip}> COPY LINK </button>
            </div>
            <button className='long-button' onClick={routeChange}> NEXT </button>
        
        </div>
    );
}

export default FrontPage;
