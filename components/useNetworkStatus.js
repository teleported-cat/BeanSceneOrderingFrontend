{/* Components */}
import {useEffect, useState} from 'react';
import NetInfo from "@react-native-community/netinfo";

export default function useNetworkStatus() {
    const [isOffline, setIsOffline] = useState(null);

    useEffect(() => {
        const FORCE_OFFLINE = false;
        if (FORCE_OFFLINE) {
            setIsOffline(true);
            return;
        }

        NetInfo.fetch().then(state => {
            setIsOffline(!state.isConnected);
        });

        const unsubscribe = NetInfo.addEventListener(state => {
            setIsOffline(!state.isConnected);
        });

        return () => unsubscribe();
    }, []);
    return isOffline;
}