
import { follow, unMentor, unFollow, followUser } from '../services/usersFirestore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { notify, notifyError } from '../services/Utils';

export default function User({ user, mode = "complex" }) {
    const [authUser] = useState(JSON.parse(localStorage.getItem('authUser')))

    const onFollow = async (keyy) => {
        try { // usar transaction
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
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={user && user.photoURL} alt="Placeholder image2" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">
                            {user && user.certificate && '🎖️'}
                            {user && user.displayName}
                            {!itsMe() && iAmYourFollower() && <button onClick={() => onUnFollow(user.uid)}>Dejar de Seguir</button>}
                            {!itsMe() && !iAmYourFollower() && <button onClick={() => onFollow(user.uid)}>Seguir</button>}
                        </p>
                        <p className="subtitle is-6">{user && user.email}</p>
                        <p className="subtitle is-6">
                            {isMyMentor() && <span>Ya es tu mentor:</span>}
                            {isMyMentor() && user && <Link to={`/chat/${authUser.uid}/${user.uid}`}>Chat</Link>}
                            {!isMyMentor() && <span>Aun no es tu mentor</span>}
                        </p>
                    </div>
                </div>
                {mode === 'complex' && <div className="content">
                    <div>uid: {user && user.uid}</div>
                    <div>emailVerified: {user && user.emailVerified ? 'Si' : 'No'}</div>
                    <div>esta certificado(sanitario): {user && user.certificate ? 'Si' : 'No'}</div>
                    <div>isAnonymous: {user && user.isAnonymous ? 'Si' : 'No'}</div>
                    <div>Seguidores: {user && user.followers && Object.keys(user.followers).length}</div>
                    <div>Siguiendo: {user && user.following && Object.keys(user.following).length}</div>
                    <div>Roles: {user && user.roles && Object.keys(user.roles).length && 'nada'}</div>
                    <div>Creado en: {user && user.createdAt.toDate().toDateString()}</div>
                    <div>Foto: {user && user.photoURL}</div>
                    <div>Cartera NFT: XXX</div>
                </div>
                }
            </div>
        </div>
    )
}