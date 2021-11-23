import { getFirestore, getDoc, setDoc, doc, collection } from 'firebase/firestore';
import { app } from './auth';

const CALIFICATIONS = 'califications'

const db = getFirestore(app);

const addCalification = async (id, uid, value) => await setDoc(doc(db, CALIFICATIONS, id, 'uids', uid), { value }, { merge: true });
const getCalification = async (id, uid) => await getDoc(doc(db, CALIFICATIONS, id, 'uids', uid));

const getCalificationsByIdExperience = id => collection(db, CALIFICATIONS, id, 'uids');
//query(collection(db, EXPERIENCES), where("userRef", "!=", getUserRef(uid)), where("tags", "array-contains-any", [keyword]), orderBy("userRef"), orderBy("createdAt", "desc"), limit(100))
export { getCalificationsByIdExperience, getCalification, addCalification }
