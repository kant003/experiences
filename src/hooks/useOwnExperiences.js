
import { useState, useEffect } from 'react';
import { getAllExperiencesByUid } from "../services/experiencesFirestore";
import { onSnapshot } from '@firebase/firestore';


export function useOwnExperiences({uid}) {
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
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [uid])


    return {
        loading, experiences
    };
}