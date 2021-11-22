import { getFirestore, query, collection, addDoc, serverTimestamp,limit ,orderBy} from 'firebase/firestore';
import {app} from './auth';

const ROOMS = 'rooms'
const MSGS = 'msgs'

const db = getFirestore(app);

const getChats = idRoom => query(collection(db, ROOMS, idRoom, MSGS), orderBy('createdAt'), limit(1000))
const saveMsg = async (idRoom, uid, msg) => await addDoc(collection(db, ROOMS, idRoom, MSGS), { uid, msg,  createdAt: serverTimestamp() })

export { saveMsg, getChats }


