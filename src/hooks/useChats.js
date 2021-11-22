
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getChats, saveMsg } from "../services/chatsFirestore";
import notify from '../services/Utils';


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
                console.log(chats)
            },
            error => console.log('error al cargar los datos', error),
            //complete => notify('Calificación','Calificación establecida correctamente')
            );
            notify('Chat','correctamente')

            
        return () => unsubscribe()
    }, [idRoom])

    return {
        loading, chats, addMsg
    };
}