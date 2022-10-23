import React, {useEffect, useState} from 'react';
import {useLoaderData} from "react-router-dom";
import {database} from "./firebase";
import {ref, get, child, onValue} from "firebase/database";
import Registration from "./Registration";

function Game() {
    const lobbyId: any = useLoaderData();
    const [lobbyExists, setLobbyExists] = useState(false);
    const [gameState, setGameState] = useState("");
    const [registrationCompleted, setRegistrationCompleted] = useState(false);

    const lobbyRef = ref(database, 'games/' + lobbyId);
    const gameStateRef = child(lobbyRef, 'gameState');


    useEffect(() => {
        async function getLobbyExists() {
            const snapshot = await get(lobbyRef);
            setLobbyExists(snapshot.exists());
        }

        onValue(gameStateRef, (snapshot) => {
            const state = snapshot.val();
            console.log(state);
            setGameState(state);
        })

        getLobbyExists();
    })

    if (!lobbyExists) {
        return <div>Link doesn't exist</div>
    }


    switch(gameState) {
        case 'lobby':
            return (
                <>
                    {registrationCompleted ? <div>completed</div> :<Registration setRegistrationComplete={setRegistrationCompleted}/>
                        }</>
            );
        case 'fun':
            return <div>nut</div>
        default:
            return <div>Loading</div>
    }


}

export default Game;
