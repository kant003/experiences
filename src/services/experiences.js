import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, query, collection, getDocs, addDoc,setDoc, doc, deleteDoc } from 'firebase/firestore/lite';

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
    const uid = user.uid;
    console.log('logueado:',uid)
    localStorage.setItem('authUser', JSON.stringify(user));
    
} else {
    console.log('deloguado sin user')
    localStorage.removeItem('authUser');
  }
});

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
    return await getDocs(query(collection(db, 'experiences')));
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
