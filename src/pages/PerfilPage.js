import { useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { getUser } from "../services/usersFirestore";
import User from '../components/User';

function PerfilPage() {
  const [user, setUser] = useState(null)
  const { uid } = useParams();

  useEffect(() => {
    console.log(uid)
    getUser(uid).then(u => setUser(u.data()))
}, [uid])


  return (
    <>
      <h1 className="title">Perfil del usuario</h1>
      <User user={user} />
    </>
  );
}
export default PerfilPage;