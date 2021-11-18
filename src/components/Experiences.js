import { useState, useEffect } from 'react';

import { getAllExperiences, getAllExperiencesByUid } from "../services/firestore";
import Experience from './Experience';
import { onSnapshot } from "firebase/firestore";

function Experiences({uid}) {

    const [experiencesList, setExperiencesList] = useState([])


    useEffect(() => {
        const refCollection = uid?getAllExperiencesByUid(uid):getAllExperiences()
        const unsubscribe = onSnapshot(refCollection,
            snapshot => setExperiencesList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [uid])


    return (
        experiencesList.map((exp) =>
            <Experience key={exp.id} title={exp.title} text={exp.text} type={exp.type} tags={exp.tags} createdAt={exp.createdAt} id={exp.id} userRef={exp.userRef} />
        )
    );
}
export default Experiences;