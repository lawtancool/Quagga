import React, {Dispatch, SetStateAction} from 'react';
import {useParams, RoutesProps} from "react-router-dom";
import {database} from "./firebase";
import {ref, push} from "firebase/database";


function Registration(props: RegistrationProps) {
    const lobbyId: any = useParams().lobbyId;

    async function register (event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        const name = document.getElementById("name") as HTMLInputElement | null;
        push(ref(database, 'games/' + lobbyId + '/name'), name?.value).then(() => {props.setRegistrationComplete(true)});
    }

    return (
        <div>
            <input type="text" id="name"/><br/>
            <button onClick={(register)}>Join Game</button><br/>
        </div>
    );
}

interface RegistrationProps extends RoutesProps {
    setRegistrationComplete: Dispatch<SetStateAction<boolean>>;
}

export default Registration;
