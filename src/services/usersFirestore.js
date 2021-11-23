import { getFirestore, collection, getDoc, setDoc, updateDoc, deleteField, doc, serverTimestamp } from 'firebase/firestore';
import { app } from './auth';

const USERS = 'users'
const db = getFirestore(app);


const getAllUsers = () => collection(db, USERS)

const getUser = async uid => await getDoc(doc(db, USERS, uid))


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


export { unMentor, follow, unFollow, followingUser, followUser, getAllUsers, getUser, setUser }


