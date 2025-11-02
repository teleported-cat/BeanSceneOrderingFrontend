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
import { isNumber, isPositiveNumber, isBlank } from '../../components/PostValidationMethods.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function CategoryAdd() {
    
    const [name, setName] = useState('');

    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const addCategory = async () => {

        // Validate required fields
        if (isBlank(name)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Name is required.");
            return;
        }

        // Convert to json object
        var category = {
            name: name
        };

        // Send request
        var url = API_BASE_URL + "/Category";
        var header = new Headers({});

        // Get user details for auth
        const rawUser = await AsyncStorage.getItem('CurrentUser');
        const authUser = JSON.parse(rawUser); 
        header.append('Authorization', 'Basic ' + btoa(`${authUser.username}:${authUser.password}`));

        header.append('Content-Type', "application/json");
        var options = {
            method: "POST",
            headers: header,
            body: JSON.stringify(category)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Category added successfully!");
        } catch(error) {
            console.log("POST Category failed: " + error.message);
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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Create New Menu Category</Text>
                    </View>

                    {/* Form */}
                    <View style={Style.formBox}>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Name</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(name) => setName(name)}></TextInput>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={addCategory}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Create Category</Text>
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