import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { doSignOut } from "../services/auth";
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
    <>

  <nav className="navbar" role="navigation" aria-label="main navigation">
  <div className="navbar-brand">
    <a className="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="logo"/>
    </a>

    <a href="#" role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>

  <div id="navbarBasicExample" className="navbar-menu">
    <div className="navbar-start">
      <Link className="navbar-item" to={'/'}>Home</Link>

      <Link className="navbar-item" to={'experiences'}>Experiencias</Link>
      <Link className="navbar-item" to={'formulario'}>Formulario inserción</Link>

     
    </div>

    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          
          {user && <a href="#" onClick={() => doSignOut()} className="navbar-item">Logout</a> }
          
          {user && user.email}
          {!user && <Link visible="false" to={'SignIn'}>Login</Link>}
        </div>
      </div>
    </div>
  </div>
</nav>
</>


)};

export default Navigation;
