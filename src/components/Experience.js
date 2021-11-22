import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { removeExperience } from "../services/experiencesFirestore";
import { getUser } from "../services/usersFirestore";
import { follow, unMentor, unFollow, followUser } from '../services/usersFirestore';
import Stars from './Stars';
import { addCalification, getCalification } from "../services/calificationsFirestore";

export default function Experience({ experience }) {
    const [user, setUser] = useState(null)
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
    const [star, setStar] = useState(null)

    useEffect(() => {
        //console.log('la exp',experience, authUser.uid)
        getUser(experience.userRef.id).then(u => setUser(u.data()))
        getCalification(experience.id, authUser.uid).then(star => {
            setStar(star.data() && star.data().value )
         } )
    }, [experience, authUser.uid])

    const tagList = () => experience.tags.map(tag =>
        <span key={experience.id + tag} className="tag">#{tag}</span>
    )

    const onFollow = async (keyy) => {
        try {
            await follow(authUser.uid, keyy)
            await followUser(keyy, authUser.uid, false)
            getUser(experience.userRef).then(u => setUser(u.data())) //TODO: no es necesario

            console.log('followed', authUser.uid, keyy);
        } catch (error) {
            console.error('error:', error)
        }
    }

    const onUnFollow = async (keyy) => {
        try {
            await unFollow(authUser.uid, keyy)
            await unMentor(keyy, authUser.uid)
            getUser(experience.userRef).then(u => setUser(u.data())) //TODO: no es necesario

            console.log('desuscrito', authUser.uid, keyy);
        } catch (error) {
            console.error('error:', error)
        }
    }

    
    const handleSubmitStarChange = async ({value}) => {
        console.log('desde padre',value)
        try {
            await addCalification(experience.id, authUser.uid, value)
            setStar(value)
           //notify('Calificación','Calificación establecida correctamente')
        } catch (error) {
            console.error('error:', error)
            //notify('Calificación','Calificación establecida correctamente', 'error')
        }
    }
    
    return (
        
        <div className="card" key={experience.id}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user && user.photoURL} alt="Placeholder image2" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <div className="title is-4">
                            <p className="title is-4">{experience.title}</p>
                            {authUser && user && user.uid !== authUser.uid && user.followers != null && Object.keys(user.followers).includes(authUser.uid)
                                ?
                                <button onClick={() => onUnFollow(user.uid)}>Dejar de Seguir</button>
                                :
                                <button onClick={() => onFollow(user.uid)}>Seguir</button>
                            }
                            {user && <Link to={`/chat/${authUser.uid}/${user.uid}`}>Chat</Link> }


                        </div>
                        <p className="subtitle is-6">{user && user.displayName}</p>
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
                        <Link className="button is-link is-light" to={'/formulario/' + experience.id}>Editar</Link>
                        <button className="button is-link is-light" onClick={e => removeExperience(experience.id)}>Eliminar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}