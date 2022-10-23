import React, {Dispatch, SetStateAction} from 'react';
import {RoutesProps, useParams} from "react-router-dom";
import {database} from "./firebase";
import {push, ref} from "firebase/database";
import logo from './images/logo.png';

function Registration(props: RegistrationProps) {
    const lobbyId: any = useParams().lobbyId;

    async function register(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        if (name != null && name.size > 0) {
            push(ref(database, 'games/' + lobbyId + '/name'), name?.value).then((snapshot) => {
                props.setUsername(snapshot.key as string)
            });
        }
    }

    return (
        <div>
            <img src={logo} alt={"Quagga Logo"} className='logo'/>
            <h1>QUAGGA</h1>
            <input className='input-box' placeholder='enter your name' type="text" id="name"/><br/>
            <button className='long-button' onClick={(register)}>JOIN ROOM</button>
            <br/>
        </div>
    );
}

interface RegistrationProps extends RoutesProps {
    setUsername: Dispatch<SetStateAction<string>>;
}

export default Registration;
