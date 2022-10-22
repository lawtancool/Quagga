import React from 'react';
import {useLoaderData} from "react-router-dom";

function Lobby() {
    const lobbyId: any = useLoaderData();
    return (
        <div>{lobbyId}</div>
    );
}

export default Lobby;
