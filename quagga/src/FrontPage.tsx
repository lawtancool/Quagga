import React from 'react';
import {database} from "./firebase";
import {push, ref} from "firebase/database";

function FrontPage() {
    const newLinkKey = push(ref(database, 'games'), '').key;

    return (
        <div>
            {newLinkKey}
        </div>
    );
}

export default FrontPage;
