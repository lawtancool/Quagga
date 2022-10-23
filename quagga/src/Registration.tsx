import React, {Dispatch, SetStateAction} from 'react';
import {useParams, RoutesProps} from "react-router-dom";
import {database} from "./firebase";
import {ref, push} from "firebase/database";
import logo from './logo.png';

function Registration(props: RegistrationProps) {
    const lobbyId: any = useParams().lobbyId;

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        if (name != null && name.size > 0) {
            push(ref(database, 'games/' + lobbyId + '/name'), name?.value).then(() => {props.setUsername(name?.value)});
        }
    }

    return (
        <div>
            <img src={logo} className='logo'/>
            <div className='h1'>QUAGGA</div>
            <input className='input-box' placeholder='enter your name' type="text" id="name"/><br/>
            <button className='long-button' onClick={(register)}>JOIN ROOM</button><br/>
        </div>
    );
}

interface RegistrationProps extends RoutesProps {
    setUsername: Dispatch<SetStateAction<string>>;
}

export default Registration;
