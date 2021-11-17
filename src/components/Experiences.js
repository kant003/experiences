import { useState, useEffect } from 'react';
import { getExperiencesCollection } from "../services/firestore";
import Experience from './Experience';
import { onSnapshot } from "firebase/firestore";



function Experiences() {

    const [experiencesList, setExperiencesList] = useState([])

    useEffect(() => {
        //getExperiences().then(r => setExperiencesList(r))

        const unsubscribe = onSnapshot(getExperiencesCollection(),
            (snapshot) => {
                const experiences = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }) );
                setExperiencesList(experiences)
            },
            (error) => console.log('error al cargar los datos',error));

        return () => unsubscribe()
    }, [])

    const listItems = experiencesList.map((exp) =>
        <div key={exp.id}>
            <Experience title={exp.title} text={exp.text} type={exp.type} id={exp.id} />
            <hr />
        </div>
    );

    return (
        <>
            {listItems}
        </>
    );
}
export default Experiences;