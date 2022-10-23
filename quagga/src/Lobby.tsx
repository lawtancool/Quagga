import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {child, DataSnapshot, onValue, ref, set} from "firebase/database";

// const temp: string[] = []


function Lobby() {
    const lobbyId: any = useParams().lobbyId;
    const [names, setNames] = useState("");
    const lobbyRef = ref(database, 'games/' + lobbyId);
    const namesRef = child(lobbyRef, 'name');
    const namesList: string[] = [];

    async function start() {
        await set(ref(database, 'games/' + lobbyId + '/gameState'), 'questionEntry');
    }

    useEffect(() => {
        onValue(namesRef, (snapshot) => {
            handleNamesChange(snapshot);
            for (let i = 0; i < names.split(String.fromCharCode(257)).length - 1; i++) {
                namesList.push(names.split(String.fromCharCode(257))[i]);
            }
            console.log(namesList)
        })

        function handleNamesChange(snapshot: DataSnapshot) {
            let temp: string = "";
            snapshot.forEach((snapshot) => {
                console.log(snapshot.val());
                temp += snapshot.val() + String.fromCharCode(257);
            })
            setNames(temp);
        }
    })

    return (
        <div className="lobby">
            <h2>PLAYERS:</h2><br/>
            <ul className="player-list">
                {names.split(String.fromCharCode(257)).map((name, index) => {
                    return (
                        <li key={index}>{name}</li>
                    );
                })
                }
            </ul>
            <button className="long-button" onClick={(start)}>START GAME</button>
            <br/>
        </div>
    );
}

export default Lobby;
