
import { useState, useEffect } from 'react';
import { getSearchExperiences } from "../services/experiencesFirestore";
import { onSnapshot } from '@firebase/firestore';


export function useExperiences({keyword, uid}) {
    const [loading, setLoading] = useState(false)
    const [experiences, setExperiences] = useState([])

    useEffect(() => {
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


    return {
        loading, experiences
    };
}