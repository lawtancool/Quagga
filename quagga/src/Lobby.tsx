import React, {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get} from "firebase/database";

function Lobby() {
    const lobbyId: any = useLoaderData();
    const [lobbyData, setLobbyData] = useState();

    useEffect(() => {
        async function getData() {
            console.log(lobbyId);
            const data = await get(ref(database, 'games/' + lobbyId));
            console.log(data.exists());
            setLobbyData(data.val());
        }

        if (!lobbyData) {
            getData();
        }
    })
    return (
        <div>{lobbyData}</div>
    );
}

export default Lobby;
