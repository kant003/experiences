import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { doSignOut } from '../../services/auth';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import navbarLogo from './logo-navbar.png';
import "./Navigation.css";
const Navigation = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      if (user) {
        setUser(user);
      } else {
        console.log('desloguado en nav');
        setUser(null);
        navigate('login');
      }
    });
  }, [navigate]);

  const getUid = () => {
    if (user) return user.uid;
    return '';
  };

  return (
    <nav>
      <div className="nav-element">
        <Link className="" to={'/home/'}>
          <img width="55" height="55" src={navbarLogo} alt="" />
        </Link>
      </div>
      <div className="nav-element center-elements">
        {user && (
          <Link className="nav-item" to={'experiences'}>
          🔎
          </Link>
        )}
        {user && (
          <Link className="nav-item" to={'addExperience'}>
          ➕
          </Link>
        )}
      </div>
      <div className="nav-element">
        {user && (
          <Link className="nav-item" to={'users/' + getUid()}>
          👤
          </Link>
        )}
        {user && (
          <a href=" " onClick={() => doSignOut()} className="nav-item">
          ❌
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
