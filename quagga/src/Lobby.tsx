import React, {Dispatch, SetStateAction, useEffect} from 'react';
import {useParams, RoutesProps} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, onValue} from "firebase/database";


function Lobby() {
    const lobbyId: any = useParams().lobbyId;
    let names: string[] = [];

    useEffect(() => {
        async function getNames () {
            get(ref(database, 'games/' + lobbyId + '/name')).then((snapshot) => {
                snapshot.forEach((snapshot) => {
                    console.log(snapshot.val())
                    names.push(snapshot.val())
                })

            })
        }
        getNames();
    })
    return (
        <div>
            <p>Names:</p><br/>
            <ul>
                {names}
            </ul>
        </div>
    );
}

export default Lobby;
