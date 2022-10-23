import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {get, push, ref, set} from "firebase/database";
import logo from './images/logo.png';
// import {Simulate} from "react-dom/test-utils";
// import play = Simulate.play;

function QuestionEntry() {
    const lobbyId: any = useParams().lobbyId;
    const [submittedQuestion, setSubmittedQuestion] = useState(false);

    async function register(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        let qs = 0;
        let players = 0;
        push(ref(database, 'games/' + lobbyId + '/questions'), {question: name?.value}).then(() => {
            setSubmittedQuestion(true)
        });
        await get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach(() => {
                    qs++;
                })
            }
            console.log(qs);
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
        if (players === qs) {
            await set(ref(database, 'games/' + lobbyId + '/gameState'), 'answerEntry');
        }
    }

    return (
        <>
            {submittedQuestion ?
                <div className="loading"><p className="loading-p">Thanks for submitting your question! waiting for other
                    players...</p>
                    <img src={logo} alt="Quagga Logo" className="logo"></img>
                </div>
                :
                <div className="question-entry">
                    <h2>Write a question!</h2>
                    <input className="input-box" type="text" id="name"
                           placeholder="What do you want to know about the other players?"/><br/>
                    <button className="long-button" onClick={(register)}>Submit question</button>
                    <br/>
                </div>
            }
        </>
    );
}

export default QuestionEntry;
