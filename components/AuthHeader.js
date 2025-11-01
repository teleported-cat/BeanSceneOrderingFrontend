{/* Components */}
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity} from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Ionicons } from '@expo/vector-icons';

{/* Styles */}
import Style from '../styles/Style';

export default function AuthHeader({props}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    
    const navigation = useNavigation();

    const isFocused = useIsFocused();

    const logoutUser = () => {
        navigation.navigate('Login');
    };

    const retrieveUserData = async () => {
        let userObject;
        console.log("Getting User for Auth")
        try {
            const user = await AsyncStorage.getItem('CurrentUser');
            userObject = JSON.parse(user);
            console.log(user);
        } catch (error) {
            console.log("Auth Async-Storage Error: " + error);
            return;
        }

        console.log('Setting useStates')
        setFirstName(userObject.firstName);
        setLastName(userObject.lastName);
        setRole(userObject.role);
    };

    useEffect(() => {
        if (isFocused) {
            retrieveUserData();
        }
    }, [props, isFocused]);

    return (
        <View style={Style.authHeader}>
            <Text style={[Style.authText, Style.italicText]}>
                Hi {firstName} {lastName}! 👋
            </Text>
            <Text style={[Style.authText, Style.italicText]}>
                {role}
            </Text>
            <TouchableOpacity style={Style.authLogout} onPress={() => logoutUser()}>
                <Ionicons name='log-out-outline' size={16}></Ionicons>
                <Text style={[Style.authLogoutText, Style.regularText]}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}