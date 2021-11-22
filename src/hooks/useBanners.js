
import { useState, useEffect } from 'react';
import { getAllBanners } from "../services/bannersFirestore";
import { onSnapshot } from '@firebase/firestore';

export function useBanners() {
    const [loading, setLoading] = useState(false)
    const [banners, setBanners] = useState([])

    useEffect(() => {
        setLoading(true)
        const unsubscribe = onSnapshot(getAllBanners(),
            snapshot => {
                setBanners(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })))
                setLoading(false)
            },
            error => console.log('error al cargar los datos', error));
        return () => unsubscribe()
    }, [])

    return {
        loading, banners
    };
}