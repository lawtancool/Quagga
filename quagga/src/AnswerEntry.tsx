import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push, get, set} from "firebase/database";


function AnswerEntry() {
    const lobbyId: any = useParams().lobbyId;
    const [submittedAnswer, setSubmittedAnswer] = useState(false);
    const [question, setQuestion] = useState("");
    const lastQ: number = 0;

    useEffect(() => {
        async function getQuestion() {
            let count = 0;
            get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
                snapshot.forEach((snapshot) => {
                    if (count == lastQ){
                        setQuestion(snapshot.val());
                        console.log(snapshot.val());
                    }
                    count++;
                })
            })
        }
        getQuestion();
    })

    async function answer (event: React.MouseEvent<HTMLButtonElement>) {

    }

    return (
        <>
        {submittedAnswer ? <h1>Thanks for submitting your answer! waiting for other players...</h1>
                :
                <div>
                    <h1>Write your response!</h1>
                    <p>{question}</p>
                    <input type="text" id="name"/><br/>
                    <button onClick={(answer)}>Submit answer</button><br/>
                </div>
        }
        </>
    );
}

export default AnswerEntry;
