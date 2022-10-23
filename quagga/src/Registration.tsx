import React, {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get, push, set, child} from "firebase/database";


function Registration() {
    const lobbyId: any = useLoaderData();
    const [lobbyData, setLobbyData] = useState();

    useEffect(() => {
        async function getData() {
            const data = await get(ref(database, 'games/' + lobbyId));
            setLobbyData(data.val());
        }

        if (!lobbyData) {
            getData();
        }
    })



    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        const status = set(ref(database, 'games/' + lobbyId + '/name'), name?.value);
    }

    return (
        <div>
            <input type="text" id="name"/><br/>
            <button onClick={(register)}>Join Game</button><br/>
            {lobbyData ? lobbyData : "Link doesn't exist"}
        </div>
    );
}

export default Registration;
