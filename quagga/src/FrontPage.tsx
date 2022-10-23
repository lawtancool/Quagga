import React from 'react';
import {database} from "./firebase";
import {push, ref} from "firebase/database";
import { useNavigate } from "react-router-dom";
import logo from './logo.png';

function FrontPage() {
    const newLinkKey = push(ref(database, 'games'), {gameState: "lobby"}).key;

    let navigate = useNavigate(); 
    const routeChange = () =>{ 
        let path = `${newLinkKey}`; 
        navigate(path);
    }

    return (
        <div>
            <img src={logo} className='logo'/>
            <div className='h1'>QUAGGA</div>
            <div>
                <input className='input-box' value={`quagga.lawrencetan.ca/${newLinkKey}`}></input>
                <button className='link-button'> COPY LINK </button>
            </div>
            <button className='long-button' onClick={routeChange}> NEXT </button>
        
        </div>
    );
}

export default FrontPage;
