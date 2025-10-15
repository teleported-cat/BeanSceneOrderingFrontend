import { Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import Style from '../styles/Style.js';

export default function BackButton() {
    const previousRouteName = useNavigationState(state => {
        const routes = state.routes;
        const prevRoute = routes[routes.length - 2];
        return prevRoute?.name;
    });

    const navigation = useNavigation();

    return (
        <View style={Style.backButtonBox}>
            <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate(previousRouteName)}>
                <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                <Text style={[Style.backButtonText, Style.boldText]}>Back</Text>
            </TouchableOpacity>
            <View style={Style.invisibleFill}></View>
        </View>
    );
}