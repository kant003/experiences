import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {doSignOut} from '../services/auth';
import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {getTokenBalance, parseTokens} from '../services/blockchain.js';
import Logo from './Logo';

const Navigation = ({usingEthereum}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const [tokens, setTokens] = useState();

  let navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(getAuth(), user => {
      if (user) {
        setUser(user);
      } else {
        console.log('desloguado en nav');
        setUser(null);
        navigate('SignIn');
      }
    });
  }, [navigate]);

  useEffect(async () => {
    if (!usingEthereum) return;
    let tokens = await getTokenBalance();
    setTokens(parseTokens(tokens.toString()));
  }, [usingEthereum]);

  const getUid = () => {
    if (user) return user.uid;
    return '';
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://bulma.io">
            <Logo width2="40" height2="40"></Logo>{' '}
          </a>

          <a
            href=" "
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            {user && (
              <Link className="navbar-item" to={'/home/'}>
                Home
              </Link>
            )}

            {user && (
              <Link className="navbar-item" to={'experiences'}>
                Exper
              </Link>
            )}
            {user && (
              <Link className="navbar-item" to={'addExperience'}>
                Add exper
              </Link>
            )}
            {user && (
              <Link className="navbar-item" to={'users'}>
                Users
              </Link>
            )}
            {user && (
              <Link className="navbar-item" to={'users/' + getUid()}>
                Perfil
              </Link>
            )}
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {user && (
                  <a href=" " onClick={() => doSignOut()} className="navbar-item">
                    Logout
                  </a>
                )}
                {user && user.email}
                {!user && (
                  <Link visible="false" to={'SignIn'}>
                    Login
                  </Link>
                )}
                {usingEthereum && tokens && <p>Tienes {tokens} KNK</p>}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
