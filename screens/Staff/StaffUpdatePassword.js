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

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function StaffUpdatePassword({props, route, navigation}) {
    const staffObject = route.params.item;

    const [id, setId] = useState(staffObject._id);
    const [password, setPassword] = useState('');
    
    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const updatePassword = async () => {

        // Validate required fields
        if (isBlank(password)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Password is required.");
            return;
        }

        // Send request
        var url = `${API_BASE_URL}/Staff/${id}/UpdatePassword`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(password)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Password updated successfully!");
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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Update Password for {staffObject.firstName} {staffObject.lastName}</Text>
                    </View>

                    {/* Form Box */}
                    <View style={Style.formBox}>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Password</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={password} onChangeText={(password) => setPassword(password)}></TextInput>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={() => updatePassword()}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Update Account Password</Text>
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