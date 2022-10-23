import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, set} from "firebase/database";


function QuestionEntry() {
    const lobbyId: any = useParams().lobbyId;
    const [submittedQuestion, setSubmittedQuestion] = useState(false);

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        let qs = -1;
        let players = -1;
        push(ref(database, 'games/' + lobbyId + '/questions'), name?.value).then(() => {setSubmittedQuestion(true)});
        get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
            if (snapshot.exists()){
                console.log(snapshot.val())
                console.log(snapshot.val().size)
            }
            qs = snapshot.val().length;
        })
        get(ref(database, 'games/' + lobbyId + '/name')).then((snapshot) => {
            if (snapshot.exists()){
                console.log(snapshot.val())
                console.log(snapshot.val().size)
            }
            players = snapshot.val().length;
        })
        if (players == qs && players != -1 && qs != -1){
            set(ref(database, 'games/' + lobbyId + '/gameState'), 'answerEntry');
        }
    }

    return (
        <>
        {submittedQuestion ? <h1>Thanks for submitting your question! waiting for other players...</h1>
                :
                <div>
                    <h1>Write a question!</h1>
                    <input type="text" id="name"/><br/>
                    <button onClick={(register)}>Submit question</button><br/>
                </div>
        }
        </>
    );
}

export default QuestionEntry;
