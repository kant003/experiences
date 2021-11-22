
import { useState, useEffect } from 'react';
import { onSnapshot } from '@firebase/firestore';
import { getComentsByExperienceId, saveComment, removeComment } from "../services/commentsFirestore";
import notify from '../services/Utils';


export function useComments({idExp, authUser}) {
    const [loading, setLoading] = useState(false)
    const [comments, setComents] = useState([])


    const addComment = comment => saveComment(idExp, comment)

    const deleteComment = (idExp, idComment) => removeComment(idExp, idComment)

    useEffect(() => {
        setLoading(true)

        const unsubscribe = onSnapshot(getComentsByExperienceId(idExp),
            snapshot => {
                setComents(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)

            },
            error => console.log('error al cargar los datos', error),
            //complete => notify('Calificación','Calificación establecida correctamente')

            );
            notify('Calificación','Calificación establecida correctamente')

            
        return () => unsubscribe()
    }, [idExp])


    /*useEffect(() => {
        setLoading(true)
        const refCollection = getSearchExperiences(keyword, uid)
        const unsubscribe = onSnapshot(refCollection,
            snapshot => {
                setExperiences(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [keyword, uid])
*/

    return {
        loading, comments, addComment, deleteComment
    };
}