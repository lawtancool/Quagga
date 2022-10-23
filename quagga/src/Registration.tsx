import React from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push} from "firebase/database";


function Registration() {
    const lobbyId: any = useParams().lobbyId;

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        const status = push(ref(database, 'games/' + lobbyId + '/name'), name?.value);
    }

    return (
        <div>
            <input type="text" id="name"/><br/>
            <button onClick={(register)}>Join Game</button><br/>
        </div>
    );
}

export default Registration;
