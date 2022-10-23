import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push} from "firebase/database";
import logo from './images/logo.png';

function QuestionEntry() {
    const lobbyId: any = useParams().lobbyId;
    const [submittedQuestion, setSubmittedQuestion] = useState(false);

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        push(ref(database, 'games/' + lobbyId + '/questions'), name?.value).then(() => {setSubmittedQuestion(true)});
    }

    return (
        <>
        {submittedQuestion ? <div className="loading"><p className="loading-p">Thanks for submitting your question! waiting for other players...</p>
        <img src={logo} className="logo"></img>
        </div>
                :
                <div className="question-entry">
                    <h2>Write a question!</h2>
                    <input className="input-box" type="text" id="name" placeholder="What do you want to know about the other players?"/><br/>
                    <button className="long-button" onClick={(register)}>Submit question</button><br/>
                </div>
        }
        </>
    );
}

export default QuestionEntry;
