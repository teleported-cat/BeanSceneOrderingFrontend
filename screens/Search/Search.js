{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal, Picker } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import ImageFallback from '../../components/ImageFallback.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function Search({props, route, navigation}) {
    const stackRole = route.params?.stackRole;

    //#region GET methods
    const [categoryData, setCategoryData] = useState([]);
    const [itemData, setItemData] = useState([]);

    const [query, setQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [queriedData, setQueriedData] = useState([]);

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
            setQueriedData(data);
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

    // Using the search bar query & category filter, produce an array containing elements that satisfy those conditions
    const updateQuery = (newQuery, newFilter) => {
        let newItems = [];
        const trimmedQuery = newQuery.trim().toLowerCase();

        // Loop through each item and add each item with conditions
        for (let i = 0; i < itemData.length; i++) {
            const itemName = itemData[i].name.toLowerCase();
            if (itemName.includes(trimmedQuery)) {
                if (newFilter === '' || itemData[i].categoryName === newFilter) {
                    newItems.push(itemData[i]);
                }
            }
        }

        setQueriedData(newItems);
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
    const [selectedItem, setSelectedItem] = useState({});

    const showModal = (item) => {
        setSelectedItem(item);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setSelectedItem({});
    };

    const confirmDelete = async () => {
        var url = `${API_BASE_URL}/Items/${selectedItem._id}`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "DELETE",
            headers: header
        };

        try {
            const response = await fetch(url, options);
            console.log("Item deleted!");
            hideModal();
            getItems();
        } catch(error) {
            console.log("DELETE Item failed: " + error.message);
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
                        <Text style={[Style.modalMessage, Style.regularText]}>Are you sure you want to delete {selectedItem.name}?</Text>
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
                    {/* Category Filter */}
                    <View style={Style.searchCategoryBox}>
                        <Text style={[Style.searchCategoryLabel, Style.italicText]}>Category</Text>
                        <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} 
                        onValueChange={(filter) => {
                            setCategoryFilter(filter);
                            updateQuery(query, filter);
                        }}>
                            <Picker.Item label='All Items' value=''></Picker.Item>
                            {categoryData.map((item, index) => {
                                return (
                                    <Picker.Item key={index} label={item.name} value={item.name}></Picker.Item>
                                );
                            })}
                        </Picker>
                    </View>

                    {/* Search Bar */}
                    <View style={Style.searchBarBox}>
                        <TextInput style={[Style.formFieldInput, Style.searchBar, Style.regularText]} placeholder='Search...' 
                        onChangeText={
                            (search) => {
                                setQuery(search);
                                updateQuery(search, categoryFilter);
                            }
                        }></TextInput>
                    </View>

                    {/* Results Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Results</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {queriedData.map((item, index) => {
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
                                        <TouchableOpacity style={[Style.actionButton, Style.actionView]} onPress={() => navigation.navigate('Search View', {item})}>
                                            <Ionicons name='eye-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        {
                                        stackRole === 'Manager' ? 
                                            <TouchableOpacity style={[Style.actionButton, Style.actionEdit]} onPress={() => navigation.navigate('Search Update', {item})}>
                                                <Ionicons name='pencil-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                            :
                                            undefined
                                        }
                                        {
                                        stackRole === 'Manager' ? 
                                            <TouchableOpacity style={[Style.actionButton, Style.actionDelete]} onPress={() => showModal(item, 'Items')}>
                                                <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                            :
                                            undefined
                                        }
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <Text style={[Style.searchEnd, Style.italicText]}>End of Results</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}