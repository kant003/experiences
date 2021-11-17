import { useState } from 'react';

import { removeExperience } from "../services/firestore";

export default function Experience({ id, title, text, type }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

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
                        <p className="title is-4">Juan Perez</p>
                        <p className="subtitle is-6">@johnsmith</p>
                    </div>
                </div>

                <div className="content">

                    {text}
                    Phasellus nec iaculis mauris.
                    
                    <br/>
                    <time datetime="2016-1-1">11: 09 PM - 1 Jan 2016</time>
                    <button onClick={e => removeExperience(id)}>Eliminar</button>

                </div>
            </div>
        </div>
    )
}