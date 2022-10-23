import React from 'react';
import {database} from "./firebase";
import {push, ref} from "firebase/database";
import logo from './logo.png';

function FrontPage() {
    const newLinkKey = push(ref(database, 'games'), {gameState: "lobby"}).key;

    return (
        <div>
            <img src={logo} className='logo'/>
            <div className='h1'>QUAGGA</div>
            <div className='link'>
                <input value={`quagga.lawrencetan.ca/${newLinkKey}`}></input>
                <button> COPY LINK </button>
            </div>
            <button className='long-button'> NEXT </button>
        </div>
    );
}

export default FrontPage;
