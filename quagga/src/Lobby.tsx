import React, {Dispatch, SetStateAction, useEffect, useRef, useState} from 'react';
import {useParams, RoutesProps} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, onValue, child, DataSnapshot} from "firebase/database";

// const temp: string[] = []




function Lobby() {
    const lobbyId: any = useParams().lobbyId;
    const [names, setNames] = useState([""]);
    const lobbyRef = ref(database, 'games/' + lobbyId);
    const namesRef = child(lobbyRef, 'name');

    useEffect(() => {

        //
        // get(namesRef).then((snapshot) => {
        //     handleNamesChange(snapshot)
        // })
        onValue(namesRef, (snapshot) => {
            handleNamesChange(snapshot);
        })

        function handleNamesChange(snapshot: DataSnapshot) {
            const temp: string[] = [];
            snapshot.forEach((snapshot) => {
                console.log(snapshot.val())
                temp.push(snapshot.val());
            })
            setNames(temp);
        }

    })



    console.log(names);
    return (
        <div>
            <p>Names:</p><br/>
            <ul>
                <li>hi</li>
                {
                    names.map((name, index) => (
                        <li key={index}>{name}</li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Lobby;
