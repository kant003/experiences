import { useState, useEffect } from 'react';
import { getUser, getUserRef } from "../services/firestore";

export default function UserCardSimple({ uid, active }) {

    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser(getUserRef(uid)).then(user => setUser(user.data()))
    }, [uid])

    return (
       <div>{user && user.displayName} {user && user.email}</div>
    )
}