import { getFirestore, query, collection, addDoc, serverTimestamp,  orderBy,limit } from 'firebase/firestore';
import {app} from './auth';

const ROOMS = 'rooms'
const MSGS = 'msgs'

const db = getFirestore(app);

// Commnets
const getChats = (idRoom) => {
    console.log(idRoom)
    console.log('MdXwpOvtAUfN9WJ9osCPZhYVlU53_SvhgFhePbJSEs1pdV2GdQu2YiXA3')
    console.log(ROOMS)
    console.log(MSGS)

    return query(collection(db, ROOMS, idRoom, MSGS))
}
const saveMsg = async (idRoom, uid, msg) => await addDoc(collection(db, ROOMS, idRoom, MSGS), { uid, msg,  createdAt: serverTimestamp() })

export { saveMsg, getChats }


