import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser,getUserRef } from "../services/firestore";

function PerfilPage() {
  const [user, setUser] = useState(null)
  const { uid } = useParams();

  useEffect(() => {
    console.log(uid)
    getUser(getUserRef(uid)).then(u => setUser(u.data()))
}, [uid])


  return (
    <>
      <h1 className="title">Perfil del usuario</h1>
      <img src={user && user.photoURL} alt="user"/>
      <div>UID: {user && user.uid}</div>
      <div>DisplayName: {user && user.displayName}</div>
      <div>Email: {user && user.email}</div>
      <div>Tiene el email verificado: {user && user.emailVerified}</div>
      <div>Es anonimo: {user && user.isAnonymous}</div>
      <div>Creado en: {user && user.createdAt.toDate().toDateString()}</div>
      <div>Foto: {user && user.photoURL}</div>
      <div>Cartera NFT: XXX</div>
    </>
  );
}
export default PerfilPage;