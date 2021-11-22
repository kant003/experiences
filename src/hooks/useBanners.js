
import { useState, useEffect } from 'react';
import { getAllBanners } from "../services/bannersFirestore";
import { onSnapshot } from '@firebase/firestore';
import { notifyError } from '../services/Utils';

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
            error => notifyError('Error al cargar los banners: '+error)

        );
        return () => unsubscribe()
    }, [])

    return {
        loading, banners
    };
}