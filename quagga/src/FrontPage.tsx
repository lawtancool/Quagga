import React from 'react';
import {database} from "./firebase";
import {push, ref} from "firebase/database";
import { useNavigate } from "react-router-dom";
import logo from './images/logo.png';
import CopyButton from './CopyButton';

function FrontPage() {
    const newLinkKey = push(ref(database, 'games'), {gameState: "lobby"}).key;

    let navigate = useNavigate(); 
    const routeChange = () => { 
        let path = `${newLinkKey}`; 
        navigate(path);
    }

    return (
        <div>
            <img src={logo} className='logo'/>
            <h1>QUAGGA</h1>
            <div className="link-input">
                <input className='input-box' value={`quagga.lawrencetan.ca/${newLinkKey}`}></input>
                <CopyButton link={`quagga.lawrencetan.ca/${newLinkKey}`} />
            </div>
            <button className='long-button' onClick={routeChange}> NEXT </button>
        
        </div>
    );
}

export default FrontPage;
