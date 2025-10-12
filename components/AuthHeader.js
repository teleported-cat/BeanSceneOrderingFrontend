{/* Components */}
import { Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Ionicons } from '@expo/vector-icons';

{/* Styles */}
import Style from '../styles/Style';

export default function AuthHeader() {
    
    const navigation = useNavigation();

    const logoutUser = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={Style.authHeader}>
            <Text style={[Style.authText, Style.italicText]}>
                Hi John Doe! 👋
            </Text>
            <Text style={[Style.authText, Style.italicText]}>
                Role
            </Text>
            <TouchableOpacity style={Style.authLogout} onPress={logoutUser}>
                <Ionicons name='log-out-outline' size={16}></Ionicons>
                <Text style={[Style.authLogoutText, Style.regularText]}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}