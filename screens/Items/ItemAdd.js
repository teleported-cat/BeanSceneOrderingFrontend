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


{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemAdd({props, navigation}) {

    //#region Item POST
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [price, setPrice] = useState('');
    const [available, setAvailable] = useState('');
    const [glutenFree, setGlutenFree] = useState('');
    const [dietType, setDietType] = useState('');
    const [allergens, setAllergens] = useState('');
    const [category, setCategory] = useState('');

    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const addItem = async () => {

        // Validate required fields
        if (isBlank(name)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Name is required.");
            return;
        }
        if (isBlank(description)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Description is required.");
            return;
        }
        if (isBlank(price)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Price is required.");
            return;
        }
        // Validate price
        if (!isPositiveNumber(price)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Price must be a positive number.");
            return;
        }
        if (isBlank(available)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Available? is required.");
            return;
        }
        if (isBlank(glutenFree)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Gluten Free? is required.");
            return;
        }
        if (isBlank(dietType)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Diet Type is required.");
            return;
        }
        if (isBlank(category)) {
            setMessageStyle(Style.formMessageFailure);
            setMessage("Category is required.");
            return;
        }

        // Convert to json object
        var item = {
            name: name,
            description: description,
            imagepath: imagePath,
            price: Number(price),
            available: available === 'true',
            glutenfree: glutenFree === 'true',
            diettype: dietType,
            allergens: allergens,
            categoryname: category,
        };

        // Send request
        var url = API_BASE_URL + "/Items";
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "POST",
            headers: header,
            body: JSON.stringify(item)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Item added successfully!");
        } catch(error) {
            console.log("POST Item failed: " + error.message);
            setMessageStyle(Style.formMessageFailure);
            setMessage("Something went wrong, try again.");
        }

    };

    //#endregion
    //#region Category GET
    const [categoryData, setCategoryData] = useState([]);
    const isFocused = useIsFocused();

    const getCategories = async () => {
        var url = API_BASE_URL + "/Category";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setCategoryData(data);
        } catch(error) {
            console.log("GET Categories failed: " + error.message);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getCategories();
        }
    }, [props, isFocused])
    //#endregion

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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Create New Menu Item</Text>
                    </View>

                    {/* Form */}
                    <View style={Style.formBox}>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Name</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(name) => setName(name)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Description</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(description) => setDescription(description)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Image Path</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(imagePath) => setImagePath(imagePath)}></TextInput>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Price</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(price) => setPrice(price)}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Available?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(available) => setAvailable(available)}>
                                    <Picker.Item label='Select availability...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Gluten Free?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(glutenFree) => setGlutenFree(glutenFree)}>
                                    <Picker.Item label='Select gluten...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Diet Type</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(dietType) => setDietType(dietType)}>
                                    <Picker.Item label='Select diet...' value=''></Picker.Item>
                                    <Picker.Item label='Neither' value='neither'></Picker.Item>
                                    <Picker.Item label='Vegetarian' value='vegetarian'></Picker.Item>
                                    <Picker.Item label='Vegan' value='vegan'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Allergens</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(allergens) => setAllergens(allergens)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Category</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(category) => setCategory(category)}>
                                    <Picker.Item label='Select category...' value=''></Picker.Item>
                                    {categoryData.map((item, index) => {
                                        return (
                                            <Picker.Item key={index} label={item.name} value={item.name}></Picker.Item>
                                        );
                                    })}
                                </Picker>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={addItem}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Create Item</Text>
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