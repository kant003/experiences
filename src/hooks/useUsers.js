
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getAllUsers } from "../services/usersFirestore";
import { notifyError } from '../services/Utils';

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
            error => notifyError('Error al cargar los usuarios: ' + error)
        );
        return () => unsubscribe()
    }, [])

    return {
        loading, users
    };
}