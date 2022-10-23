import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, set} from "firebase/database";


function AnswerEntry() {
    const lobbyId: any = useParams().lobbyId;
    const [submittedAnswer, setSubmittedAnswer] = useState(false);

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        let qs = -1;
        let players = -1;
        push(ref(database, 'games/' + lobbyId + '/questions'), name?.value).then(() => {setSubmittedAnswer(true)});
        get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
            if (snapshot.exists()){
                console.log(snapshot.val().length)
            }
            qs = snapshot.val().length;
        })
        get(ref(database, 'games/' + lobbyId + '/name')).then((snapshot) => {
            if (snapshot.exists()){
                console.log(snapshot.val().length)
            }
            players = snapshot.val().length;
        })
        if (players == qs){
            set(ref(database, 'games/' + lobbyId + '/gameState'), 'answerEntry');
        }
    }

    return (
        <>
        {submittedAnswer ? <h1>Thanks for submitting your answer! waiting for other players...</h1>
                :
                <div>
                    <h1>Write your response!</h1>
                    <input type="text" id="name"/><br/>
                    <button onClick={(register)}>Submit answer</button><br/>
                </div>
        }
        </>
    );
}

export default AnswerEntry;
