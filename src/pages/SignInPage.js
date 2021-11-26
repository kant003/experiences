import { useState } from 'react';
import { doSignInWithGoogle } from '../services/auth';
import { setUser } from '../services/usersFirestore';
import Google from '../components/Logos/Google';
import logo from '../assets/images/logo-w.png';

/**
  * TODO: Hay que forzar que cuando el usuario esté 
  * logueado lo rediriga a la landing page 
*/
const SignInPage = () => {
  const [error, setError] = useState();

  const handleOnClick = (event) => {
    event.preventDefault();
    doSignInWithGoogle()
      .then(socialAuthUser => {
        const user = socialAuthUser.user;
        console.log('ok login:', user);
        return setUser(socialAuthUser.user);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log('fallo en login:', errorMessage);
        setError(error);
      });
  };

  return (
    <>
      <div className="is-flex is-flex-direction-column is-justify-content-space-between is-align-items-center">
        <img src={logo} width={250} alt="Logo" height={250} />
        {error && <p>TODO: Notification</p>}
        <h2 className="mt-4">¡Bienvenido a Kenko! ¡Conecta con nosotros!</h2>
        <div className="mt-4">
          <LoginWithGoogleButton handleOnClick={handleOnClick} />
        </div>
        <div className="mt-4">
          <LoginWithEmailButton handleOnClick={() => { console.log("Funcion no disponible por el momento!") }} />
        </div>
      </div>
    </>
  )
};

export default SignInPage;

const LoginWithGoogleButton = ({ handleOnClick }) => (
  <button type="submit" onClick={handleOnClick} class="button is-link"><Google /> Login con Google</button>
)

const LoginWithEmailButton = ({ handleOnClick }) => (
  <button type="submit" onClick={handleOnClick} class="button is-success">✉️ Login con Email</button>
)
