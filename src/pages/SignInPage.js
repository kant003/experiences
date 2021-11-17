import { useState } from 'react';
import { doSignInWithGoogle } from "../services/auth";
import { setUser } from "../services/firestore";

const SignInPage = () => (
  <div>
    <h1>Login</h1>
    <SignInGoogleBase />
  </div>
);

export default SignInPage



function SignInGoogleBase() {

  const [error, setError] = useState([])


  const onSubmit = event => {
    doSignInWithGoogle()
      .then(socialAuthUser => {

        const user = socialAuthUser.user;
        console.log('ok login:', user)

        return setUser(socialAuthUser.user)

      }).catch((error) => {
        //const errorCode = error.code;
        const errorMessage = error.message;
        //const email = error.email;

        console.log('fallo en login:', errorMessage)

        setError(error)
      });


    event.preventDefault();
  };


  return (
    <form onSubmit={onSubmit}>
      <button type="submit">Logueate con Google</button>
      {error && <p>{error.message}</p>}
    </form>
  );
}
