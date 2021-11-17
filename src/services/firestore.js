import { getFirestore, query, collection, getDocs, setDoc, addDoc, doc, deleteDoc } from 'firebase/firestore';
import {app} from './auth';

const EXPERIENCES = 'experiences'

const db = getFirestore(app);


// TODO No usado
async function getExperiences() {
  const citiesCol = collection(db, 'experiences');
  const citySnapshot = await getDocs(citiesCol);

  const cityList = citySnapshot.docs.map(doc => {
    return { ...doc.data(), id: doc.id }
  });
  return cityList;
}

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

// TODO No usado
const getExperiencesSnapshot = async ()  => await getDocs(query(collection(db, EXPERIENCES)))

const saveExperience = async experience => await addDoc(collection(db, EXPERIENCES), { ...experience })

const removeExperience = async id => await deleteDoc(doc(db, EXPERIENCES, id) )

const getExperiencesCollection = () => collection(db, EXPERIENCES)

export { getExperiencesCollection, getExperiences, getExperiencesSnapshot, saveExperience, removeExperience, setUser }
