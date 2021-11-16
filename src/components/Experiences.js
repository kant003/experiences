import { useState, useEffect } from 'react';
import { getExperiences, removeExperience } from "../services/experiences";
import Experience from './Experience';


function Experiences() {

    const [experiencesList, setExperiencesList] = useState([])

    useEffect(() => {
        getExperiences().then(r => setExperiencesList(r))
    }, [])

    const listItems = experiencesList.map((exp) =>
        <>
            <div key={exp.id}>
                <Experience name={exp.name} value={exp.value} id={exp.id} />
                <button onClick={(e) => removeExperience(exp.id)}>Eliminar</button>
            </div>
            <hr />
        </>
    );

    return (
        <>
            {listItems}
        </>
    );
}
export default Experiences;