{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import BackButton from '../../components/BackButton.js';
import ImageFallback from '../../components/ImageFallback.js';
import { Ionicons } from '@expo/vector-icons';
import { API_BASE_URL } from '../../components/APIAddress.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function OrderView({props, route, navigation}) {
    const orderObject = route.params.item;

    const date = new Date(orderObject.datetime);
    const monthString = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
    const minuteString = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const twelveHour = date.getHours() >= 12 ? "PM" : "AM";
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const [itemData, setItemData] = useState([]);

    const isFocused = useIsFocused();

    const getItems = async () => {
        var url = `${API_BASE_URL}/Orders/${orderObject._id}/Items`;
        var header = new Headers({});

        // Get user details for auth
        const rawUser = await AsyncStorage.getItem('CurrentUser');
        const authUser = JSON.parse(rawUser); 
        header.append('Authorization', 'Basic ' + btoa(`${authUser.username}:${authUser.password}`));

        var options = {
            method: "GET",
            headers: header,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            console.log(data);
            setItemData(data);
        } catch (error) {
            console.log("GET Items failed: " + error.message);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getItems();
        }
    }, [props, isFocused])

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Back Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Order List')}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Back</Text>
                        </TouchableOpacity>
                        <View style={Style.invisibleFill}></View>
                    </View>

                    {/* View Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>View Order</Text>
                    </View>
                    
                    {/* Order Details */}
                    <View style={Style.orderViewDetails}>
                        <View style={Style.orderViewInfo}>
                            <Text style={[Style.orderViewLabel, Style.boldText]}>Table No.</Text>
                            <Text style={[Style.orderViewText, Style.regularText]}>{orderObject.tableno}</Text>
                        </View>
                        <View style={Style.orderViewInfo}>
                            <Text style={[Style.orderViewLabel, Style.boldText]}>Order Name</Text>
                            <Text style={[Style.orderViewText, Style.regularText]}>{orderObject.name}</Text>
                        </View>
                        <View style={Style.orderViewInfo}>
                            <Text style={[Style.orderViewLabel, Style.boldText]}>Status</Text>
                            <Text style={[Style.orderViewText, Style.regularText]}>{orderObject.status}</Text>
                        </View>
                    </View>
                    <View style={Style.orderViewDate}>
                        <View style={Style.orderViewInfo}>
                            <Text style={[Style.orderViewLabel, Style.boldText]}>Order Time</Text>
                            <Text style={[Style.orderViewText, Style.regularText]}>{date.getHours() % 12 ? date.getHours() % 12 : '12'}:{minuteString} {twelveHour}</Text>
                            <Text style={[Style.orderViewText, Style.itemCategoryText, Style.regularText]}>{weekday[date.getDay()]} {date.getDate()}/{monthString}/{date.getFullYear()}</Text>
                        </View>
                    </View>

                    {/* Notes Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Notes</Text>
                    </View>

                    {/* Notes Box */}
                    <View style={Style.orderViewNoteBox}>
                        <Text style={[Style.orderViewNote, Style.regularText]}>{orderObject.notes ? orderObject.notes : "<No Notes>"}</Text>
                    </View>

                    {/* Items Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Items</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {itemData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    {item.invalid ? (
                                        <View style={Style.itemDetails}>
                                            <View style={Style.itemImageBox}>
                                                <ImageFallback style={Style.itemImage} source={`../../assets/food_images/item-deleted.png`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                                            </View>
                                            <View style={Style.itemInfo}>
                                                <Text style={[Style.itemText, Style.deletedItem, Style.italicText]}>Deleted Item</Text>
                                            </View>
                                        </View>
                                    ) : (
                                        <View style={Style.itemDetails}>
                                            <View style={Style.itemImageBox}>
                                                <ImageFallback style={Style.itemImage} source={`../../assets/food_images/${item.imagepath}`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                                            </View>
                                            <View style={Style.itemInfo}>
                                                <Text style={[Style.itemText, Style.regularText]}>{item.name}</Text>
                                                <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{item.categoryname}</Text>
                                                <Text style={[Style.itemText, Style.boldText]}>${item.price.$numberDecimal ? Number(item.price.$numberDecimal).toFixed(2) : Number(item.price).toFixed(2)}</Text>
                                            </View>
                                        </View>
                                    )}
                                    <View style={Style.itemQuantity}>
                                        <Text style={[Style.itemQuantityText, Style.boldText]}>Quantity:</Text>
                                        <Text style={[Style.itemQuantityText, Style.regularText]}>{item.quantity}</Text>
                                    </View>
                                    {item.invalid ? (
                                        <View style={Style.listActions}></View>
                                    ) : (
                                        <View style={Style.listActions}>
                                            <TouchableOpacity style={[Style.actionButton, Style.actionView]} onPress={() => navigation.navigate('View Item', {item, orderObject})}>
                                                <Ionicons name='eye-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    
                                </View>
                            );
                        })}
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}