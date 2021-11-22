
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getChats, saveMsg } from "../services/chatsFirestore";
import { notifyError } from '../services/Utils';


export function useChats({idRoom}) {
    const [loading, setLoading] = useState(false)
    const [chats, setChats] = useState([])


    const addMsg = (uid, msg) => saveMsg(idRoom, uid, msg)


    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getChats(idRoom),
            snapshot => {
                setChats(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => notifyError('Error al cargar los chats: '+error),
            //complete => notify('Calificación','Calificación establecida correctamente')
            );

            
        return () => unsubscribe()
    }, [idRoom])

    return {
        loading, chats, addMsg
    };
}