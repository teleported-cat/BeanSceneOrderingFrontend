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

export default function OrderNew({props, route, navigation}) {
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

    useEffect(() => {
        if (isFocused) {
            getItems();
            getCategories();
        }
    }, [props, isFocused])

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

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>

            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Cancel Order Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Order List')}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Cancel Order</Text>
                        </TouchableOpacity>
                        <View style={Style.invisibleFill}></View>
                    </View>

                    {/* New Order Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Select Items for New Order</Text>
                    </View>

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
                                        <TouchableOpacity style={[Style.actionButton, Style.actionView]}>
                                            <Ionicons name='add-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TextInput style={[Style.orderQuantity, Style.regularText]} defaultValue={0} maxLength={2}></TextInput>
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

            {/* Checkout FAB */}
            <TouchableOpacity style={Style.fab} onPress={() => navigation.navigate('Order Checkout')}>
                <Ionicons name='cart-outline' size={32} color='white'></Ionicons>
                <Text style={[Style.fabText, Style.boldText]}>Checkout</Text>
                <Text style={[Style.fabText, Style.boldText]}>(0)</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}