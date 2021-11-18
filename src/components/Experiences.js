import { useState, useEffect } from 'react';
import { getExperiencesCollection } from "../services/firestore";
import Experience from './Experience';
import { onSnapshot } from "firebase/firestore";

function Experiences() {

    const [experiencesList, setExperiencesList] = useState([])

    useEffect(() => {
        const unsubscribe = onSnapshot(getExperiencesCollection(),
            snapshot => setExperiencesList(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))),
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [])


    return (
        experiencesList.map((exp) =>
            <Experience key={exp.id} title={exp.title} text={exp.text} type={exp.type} tags={exp.tags} createdAt={exp.createdAt} id={exp.id} userRef={exp.userRef} />
        )
    );
}
export default Experiences;