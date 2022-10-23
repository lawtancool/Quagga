import React, {useEffect, useState} from 'react';
import {RoutesProps, useParams} from "react-router-dom";
import {database} from "./firebase";
import {get, push, ref, set} from "firebase/database";


function AnswerEntry(props: AnswerEntryProps) {
    const lobbyId: any = useParams().lobbyId;
    const [submittedAnswer, setSubmittedAnswer] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionId, setQuestionId] = useState("");

    useEffect(() => {
        async function getQuestion() {
            get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
                snapshot.forEach((snapshot) => {
                    if (questionId.length === 0 && !snapshot.child('state').exists()) {
                        setQuestion(snapshot.val().question);
                        if (snapshot.key) {
                            setQuestionId(snapshot.key);
                        }
                        console.log(snapshot.key);
                    }
                })
            })
        }

        getQuestion();
    })

    async function answer(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const answer = document.getElementById("answer") as HTMLInputElement | null;
        if (answer != null && answer.size > 0) {
            push(ref(database, 'games/' + lobbyId + '/answers/' + questionId), {
                answer: answer?.value,
                user: props.username
            }).then(() => {
                setSubmittedAnswer(true)
            });
        }

        // check if ready to advance
        let players = 0;
        let answers = 0;
        await get(ref(database, 'games/' + lobbyId + '/answers/' + questionId)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach(() => {
                    answers++;
                })
            }
            console.log(answers);
        })
        await get(ref(database, 'games/' + lobbyId + '/name')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach(() => {
                    players++;
                })
            }
            console.log(players);
        })
        if (players === answers) {
            await set(ref(database, 'games/' + lobbyId + '/questions/' + questionId + '/state'), 'answered');
            await set(ref(database, 'games/' + lobbyId + '/gameState'), 'voting');
        }
    }

    return (
        <>
            {submittedAnswer ? <p>Thanks for submitting your answer! waiting for other players...</p>
                :
                <div>
                    <h2>ANSWER THE QUESTION:</h2>
                    <p>{question}?</p>
                    <input className="input-box" type="text" id="answer"/><br/>
                    <button className="long-button" onClick={(answer)}>Submit answer</button>
                    <br/>
                </div>
            }
        </>
    );
}

interface AnswerEntryProps extends RoutesProps {
    username: string;
}

export default AnswerEntry;
