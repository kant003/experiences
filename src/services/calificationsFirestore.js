import { getFirestore, getDoc, setDoc, doc } from 'firebase/firestore';
import { app } from './auth';

const CALIFICATIONS = 'califications'

const db = getFirestore(app);

const addCalification = async (id, uid, value) => await setDoc(doc(db, CALIFICATIONS, id, 'uids', uid), { value }, { merge: true });
const getCalification = async (id, uid) => await getDoc(doc(db, CALIFICATIONS, id, 'uids', uid));

export { getCalification, addCalification }
