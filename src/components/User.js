
import { follow, unMentor, unFollow, followUser } from '../services/usersFirestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notify, notifyError } from '../services/Utils';

export default function User({ user, mode = "complex" }) {
  const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  const onFollow = async (keyy) => {
    try {
      await follow(authUser.uid, keyy)
      await followUser(keyy, authUser.uid, false)
      notify('Siguiendo al usuario')

    } catch (error) {
      notifyError('Error al seguir al usuario: ' + error)

    }
  }

  const onUnFollow = async (keyy) => {
    try { // usar transaction
      await unFollow(authUser.uid, keyy)
      await unMentor(keyy, authUser.uid)
      notify('Dejando de seguir al usuario')

    } catch (error) {
      notifyError('Error al dejar de seguir al usuario: ' + error)
    }
  }

  const itsMe = () => user && authUser.uid === user.uid
  const iAmYourFollower = () => user && user.followers && user.followers[authUser.uid] != null
  const isMyMentor = () => user && user.followers && user.followers[authUser.uid]

  return (
    <>
      {/*<div>
          <span className="title is-4">
            {user && user.certificate && '🎖️'}
            {user && user.displayName}
          </span>
          {!itsMe() && iAmYourFollower() && <button className="button is-small" onClick={() => onUnFollow(user.uid)}>Dejar de Seguir</button>}
          {!itsMe() && !iAmYourFollower() && <button className="button is-small" onClick={() => onFollow(user.uid)}>Seguir</button>}
          {isMyMentor() && <span>Ya es tu mentor:</span>}
          {isMyMentor() && user && <Link className="button is-small" to={`/chat/${authUser.uid}/${user.uid}`}>Chat</Link>}
          {!isMyMentor() && <span>Aun no es tu mentor</span>}
        </div>
        <p className="subtitle is-6">{user && user.email}</p>
      </div>
      <div>esta certificado(sanitario): {user && user.certificate ? 'Si' : 'No'}</div>
      <div>Seguidores: {user && user.followers && Object.keys(user.followers).length}</div>
      <div>Siguiendo: {user && user.following && Object.keys(user.following).length}</div>
      <div>Foto: {user && user.photoURL}</div>*/}
        <figure className="profile-photo-container">
          <img className="profile-photo" src={user && user.photoURL} alt="Usuario" />
        </figure>
        <div class="profile-text">
          <div class="profile-info">
            <h3 className="profile-title">Samuel Guapisimo</h3>
            <h3 className="profile-subtitle">samuel@guapo.com</h3>
          </div>
          <div class="profile-info mt-2">
            <h3 className="profile-text">{user && user.certificate ? '✔ Profesional verficado' : 'Usuario común'}</h3>
          </div>
          <div class="profile-info-flex mt-2">
            <h3 className="profile-title">Siguiendo: </h3><p className="mr-3">9{user && user.following && Object.keys(user.following).length}</p>
            <h3 className="profile-title">Seguidos: </h3><p>2{user && user.following && Object.keys(user.following).length}</p>
          </div>
        </div>
      </>
  )
}
