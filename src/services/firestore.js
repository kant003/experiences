import { getFirestore, query, collection, getDocs, getDoc, setDoc, addDoc, doc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import {app} from './auth';

const EXPERIENCES = 'experiences'
const USERS = 'users'

const db = getFirestore(app);

// TODO No usado
const getExperiencesSnapshot = async ()  => await getDocs(query(collection(db, EXPERIENCES)))

const saveExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience,  createdAt: serverTimestamp() })

const removeExperience = async id => await deleteDoc(doc(db, EXPERIENCES, id) )

const getExperiencesCollection = () => collection(db, EXPERIENCES)

const getUsersCollection = () => collection(db, USERS)

const getUserRef = (uid) => doc(db, "users", uid);

const getUser = async (userRef)  => await getDoc(userRef)

async function setUser(user) {
  await setDoc(doc(db, "users", user.uid), {
      emailVerified: user.emailVerified,
      isAnonymous: user.isAnonymous,
      photoURL: user.photoURL,
      displayName: user.displayName,
      email: user.email,
      uid: user.uid,
      roles: {},
  });

}

export { getUsersCollection, getUser, getUserRef, getExperiencesCollection, getExperiencesSnapshot, saveExperience, removeExperience, setUser }


