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
        {submittedAnswer ? <p>Thanks for submitting your answer! waiting for other players...</p>
                :
                <div>
                    <h2>ANSWER THE QUESTION:</h2>
                    <p>{question}?</p>
                    <input className="input-box" type="text" id="name"/><br/>
                    <button className="long-button" onClick={(answer)}>Submit answer</button><br/>
                </div>
        }
        </>
    );
}

export default AnswerEntry;
