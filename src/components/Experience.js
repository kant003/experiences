import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { getUserRef, removeExperience } from "../services/experiencesFirestore";
import Stars from './Stars';
import User from './User';
import { addCalification, getCalification, getCalificationsByIdExperience } from "../services/calificationsFirestore";
import { onSnapshot } from '@firebase/firestore';
import { notify, notifyError } from '../services/Utils';
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import ReactTimeAgo from 'react-time-ago'

export default function Experience({ experience, mode = "simple" }) {
  const [user, setUser] = useState(null)
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [star, setStar] = useState(null)
  const [starSum, setStarSum] = useState(0)
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onSnapshot(getUserRef(experience.userRef.id), u => setUser(u.data()));
    getCalification(experience.id, authUser.uid).then(star => {
      setStar(star.data() && star.data().value)
    })
    const refCollection = getCalificationsByIdExperience(experience.id)
    onSnapshot(refCollection,
      snapshot => {
        const sum = snapshot.docs.map(doc => (doc.data().value)).reduce((a, b) => a + b, 0)
        setStarSum(sum)
      },
      error => notifyError('Error al cargar las calificaciones: ' + error)
    );
    return () => unsub();
  }, [experience, authUser.uid])

  const tagList = () => experience.tags.map(tag =>
    <span key={experience.id + tag} className="tag">#{tag}</span>
  )

  const handleClick = (ev) => {
    ev.preventDefault(); 
    navigate(`/experience/${experience.id}`);
  }

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
    <>
      { mode !== "detail" ? 
      <article className="message is-link">
        <div className="message-header">
          <p>{experience.title}</p>
          <button onClick={handleClick} className="ml-5 button is-light">+</button>
        </div>
        <div className="message-body has-text-black">
          <p>{experience.createdAt && <ReactTimeAgo date={experience.createdAt.toDate()} locale="es-ES" timeStyle="twitter" />}</p>
          <User mode="simple" user={user} />
          <div className="mt-3">{experience.text}</div>
          <div class="stars is-flex is-flex-direction-row is-justify-content-center mt-3">
            {experience.id && <Stars star={star} onSubmit={handleSubmitStarChange}> </Stars>}
          </div>
        </div>
        <div class="message-body">
          {tagList()}
          {isMyExperience() && <Link className="link is-link is-light ml-3" to={'/addExperience/' + experience.id}><FontAwesomeIcon icon={faEdit} /></Link>}
          {isMyExperience() && <a href="delete" className="is-link is-text ml-3" onClick={e => { e.preventDefault(); removeExperience(experience.id) }}><FontAwesomeIcon icon={faTrashAlt} /></a>}
        </div>
      </article>
      : 
      <article className="message is-link">
        <div className="message-header">
          <p>{experience.title}</p>
        </div>
        <div className="message-body has-text-black">
          <p>{experience.createdAt && <ReactTimeAgo date={experience.createdAt.toDate()} locale="es-ES" timeStyle="twitter" />}</p>
          <User mode="simple" user={user} />
          <div className="mt-3">{experience.text}</div>
          <div class="simple-flex-centered mt-5">
            {experience.img && <img src={experience.img} alt={experience.title} />}
          </div>
          <div class="stars is-flex is-flex-direction-row is-justify-content-center mt-3">
            {experience.id && <Stars star={star} onSubmit={handleSubmitStarChange}> </Stars>}
            <p className="ml-3">{starSum}</p>
          </div>
        </div>
        <div class="message-body">
          <div className="simple-flex-centered">
            <p className="has-text-weight-bold">{experience.systemName}</p> 
            <p className="has-text-weight-bold">Zona: {experience.area}</p>
          </div>
          {tagList()}
          {isMyExperience() && <Link className="link is-link is-light ml-3" to={'/addExperience/' + experience.id}><FontAwesomeIcon icon={faEdit} /></Link>}
          {isMyExperience() && <a href="delete" className="is-link is-text ml-3" onClick={e => { e.preventDefault(); removeExperience(experience.id) }}><FontAwesomeIcon icon={faTrashAlt} /></a>}
        </div>
      </article>
      }
      </>
  )
}
