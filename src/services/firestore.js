import { getFirestore, query, collection, getDocs, getDoc, setDoc, addDoc, updateDoc, deleteField, doc, deleteDoc, serverTimestamp, where,orderBy,limit } from 'firebase/firestore';
import {app} from './auth';

const EXPERIENCES = 'experiences'
const USERS = 'users'
//const FOLLOWERS = 'followers'
//const FOLLOWING = 'following'
const CALIFICATIONS = 'califications'
const COMMENTS = 'comments'
const db = getFirestore(app);

// Experiences

// TODO No usado
const getExperiencesSnapshot = async ()  => await getDocs(query(collection(db, EXPERIENCES)))

const saveExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience,  createdAt: serverTimestamp() })

const removeExperience = async id => await deleteDoc(doc(db, EXPERIENCES, id) )

const getExperience = async id  => await getDoc(doc(db, EXPERIENCES, id))


const getAllExperiences = uid => query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))

const getAllExperiencesByUid = uid => query(collection(db, EXPERIENCES), where("userRef", "==", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))

// Commnets
const getComentsByExperienceId = idExp => query(collection(db, EXPERIENCES, idExp, COMMENTS), orderBy("createdAt", "desc"), limit(100))
const saveComment = async (idExp, text) => await addDoc(collection(db, EXPERIENCES, idExp, COMMENTS), { text,  createdAt: serverTimestamp() })
const removeComment = async (idExp, idComment) => await deleteDoc(doc(db, EXPERIENCES, idExp, COMMENTS, idComment) )

// califications

const addCalification  = async (id, uid, value) => await setDoc(doc(db, CALIFICATIONS, id, 'uids', uid), { value }, { merge: true });
const getCalification  = async (id, uid) => await getDoc(doc(db, CALIFICATIONS, id, 'uids', uid));

// Users

const getAllUsers = () => collection(db, USERS)

const getUserRef = uid => doc(db, USERS, uid);

const getUser = async userRef  => await getDoc(userRef)


async function setUser(user) {
  await setDoc(doc(db, USERS, user.uid), {
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
const followUser = async (uid, userRef, value) => await updateDoc(doc(db, USERS, uid), { [`followers.${userRef}`]: value });
const followingUser = async (uid, userRef, value) => await updateDoc(doc(db, USERS, uid), { [`following.${userRef}`]: value });

const unFollow = async (uid, userRef) => await updateDoc(doc(db, USERS, uid), { [`following.${userRef}`]: deleteField() });
const follow = async (uid, userRef) => await updateDoc(doc(db, USERS, uid), { [`following.${userRef}`]: false });

const unMentor = async (uid, userRef) => await updateDoc(doc(db, USERS, uid), { [`followers.${userRef}`]: deleteField() });


//Followers
//const saveExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience,  createdAt: serverTimestamp() })

//const getAllExperiencesByUid = (uid) => doc(db, USERS, uid), where("userRef", "==", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))

//Followin

export { removeComment, saveComment, getComentsByExperienceId, getCalification, addCalification, unMentor, follow, unFollow, followingUser, followUser, getAllUsers, getUser, getUserRef, getAllExperiencesByUid, getAllExperiences, getExperience, getExperiencesSnapshot, saveExperience, removeExperience, setUser }


