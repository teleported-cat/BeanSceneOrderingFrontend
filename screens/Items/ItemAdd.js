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


{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemAdd({props, navigation}) {

    //#region Item POST
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
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Description</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Image Path</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Price</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Available?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select availability...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Gluten Free?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select gluten...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Diet Type</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select diet...' value=''></Picker.Item>
                                    <Picker.Item label='Neither' value='neither'></Picker.Item>
                                    <Picker.Item label='Vegetarian' value='vegetarian'></Picker.Item>
                                    <Picker.Item label='Vegan' value='vegan'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Allergens</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Category</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
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
                        <TouchableOpacity style={Style.formButton}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Create Item</Text>
                            <Ionicons name='add-circle-outline' size={24} color='white'></Ionicons>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}