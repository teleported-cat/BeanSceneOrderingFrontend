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

export default function StaffUpdate({props, route, navigation}) {
    const staffObject = route.params.item;

    const [id, setId] = useState(staffObject._id);
    const [firstName, setFirstName] = useState(staffObject.firstName);
    const [lastName, setLastName] = useState(staffObject.lastName);
    const [username, setUsername] = useState(staffObject.username);
    const [email, setEmail] = useState(staffObject.email);
    const [role, setRole] = useState(staffObject.role);
    
    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const updateStaff = async () => {

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
        if (isBlank(role)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Role is required.");
            return;
        }

        // Convert to json object
        var staff = {
            _id: id,
            firstname: firstName,
            lastname: lastName,
            username: username,
            email: email,
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
            method: "PUT",
            headers: header,
            body: JSON.stringify(staff)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Staff updated successfully!");
        } catch(error) {
            console.log("PUT Staff failed: " + error.message);
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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Update Staff Account</Text>
                    </View>

                    {/* Form Box */}
                    <View style={Style.formBox}>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>First Name</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} value={firstName} onChangeText={(firstName) => setFirstName(firstName)}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Last Name</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} value={lastName} onChangeText={(lastName) => setLastName(lastName)}></TextInput>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Username</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={username} onChangeText={(username) => setUsername(username)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Email</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={email} onChangeText={(email) => setEmail(email)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Role</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={role} onValueChange={(role) => setRole(role)}>
                                <Picker.Item label='Select a role...' value=''></Picker.Item>
                                <Picker.Item label='Manager' value='Manager'></Picker.Item>
                                <Picker.Item label='Staff' value='Staff'></Picker.Item>
                            </Picker>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={() => updateStaff()}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Update Account</Text>
                            <Ionicons name='pencil-outline' size={24} color='white'></Ionicons>
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