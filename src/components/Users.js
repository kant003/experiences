import { useState, useEffect } from 'react';
import { getAllUsers } from "../services/firestore";
import User from './User';
import { onSnapshot } from "firebase/firestore";

function Users() {
    const [usersList, setUsersList] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(getAllUsers(),
            snapshot => setUsersList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [])

    return (
        usersList.map(
            (user) => <User key={user.uid} displayName={user.displayName} email={user.email} photoURL={user.photoURL} uid={user.uid} emailVerified={user.emailVerified} isAnonymous={user.isAnonymous} />
        )
    );
}
export default Users;