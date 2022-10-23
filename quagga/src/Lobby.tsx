import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useParams, RoutesProps } from "react-router-dom";
import { database } from "./firebase";
import { ref, push, get, onValue, child, DataSnapshot } from "firebase/database";

// const temp: string[] = []




function Lobby() {
    const lobbyId: any = useParams().lobbyId;
    const [names, setNames] = useState("");
    const lobbyRef = ref(database, 'games/' + lobbyId);
    const namesRef = child(lobbyRef, 'name');
    const namesList: string[] = ["hi", "yjds"];

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
            <h2>PLAYERS:</h2><br />
            <ul className="player-list">
                {names.split(String.fromCharCode(257)).map((name, index) => {
                    return (
                        <div>
                            <li key={index}>{name}</li>
                            <hr className="solid"></hr>
                        </div>
                    );
                })
                }
            </ul>
        </div>
    );
}

export default Lobby;
