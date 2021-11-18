import { useState, useEffect } from 'react';
import { getUser, removeExperience } from "../services/firestore";
import { Link } from "react-router-dom";

export default function Experience({ id, title, text, type, tags, createdAt, userRef }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        getUser(userRef).then(u => setUser(u.data()))
    }, [userRef])

    const tagList = () => tags.map(tag =>
        <span key={id + tag} class="tag">#{tag}</span>
    )


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
                        <p className="title is-4">{user && user.displayName}</p>
                        <p className="subtitle is-6">{createdAt.toDate().toDateString()}</p>
                    </div>
                </div>

                <div className="content">
                    <p className="title is-4">{title}</p>

                    {text}
                    <br />
                    <div class="tags">{tagList()}</div>

                    <div class="buttons">
                        <Link className="button is-link is-light" to={'/formulario/' + id}>Editar</Link>
                        <button className="button is-link is-light" onClick={e => removeExperience(id)}>Eliminar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}