import { useState, useEffect } from 'react';
import { getUser, removeExperience } from "../services/firestore";
import { Link } from "react-router-dom";
import { follow, unMentor, unFollow, followUser } from '../services/firestore';
import Stars from './Stars';

export default function Experience({ id, title, text, type, tags, createdAt, userRef }) {
    const [user, setUser] = useState(null)
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    useEffect(() => {
        getUser(userRef).then(u => setUser(u.data()))
    }, [userRef, user && user.followers])

    const tagList = () => tags.map(tag =>
        <span key={id + tag} className="tag">#{tag}</span>
    )

    const onFollow = async (keyy) => {
        try {
            await follow(authUser.uid,keyy)
            await followUser(keyy, authUser.uid,false)
            console.log('followed',authUser.uid,keyy);
        } catch (error) {
            console.error('error:',error)
        }
    }

    const onUnFollow = async (keyy) => {
        try {
            await unFollow(authUser.uid,keyy)
            await unMentor(keyy,authUser.uid)

            console.log('desuscrito',authUser.uid,keyy);
        } catch (error) {
            console.error('error:',error)
        }
    }


    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user && user.photoURL} alt="Placeholder image2" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{user && user.displayName}
                        { authUser && user && user.uid!==authUser.uid && user.followers!=null && Object.keys(user.followers).includes(authUser.uid) 
                        ? 
                        <button onClick={()=>onUnFollow(user.uid)}>Dejar de Seguir</button>
                        : 
                        <button onClick={()=>onFollow(user.uid)}>Seguir</button>
                        }
                        </p>
                        <p className="subtitle is-6">{createdAt.toDate().toDateString()}</p>
                    </div>
                </div>

                <div className="content">
                    <p className="title is-4">{title}</p>

                    {text}
                    <br />
                    <div className="tags">{tagList()}</div>

                    <Stars id={id} uid={authUser.uid}></Stars>

                    <div className="buttons">
                        <Link className="button is-link is-light" to={'/formulario/' + id}>Editar</Link>
                        <button className="button is-link is-light" onClick={e => removeExperience(id)}>Eliminar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}