import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {useParams, RoutesProps} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, onValue, child, DataSnapshot} from "firebase/database";

// const temp: string[] = []




function Lobby() {
    const lobbyId: any = useParams().lobbyId;
    const [names, setNames] = useState("");
    const lobbyRef = ref(database, 'games/' + lobbyId);
    const namesRef = child(lobbyRef, 'name');
    let namesList: string[] = [];

    useEffect(() => {
        onValue(namesRef, (snapshot) => {
            handleNamesChange(snapshot);
            namesList = names.split(String.fromCharCode(257));
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
        console.log(names)
    })

    return (
        <div>
            <p>Names:</p><br/>
            <ul>
                {namesList.map((name, index) => {
                        return (
                            <li key={index}>{name}</li>
                        );
                    })
                }
            </ul>
        </div>
    );
}

export default Lobby;
