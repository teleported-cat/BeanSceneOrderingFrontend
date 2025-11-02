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

export default function ItemUpdate({props, route, navigation}) {
    //#region Item PUT
    const itemObject = route.params.item;

    const [id, setId] = useState(itemObject._id);
    const [name, setName] = useState(itemObject.name);
    const [description, setDescription] = useState(itemObject.description);
    const [imagePath, setImagePath] = useState(itemObject.imagePath);
    const [price, setPrice] = useState(String(itemObject.price));
    const [available, setAvailable] = useState(String(itemObject.available));
    const [glutenFree, setGlutenFree] = useState(String(itemObject.glutenFree));
    const [dietType, setDietType] = useState(itemObject.dietType);
    const [allergens, setAllergens] = useState(itemObject.allergens);
    const [category, setCategory] = useState(itemObject.categoryName);

    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const updateItem = async () => {

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
            _id: id,
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

        // Get user details for auth
        const rawUser = await AsyncStorage.getItem('CurrentUser');
        const authUser = JSON.parse(rawUser); 
        header.append('Authorization', 'Basic ' + btoa(`${authUser.username}:${authUser.password}`));

        header.append('Content-Type', "application/json");
        var options = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(item)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Item updated successfully!");
        } catch(error) {
            console.log("PUT Item failed: " + error.message);
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

        // Get user details for auth
        const rawUser = await AsyncStorage.getItem('CurrentUser');
        const authUser = JSON.parse(rawUser); 
        header.append('Authorization', 'Basic ' + btoa(`${authUser.username}:${authUser.password}`));

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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Update Menu Item</Text>
                    </View>

                    {/* Form */}
                    <View style={Style.formBox}>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Name</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={name} onChangeText={(name) => setName(name)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Description</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={description} onChangeText={(description) => setDescription(description)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Image Path</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={imagePath} onChangeText={(imagePath) => setImagePath(imagePath)}></TextInput>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Price</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} value={price} onChangeText={(price) => setPrice(price)}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Available?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={available} onValueChange={(available) => setAvailable(available)}>
                                    <Picker.Item label='Select availability...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Gluten Free?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={glutenFree} onValueChange={(glutenFree) => setGlutenFree(glutenFree)}>
                                    <Picker.Item label='Select gluten...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Diet Type</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={dietType} onValueChange={(dietType) => setDietType(dietType)}>
                                    <Picker.Item label='Select diet...' value=''></Picker.Item>
                                    <Picker.Item label='Neither' value='neither'></Picker.Item>
                                    <Picker.Item label='Vegetarian' value='vegetarian'></Picker.Item>
                                    <Picker.Item label='Vegan' value='vegan'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Allergens</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} value={allergens} onChangeText={(allergens) => setAllergens(allergens)}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Category</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={category} onValueChange={(category) => setCategory(category)}>
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
                        <TouchableOpacity style={Style.formButton} onPress={updateItem}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Update Item</Text>
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