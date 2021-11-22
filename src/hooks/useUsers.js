
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getAllUsers } from "../services/usersFirestore";

export function useUsers() {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getAllUsers(),
            snapshot => {
                setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [])

    return {
        loading, users
    };
}