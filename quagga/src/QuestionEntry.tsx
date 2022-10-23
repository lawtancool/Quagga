import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import {database} from "./firebase";
import {ref, push} from "firebase/database";


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
