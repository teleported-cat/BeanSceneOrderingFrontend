{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import ImageFallback from '../../components/ImageFallback.js';
import { useNetInfo } from "@react-native-community/netinfo";
import OfflineToast from '../../components/OfflineToast.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemList({props, navigation}) {

    const netInfo = useNetInfo();
    
    //#region GET methods
    const [itemData, setItemData] = useState([]);
    const [categoryData, setCategoryData] = useState([]);

    const isFocused = useIsFocused();

    const getItems = async () => {
        var url = API_BASE_URL + "/Items";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setItemData(data);
        } catch (error) {
            console.log("GET Items failed: " + error.message);
        }
    };

    const getCategories = async () => {
        var url = API_BASE_URL + "/Category";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setCategoryData(data);
        } catch (error) {
            console.log("GET Categories failed: " + error.message);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getItems();
            getCategories();
        }
    }, [props, isFocused])
    //#endregion
    //#region DELETE methods
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedObject, setSelectedObject] = useState({});
    const [objectType, setObjectType] = useState('');

    const showModal = (object, type) => {
        setObjectType(type);
        setSelectedObject(object);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setObjectType('');
        setSelectedObject({});
    };

    const confirmDelete = async () => {
        var url = `${API_BASE_URL}/${objectType}/${selectedObject._id}`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "DELETE",
            headers: header
        };

        try {
            const response = await fetch(url, options);
            console.log((objectType === 'Items' ? "Item" : "Category") + " deleted!");
            hideModal();
            getItems();
            getCategories();
        } catch(error) {
            console.log("DELETE " + (objectType === 'Items' ? "Item" : "Category") + " failed: " + error.message);
        }
    };
    //#endregion

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>

            {/* Item Delete Modal */}
            <Modal visible={modalVisible} transparent>
                <View style={Style.modalBox}>
                    <View style={Style.modal}>
                        <Text style={[Style.modalMessage, Style.regularText]}>Are you sure you want to delete {selectedObject.name}?</Text>
                        <View style={Style.modalActions}>
                            <TouchableOpacity style={[Style.modalButton, Style.modalCancel]} onPress={() => hideModal()}>
                                <Text style={[Style.modalButtonText, Style.regularText]}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[Style.modalButton, Style.modalDelete]} onPress={() => confirmDelete()}>
                                <Text style={[Style.modalButtonText, Style.regularText]}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Item Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Items</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {itemData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <View style={Style.itemDetails}>
                                        <View style={Style.itemImageBox}>
                                            <ImageFallback style={Style.itemImage} source={`../../assets/food_images/${item.imagePath}`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                                        </View>
                                        <View style={Style.itemInfo}>
                                            <Text style={[Style.itemText, Style.regularText]}>{item.name}</Text>
                                            <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{item.categoryName}</Text>
                                            <Text style={[Style.itemText, Style.boldText]}>${item.price.toFixed(2)}</Text>
                                        </View>
                                    </View>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionView]} onPress={() => navigation.navigate('View Item', {item})}>
                                            <Ionicons name='eye-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionEdit]} onPress={() => navigation.navigate('Update Item', {item})}>
                                            <Ionicons name='pencil-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionDelete]} onPress={() => showModal(item, 'Items')}>
                                            <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <TouchableOpacity style={Style.listAdd} onPress={() => navigation.navigate('Add Item')}>
                                <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                                <Text style={[Style.listAddText, Style.regularText]}>Add New Item</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Categories</Text>
                    </View>

                    {/* Category List */}
                    <View style={Style.listBox}>
                        {categoryData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <Text style={[Style.categoryText, Style.regularText]}>{item.name}</Text>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionDelete]} onPress={() => showModal(item, 'Category')}>
                                            <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <TouchableOpacity style={Style.listAdd} onPress={() => navigation.navigate('Add Category')}>
                                <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                                <Text style={[Style.listAddText, Style.regularText]}>Add New Category</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>

            {/* Offline Toast */}
            <OfflineToast/>
        </SafeAreaView>
    );
}