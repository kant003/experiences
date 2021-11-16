import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, query, collection, getDocs, addDoc,setDoc, doc, deleteDoc } from 'firebase/firestore/lite';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_ID,
};

const app = initializeApp(firebaseConfig);



const auth = getAuth();

const db = getFirestore(app);

const provider = new GoogleAuthProvider();

const doSignInWithGoogle = () => signInWithPopup(auth, provider)
const doSignOut = () => signOut(auth);



onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log('logueado:',uid)
    localStorage.setItem('authUser', JSON.stringify(user));
    
    // ...
} else {
    // User is signed out
    // ...
    console.log('deloguado sin user')
    localStorage.removeItem('authUser');
  }
});

/*
function doSignInWithGoogle() {
    signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log('ok login:',token,user)
            // ...
        }).catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
            console.log('fallo en login:',errorMessage)
        });

}
*/

async function setUser(user) {
    console.log(user)
    await setDoc(doc(db, "users", user.uid), {
        emailVerified:user.emailVerified,
        isAnonymous:user.isAnonymous,
        photoURL:user.photoURL,
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        roles: {},
      });
      
}

async function getExperiences() {
    const citiesCol = collection(db, 'experiences');
    const citySnapshot = await getDocs(citiesCol);

    const cityList = citySnapshot.docs.map(doc => {
        return { ...doc.data(), id: doc.id }
    });
    return cityList;
}

async function getExperiencesSnapshot() {

    const result = await getDocs(query(collection(db, 'experiences')));

    return result;
}

async function saveExperience(experience) {
    await addDoc(collection(db, "experiences"), {
        ...experience
    });
}

async function removeExperience(id) {
   
    return await deleteDoc(doc(db, "experiences", id));

}


export { getExperiences, getExperiencesSnapshot, saveExperience, removeExperience, doSignInWithGoogle,setUser, doSignOut}
