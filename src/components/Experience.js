import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { getUserRef, removeExperience } from "../services/experiencesFirestore";
import Stars from './Stars';
import User from './User';
import { addCalification, getCalification, getCalificationsByIdExperience } from "../services/calificationsFirestore";
import { onSnapshot } from '@firebase/firestore';
import { notify, notifyError } from '../services/Utils';
import { useNavigate } from "react-router";
import { faComments, faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Experience({ experience }) {
    const [user, setUser] = useState(null)
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const [star, setStar] = useState(null)
    const [starSum, setStarSum] = useState(0)

    let navigate = useNavigate();

    useEffect(() => {

        const unsub = onSnapshot(getUserRef(experience.userRef.id), u => setUser(u.data()));

        getCalification(experience.id, authUser.uid).then(star => {
            setStar(star.data() && star.data().value)
        })

        const refCollection = getCalificationsByIdExperience(experience.id)
        onSnapshot(refCollection,
            snapshot => {
                const sum = snapshot.docs.map(doc => (doc.data().value )).reduce((a,b)=>a+b, 0) 
                 setStarSum(sum)
            },
            error => notifyError('Error al cargar las calificaciones: ' + error)
        );

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
        <div className="card" key={experience.id} >
            <div className="card-content">
                {user && !isMyExperience() && <User user={user} mode={'simple'} />}
                
                <div className="content">
                    <p className="title is-4">{experience.title}</p>
                    <div>{experience.text}</div>
                    <p className="subtitle is-6 is-italic has-text-right">{experience.createdAt && experience.createdAt.toDate().toDateString()}</p>
                </div>
                <div className="content">
                    <div className="tags">{tagList()}</div>
                </div>
                <div className="content is-flex is-justify-content-space-around">

                    <span className="is-flex">
                        {experience.id && <Stars star={star} onSubmit={handleSubmitStarChange}> </Stars>}
                        ( {starSum} )
                    </span>

                    <Link className=" is-link is-light" to={'/experience/' + experience.id}>
                        <FontAwesomeIcon icon={faComments} /> 
                        Comentarios</Link>
                    <Link className=" is-link is-light" to={'/experience/' + experience.id}>
                        <FontAwesomeIcon icon={faComments} /> 
                        Ver</Link>
                        
                        
                    {isMyExperience() && <Link className="link is-link is-light" to={'/addExperience/' + experience.id}><FontAwesomeIcon icon={faEdit} />  Editar</Link>}
                    {isMyExperience() && <a className=" is-link  is-text" onClick={e => removeExperience(experience.id)}><FontAwesomeIcon icon={faTrashAlt} /> Eliminar</a>}
                    
                </div>

            </div>
        </div>

    )
}