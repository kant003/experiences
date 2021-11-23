import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getUserRef, removeExperience } from "../services/experiencesFirestore";
import Stars from './Stars';
import User from './User';
import { addCalification, getCalification } from "../services/calificationsFirestore";
import { onSnapshot } from '@firebase/firestore';
import { notify, notifyError } from '../services/Utils';

export default function Experience({ experience }) {
    const [user, setUser] = useState(null)
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const [star, setStar] = useState(null)

    useEffect(() => {

        const unsub = onSnapshot(getUserRef(experience.userRef.id), u => setUser(u.data()));

        getCalification(experience.id, authUser.uid).then(star => {
            setStar(star.data() && star.data().value)
        })

        return () => unsub();
    }, [experience, authUser.uid])

    const tagList = () => experience.tags.map(tag =>
        <span key={experience.id + tag} className="tag">#{tag}</span>
    )


    const handleSubmitStarChange = async ({ value }) => {
        try {
            await addCalification(experience.id, authUser.uid, value)
            setStar(value)
            notify('Calificación establecida correctamente')
        } catch (error) {
            notifyError('Error al añadir la calificación: ' + error)
        }
    }


    const isMyExperience = () => user && authUser.uid === user.uid


    return (

        <div className="card" key={experience.id}>
            <div className="card-content">
                {user && !isMyExperience() && <User user={user} mode={'simple'} />}
                <div className="media">

                    <div className="media-content">
                        <div className="title is-4">
                            <p className="title is-4">{experience.title}</p>
                        </div>
                        <p className="subtitle is-6">{experience.createdAt && experience.createdAt.toDate().toDateString()}</p>
                    </div>
                </div>

                <div className="content">
                    {experience.text}
                    <br />
                    <div className="tags">{tagList()}</div>

                    {experience.id && <Stars star={star} onSubmit={handleSubmitStarChange}> </Stars>}

                    <div className="buttons">
                        <Link className="button is-link is-light" to={'/experience/' + experience.id}>Ver</Link>
                        {isMyExperience() && <Link className="button is-link is-light" to={'/addExperience/' + experience.id}>Editar</Link>}
                        {isMyExperience() && <button className="button is-link is-light" onClick={e => removeExperience(experience.id)}>Eliminar</button>}
                    </div>

                </div>
            </div>
        </div>
    )
}