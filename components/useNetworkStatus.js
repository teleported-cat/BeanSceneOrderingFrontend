{/* Components */}
import {useEffect, useState} from 'react';
import NetInfo from "@react-native-community/netinfo";

export default function OfflineToast() {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const FORCE_OFFLINE = false;
        if (FORCE_OFFLINE) {
            setIsOffline(true);
            return;
        }

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        return () => unsubscribe();
    }, []);
    return isOffline;
}