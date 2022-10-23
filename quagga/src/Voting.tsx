import React, {useEffect, useState} from 'react';
import {RoutesProps, useParams} from "react-router-dom";
import {database} from "./firebase";
import {get, ref, set} from "firebase/database";


function Voting(props: VotingProps) {
    const lobbyId: any = useParams().lobbyId;
    const [submittedVote, setSubmittedVote] = useState(false);
    const [question, setQuestion] = useState("");
    const [questionId, setQuestionId] = useState("");
    const [answer, setAnswer] = useState("");
    const [answerId, setAnswerId] = useState("");
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function getQuestion() {
            get(ref(database, 'games/' + lobbyId + '/questions')).then((snapshot) => {
                snapshot.forEach((snapshot) => {
                    if (questionId.length === 0 && snapshot.child('state').val() === 'answered') {
                        setQuestion(snapshot.val().question);
                        if (snapshot.key) {
                            setQuestionId(snapshot.key);
                        }
                        console.log(snapshot.val());
                    }
                })
            })
        }
        async function getAnswer() {
            let stop: boolean = false;
            get(ref(database, 'games/' + lobbyId + '/answers/' + questionId)).then((snapshot) => {
                snapshot.forEach((snapshot) => {
                    if (!stop && answerId.length === 0 && !snapshot.child('state').exists()) {
                        stop = true;
                        setAnswerId(snapshot.key as string);
                        setAnswer(snapshot.val().answer);

                        console.log(snapshot.val().answer);
                    }
                })
            })
        }
        async function getPlayers() {
            const players: any = [];
            if (players.length === 0) {
                // console.log(players.length);
                const playerList: any = [];
                get(ref(database, 'games/' + lobbyId + '/name')).then((snapshot) => {
                    if (snapshot.exists()) {
                        console.log(snapshot.val())
                        snapshot.forEach(() => {
                            playerList.push({name: snapshot.val(), userId: snapshot.key as string});
                        })
                    }
                    console.log(playerList);
                })
                setPlayers(playerList);
            }
        }

        getQuestion();
        getAnswer();
    })

    async function vote(event: any) {
        event.preventDefault();
        const answer = document.getElementById("answer") as HTMLInputElement | null;
        if (answer != null && answer.size > 0) {
            set(ref(database, 'games/' + lobbyId + '/answers/' + questionId + '/' + answerId + '/' + props.username), {
                vote: answer?.value,
            }).then(() => {
                setSubmittedVote(true)
            });
        }

        // check if ready to advance
        let players = 0;
        let votes = 0;
        await get(ref(database, 'games/' + lobbyId + '/answers/' + questionId + '/' + answerId)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val())
                snapshot.forEach(() => {
                    votes++;
                })
            }
            console.log(votes);
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
        if (players === votes) {
            await set(ref(database, 'games/' + lobbyId + '/answers/' + questionId + '/state'), 'voted');
            await set(ref(database, 'games/' + lobbyId + '/gameState'), 'displayVoteResults');
        }
    }

    return (
        <>
            {submittedVote ? <p>Thanks for submitting your answer! waiting for other players...</p>
                :
                <div>
                    <h2>VOTE! WHO IS IT?</h2>
                    <p>Q: {question}?</p>
                    <p>A: {answer}</p>
                    {/*<input className="input-box" type="text" id="answer"/><br/>*/}
                    {/*<button className="long-button" onClick={(vote)}>Submit answer</button>*/}
                    {/*<div onChange={vote}>*/}
                    {/*    <input type="radio" value="Male" name="gender" /> Male*/}
                    {/*    <input type="radio" value="Female" name="gender" /> Female*/}
                    {/*    <input type="radio" value="Other" name="gender" /> Other*/}
                    {/*</div>*/}
                    <br/>
                </div>
            }
        </>
    );
}

interface VotingProps extends RoutesProps {
    username: string;
}

export default Voting;
