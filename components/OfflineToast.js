{/* Components */}
import { Text, View } from 'react-native';
import Style from '../styles/Style.js';
import useNetworkStatus from './useNetworkStatus.js';

export default function OfflineToast() {
    const isOffline = useNetworkStatus();
    return (
        <View style={Style.offlineToastBox}>
            {isOffline && (
                <View style={Style.toast}>
                    <Text style={[Style.toastText, Style.regularText]}>You're offline. Check your internet connection.</Text>
                </View>
            )}
        </View>
    );
}