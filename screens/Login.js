{/* Components */}
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL } from '../components/APIAddress.js';
import { isBlank } from '../components/PostValidationMethods.js';

{/* Stylesheet */}
import Style from '../styles/Style.js';

export default function Login({props, route, navigation}) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [message, setMessage] = useState('');

    const isFocused = useIsFocused();


    const loginManager = () => {
        navigation.navigate('Manager Dashboard');
    };

    const loginStaff = () => {
        navigation.navigate('Staff Dashboard');
    };

    const validate = async () => {
        // Validate required fields
        if (isBlank(username)) {
            setMessage("Username is required.");
            return;
        }
        if (isBlank(password)) {
            setMessage("Password is required.");
            return;
        }

        // Create credentials object
        var credentials = {
            username: username,
            password: password
        };

        // Send request
        var url = `${API_BASE_URL}/Staff/Login`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "POST",
            headers: header,
            body: JSON.stringify(credentials)
        };

        let data;

        try {
            const response = await fetch(url, options);
            if (response.status == 401) {
                console.log("Unauthorised!");
                setMessage("Username or Password is incorrect.");
                return;
            }
            data = await response.json();
            // Add plain text password to data for API auth
            data.password = password;
        } catch(error) {
            console.log("Login failed: " + error.message);
            setMessage("Something went wrong, try again.");
            return;
        }

        // Save user data to async storage
        try {
            await AsyncStorage.setItem('CurrentUser', JSON.stringify(data));
            console.log('Stored user!');
            console.log(data);
        } catch (error) {
            console.log("Async-Storage Error: " + error);
            return;
        }

        // Navigate to appropriate dashboard
        if (data.role == "Manager") {
            navigation.navigate('Manager Dashboard');
        } else {
            navigation.navigate('Staff Dashboard');
        }

    };

    // Blanks out user data in async storage when login screen is loaded
    const clearUser = async () => {
        console.log('Clearing user data...');
        try {
            await AsyncStorage.setItem('CurrentUser', {});
            console.log('Cleared!');
        } catch (error) {
            console.log("Clearing error!: " + error);
            return;
        }
    };

    useEffect(() => {
        if (isFocused) {
            clearUser();
        }
    }, [props, isFocused]);

    return (
        <SafeAreaView style={[Style.center, Style.loginBackground]}>
            <ScrollView contentContainerStyle={Style.center}>
                {/* Logo Box */}
                <View style={[Style.loginLogoBox, Style.center]}>
                    <Image style={Style.loginImage} source={require('../assets/brand_materials/logo/png/logo-secondary-transparent.png')} resizeMode='contain'></Image>
                    <Text style={[Style.loginTitle, Style.boldText]}>Ordering System</Text>
                </View>

                {/* Message Box */}
                <View style={Style.loginMessageBox}>
                    <Text style={[Style.loginMessageText, Style.italicText]}>{message}</Text>
                </View>

                {/* Form Box */}
                <View style={[Style.loginFormBox, Style.topCenter]}>
                    <TextInput style={[Style.loginInput, Style.regularText]} placeholder='Username' value={username} onChangeText={(username) => setUsername(username)}></TextInput>
                    <TextInput style={[Style.loginInput, Style.regularText]} placeholder='Password' value={password} onChangeText={(password) => setPassword(password)} secureTextEntry></TextInput>
                    <TouchableOpacity style={[Style.loginButton]} onPress={() => validate()}>
                        <Text style={[Style.loginButtonText, Style.boldText]}>Login</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}