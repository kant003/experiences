import { getFirestore, query, collection, addDoc, doc, deleteDoc, serverTimestamp,  orderBy,limit } from 'firebase/firestore';
import {app} from './auth';

const EXPERIENCES = 'experiences'
const COMMENTS = 'comments'

const db = getFirestore(app);

// Commnets
const getComentsByExperienceId = idExp => query(collection(db, EXPERIENCES, idExp, COMMENTS), orderBy("createdAt", "desc"), limit(100))
const saveComment = async (idExp, commnet) => await addDoc(collection(db, EXPERIENCES, idExp, COMMENTS), { ...commnet,  createdAt: serverTimestamp() })
const removeComment = async (idExp, idComment) => await deleteDoc(doc(db, EXPERIENCES, idExp, COMMENTS, idComment) )


export { removeComment, saveComment, getComentsByExperienceId }


