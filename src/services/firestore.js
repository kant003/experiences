import { getFirestore, query, collection, getDocs, getDoc, setDoc, addDoc, doc, deleteDoc, serverTimestamp, where,orderBy,limit } from 'firebase/firestore';
import {app} from './auth';

const EXPERIENCES = 'experiences'
const USERS = 'users'

const db = getFirestore(app);

// Experiences

// TODO No usado
const getExperiencesSnapshot = async ()  => await getDocs(query(collection(db, EXPERIENCES)))

const saveExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience,  createdAt: serverTimestamp() })

const removeExperience = async id => await deleteDoc(doc(db, EXPERIENCES, id) )

const getAllExperiences = () => query(collection(db, EXPERIENCES), orderBy("createdAt", "desc"), limit(100))

const getAllExperiencesByUid = (uid) => query(collection(db, EXPERIENCES), where("userRef", "==", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))

// Users

const getAllUsers = () => collection(db, USERS)

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
      createdAt: serverTimestamp(), //TODO: esto cambia cada vez que se loguea, corregir
      roles: {},
  });

}

export { getAllUsers, getUser, getUserRef, getAllExperiencesByUid, getAllExperiences, getExperiencesSnapshot, saveExperience, removeExperience, setUser }


