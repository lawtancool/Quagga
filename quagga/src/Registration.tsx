import React, {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get} from "firebase/database";

function register(){

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
            <input type="text" id="name" name="name"/><br/>
            <button type="button">Join Game</button><br/>
            {lobbyData ? lobbyData : "Link doesn't exist"}
        </div>
    );
}

export default Registration;
