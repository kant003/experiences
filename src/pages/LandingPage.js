import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser,getUserRef } from "../services/firestore";
import Followers from '../components/Followers';
import Following from '../components/Following';
import { onSnapshot } from '@firebase/firestore';

function LandingPage() {
  const [user, setUser] = useState(null)
  const { uid } = useParams();

  useEffect(() => {
    console.log(uid)
    getUser(getUserRef(uid)).then(u => {
      setUser(u.data())
    })

    const unsub = onSnapshot(getUserRef(uid), (u) => {
      setUser(u.data())
  });
  return () => unsub();
}, [uid])


return (
  <>
  <h1 className="title">Bienvenido/a</h1>


    <img src={user && user.photoURL} alt="user"/>
    <div>UID: {user && user.uid}</div>
    <div>DisplayName: {user && user.displayName}</div>
    <div>Email: {user && user.email}</div>
    <div>Tiene el email verificado: {user && user.emailVerified}</div>
    <div>Es anonimo: {user && user.isAnonymous}</div>
    <div>Creado en: {user && user.createdAt && user.createdAt.toDate().toDateString()}</div>
    <div>Foto: {user && user.photoURL}</div>
    <div>Cartera NFT: XXX</div>
    <h2 className="title">Seguidores:</h2>
    <Followers uid={uid} userMap={user && user.followers}></Followers>
    <h2 className="title">Siguiendo:</h2>
    <Following uid={uid} userMap={user && user.following}></Following>
    {/* <div>{user&&user.followers&&user.followers.map((k,v)=><div></div>)}</div> */}
  </>
);
}
export default LandingPage;