
import { useState, useEffect } from 'react';
import { getAllExperiencesByUid } from "../services/experiencesFirestore";
import { onSnapshot } from '@firebase/firestore';
import { notifyError } from '../services/Utils';


export function useOwnExperiences({ uid }) {
    const [loading, setLoading] = useState(false)
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
        setLoading(true)
        const refCollection = getAllExperiencesByUid(uid)
        const unsubscribe = onSnapshot(refCollection,
            snapshot => {
                setExperiences(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => notifyError('Error al cargar las experiencias personales: ' + error)
        );
        return () => unsubscribe()
    }, [uid])


    return {
        loading, experiences
    };
}