import React from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get, DataSnapshot} from "firebase/database";

function Lobby() {
    const lobbyId: any = useLoaderData();
    const lobbyData: DataSnapshot = await get(ref(database, lobbyId));
    return (
        <div>{lobbyData.val()}</div>
    );
}

export default Lobby;
