

import { getFirestore, query, collection, orderBy, limit } from 'firebase/firestore';
import { app } from './auth';

const BANNERS = 'banners'

const db = getFirestore(app);

const getAllBanners = () => query(collection(db, BANNERS), orderBy("createdAt", "desc"), limit(4))

export { getAllBanners }

