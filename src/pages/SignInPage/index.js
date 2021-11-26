import { useEffect, useState } from 'react';
import { doSignInWithGoogle } from '../../services/auth';
import { setUser } from '../../services/usersFirestore';
import Google from '../../components/Logos/Google';
import logo from '../../assets/images/logo-w.png';
import './SignInPage.css';
import { useNavigate } from 'react-router';

/**
  * TODO: Hay que forzar que cuando el usuario esté 
  * logueado lo rediriga a la landing page 
*/
const SignInPage = () => {
  const [error, setError] = useState();
  const [user, setLocalUser] = useState(JSON.parse(localStorage.getItem('authUser')));
  const navigate = useNavigate();

  const handleOnClick = (event) => {
    event.preventDefault();
    doSignInWithGoogle()
      .then(socialAuthUser => {
        const user = socialAuthUser.user;
        console.log('ok login:', user);
        setLocalUser(user);
        return setUser(socialAuthUser.user);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log('fallo en login:', errorMessage);
        setError(error);
      });
  };

  useEffect(() => {
    if (user) navigate("/home");
  }, [user])

  return (
    <>
      <div className="login-container">
        <img src={logo} width={250} alt="Logo" height={250} />
        {error && <p>TODO: Notification</p>}
        <h1 className="login-text is-size-3">¡Bienvenido a Kenko!</h1>
        <div className="login-buttons">
          <LoginWithEmailButton handleOnClick={() => { console.log("Funcion no disponible por el momento!") }} />
          <LoginWithGoogleButton handleOnClick={handleOnClick} />
        </div>
      </div>
    </>
  )
};

export default SignInPage;

const LoginWithGoogleButton = ({ handleOnClick }) => (
  <button type="submit" onClick={handleOnClick} className="button mt-2 is-link"><Google /> Login con Google</button>
)

const LoginWithEmailButton = ({ handleOnClick }) => (
  <button type="submit" onClick={handleOnClick} className="button is-success">✉️ Login con Email</button>
)
