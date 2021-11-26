import { getFirestore, query, collection, getDocs, getDoc, addDoc, updateDoc, doc, deleteDoc, serverTimestamp, where, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';
const EXPERIENCES = 'experiences'
const USERS = 'users'

const db = getFirestore(app);

const getUserRef = uid => doc(db, USERS, uid);


// TODO No usado
const getExperiencesSnapshot = async () => await getDocs(query(collection(db, EXPERIENCES)))

const addExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience, createdAt: serverTimestamp() })
const updateExperience = async (id, experience) => await updateDoc(doc(db, EXPERIENCES, id), { ...experience })

const removeExperience = async id => await deleteDoc(doc(db, EXPERIENCES, id))

const getExperience = async id => await getDoc(doc(db, EXPERIENCES, id))


const getAllExperiences = uid => query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))
const getSearchExperiences = (keyword, uid) => {
    const q = keyword ? query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid)), where("tags", "array-contains-any", [keyword]), orderBy("userRef"), orderBy("createdAt", "desc"), limit(100))
        :
        query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid)), orderBy("userRef"), orderBy("createdAt", "desc"), limit(100))
    return q
}

const getAllExperiencesByUid = uid => query(collection(db, EXPERIENCES), where("userRef", "==", getUserRef(uid), orderBy("createdAt", "desc"), limit(100)))


export { getUserRef, getSearchExperiences, getAllExperiencesByUid, getAllExperiences, getExperience, getExperiencesSnapshot, addExperience, updateExperience,removeExperience }


