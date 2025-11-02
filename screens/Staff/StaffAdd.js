{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import BackButton from '../../components/BackButton.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import { isNumber, isPositiveNumber, isBlank, validateEmail } from '../../components/PostValidationMethods.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function StaffAdd({props, navigation}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const addStaff = async () => {

        // Validate required fields
        if (isBlank(firstName)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("First Name is required.");
            return;
        }
        if (isBlank(lastName)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Last Name is required.");
            return;
        }
        if (isBlank(username)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Username is required.");
            return;
        }
        if (isBlank(email)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Email is required.");
            return;
        }
        if (!validateEmail(email)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Email address is invalid, double check it's spelt correctly.");
            return;
        }
        if (isBlank(password)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Password is required.");
            return;
        }
        if (isBlank(role)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Role is required.");
            return;
        }

        // Convert to json object
        var staff = {
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
            passwordhash: password,
            role: role,
        };

        // Send request
        var url = API_BASE_URL + "/Staff";
        var header = new Headers({});

        // Get user details for auth
        const rawUser = await AsyncStorage.getItem('CurrentUser');
        const authUser = JSON.parse(rawUser); 
        header.append('Authorization', 'Basic ' + btoa(`${authUser.username}:${authUser.password}`));

        header.append('Content-Type', "application/json");
        var options = {
            method: "POST",
            headers: header,
            body: JSON.stringify(staff)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Staff added successfully!");
        } catch(error) {
            console.log("POST Staff failed: " + error.message);
            setMessageStyle(Style.formMessageFailure);
            setMessage("Something went wrong, try again.");
        }

    };

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Back Button */}
                    <BackButton />
        
                    {/* Form Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Create New Staff Account</Text>
                    </View>

                    {/* Form Box */}
                    <View style={Style.formBox}>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>First Name</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(firstName) => setFirstName(firstName)}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Last Name</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(lastName) => setLastName(lastName)}></TextInput>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Username</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(username) => setUsername(username)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Email</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(email) => setEmail(email)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Password</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(password) => setPassword(password)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Role</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(role) => setRole(role)}>
                                <Picker.Item label='Select a role...' value=''></Picker.Item>
                                <Picker.Item label='Manager' value='Manager'></Picker.Item>
                                <Picker.Item label='Staff' value='Staff'></Picker.Item>
                            </Picker>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={() => addStaff()}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Create Account</Text>
                            <Ionicons name='add-circle-outline' size={24} color='white'></Ionicons>
                        </TouchableOpacity>
                    </View>
                    
                    {/* Message Box */}
                    <View style={Style.formMessageBox}>
                        <Text style={[Style.formMessage, Style.boldText, messageStyle]}>{message}</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}