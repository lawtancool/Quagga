import React, {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get} from "firebase/database";

const register = (event: React.MouseEvent<HTMLButtonElement>) => {
    const name = document.getElementById("name") as HTMLInputElement | null;
    console.log(name?.value)
}
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
    return (
        <div>
            <input type="text" id="name"/><br/>
            <button onClick={(register)}>Join Game</button><br/>
            {lobbyData ? lobbyData : "Link doesn't exist"}
        </div>
    );
}

export default Registration;
