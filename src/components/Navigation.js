import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { doSignOut } from "../services/experiences";
import { getAuth, onAuthStateChanged } from "firebase/auth";



const Navigation = () => {
  
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')))

  useEffect(() => {

    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        const uid = user.uid;
        console.log('nav logeado:',uid)
        setUser(user)
    } else {
        console.log('desloguado en nav')
        //localStorage.removeItem('authUser');
        setUser(null)
      }
    });

  }, [])

  return (
  <ul>
    <li>
      <Link to={'/'}>Home</Link>
    </li>
    <li>
      <Link to={'experiences'}>Experiencias</Link>
    </li>
    <li>
      <Link to={'formulario'}>Formulario inserción</Link>
    </li>
    <li>
      <Link to={'SignIn'}>Login</Link>
    </li>
    <li>
    <button onClick={(e) => doSignOut()}>Logout</button>
    </li>
    <li>
      {user && user.email}
    </li>
  </ul>
)};

export default Navigation;
