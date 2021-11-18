import { useState, useEffect } from 'react';
import { getUser, removeExperience } from "../services/firestore";

export default function Experience({ id, title, text, type, tags, createdAt, userRef }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser(userRef).then(u => setUser(u.data()))
    }, [userRef])

    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user && user.photoURL} alt="Placeholder image2"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{user && user.displayName}</p>
                        <p className="subtitle is-6">{user && user.email}</p>
                    </div>
                </div>

                <div className="content">
                    {text}
                    <br/>
                    {new Date(createdAt.seconds).toString()}
                    <time dateTime="2016-1-1"></time>
                    <div>{tags && tags.map(tag=><span key={id+tag}>#{tag}</span>)}</div>
                    <button onClick={e => removeExperience(id)}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}