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

export default function OrderList({props, navigation}) {
    //#region GET method
    const [orderData, setOrderData] = useState([]);

    const isFocused = useIsFocused();

    const getOrders = async () => {
        var url = API_BASE_URL + "/Orders";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header,
        };

        try {
            const response = await fetch(url, options);
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.log("GET Orders failed: " + error.message);
        }
    };

    useEffect(() => {
        if (isFocused) {
            getOrders();
        }
    }, [props, isFocused])
    //#endregion
    //#region Status
    const [editOrderId, setEditOrderId] = useState(null);
    const [editOrderStatus, setEditOrderStatus] = useState('');

    const updateOrderStatus = async (orderId, newStatus) => {
        var url = `${API_BASE_URL}/Orders/${orderId}/Status`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "PUT",
            headers: header,
            body: JSON.stringify(newStatus)
        };

        try {
            const response = await fetch(url, options);
        } catch(error) {
            console.log("PUT Order failed: " + error.message);
        }
    };
    //#endregion

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Add Order Button */}
                    <View style={[Style.listAddBox, Style.orderAddBox]}>
                        <TouchableOpacity style={Style.listAdd}>
                            <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                            <Text style={[Style.listAddText, Style.regularText]}>Add New Order</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Order Header */}
                    <View style={[Style.listHeader, Style.orderHeader]}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Table/Name</Text>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Date/Time</Text>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Status</Text>
                    </View>

                    {/* Order List */}
                    <View style={Style.listBox}>
                        {orderData.map((item, index) => {
                            let buttonStyle;
                            switch (item.status) {
                                case 'Completed':
                                    buttonStyle = Style.orderStatusCompleted;
                                    break;
                                case 'In Progress':
                                    buttonStyle = Style.orderStatusInProgress;
                                    break;
                                case 'Pending':
                                    buttonStyle = Style.orderStatusInProgress;
                                    break;
                                case 'Cancelled':
                                    buttonStyle = Style.orderStatusCancelled;
                                    break;
                                default:
                                    buttonStyle = Style.orderStatusInProgress;
                                    break;
                            }

                            const date = new Date(item.dateTime);
                            const monthString = (date.getMonth() + 1) < 10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1);
                            const minuteString = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
                            const twelveHour = date.getHours() >= 12 ? "PM" : "AM";
                            const weekday = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

                            const isEditable = editOrderId === item._id;
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <View style={Style.itemInfo}>
                                        <Text style={[Style.itemText, Style.italicText]}>{item.tableNo}</Text>
                                        <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{item.name}</Text>
                                    </View>
                                    <View style={[Style.orderDateBox]}>
                                        <Text style={[Style.itemText, Style.italicText]}>{weekday[date.getDay()]} {date.getDate()}/{monthString}/{date.getFullYear()}</Text>
                                        <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{date.getHours() % 12 ? date.getHours() % 12 : '12'}:{minuteString} {twelveHour}</Text>
                                    </View>
                                    {isEditable ? (
                                        <View style={Style.listActions}>
                                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} selectedValue={editOrderStatus} onValueChange={(itemValue) => setEditOrderStatus(itemValue)}>
                                                <Picker.Item label='Pending' value='Pending'></Picker.Item>
                                                <Picker.Item label='In Progress' value='In Progress'></Picker.Item>
                                                <Picker.Item label='Completed' value='Completed'></Picker.Item>
                                                <Picker.Item label='Cancelled' value='Cancelled'></Picker.Item>
                                            </Picker>
                                            <TouchableOpacity style={[Style.actionButton, Style.actionView]} onPress={() => {
                                                updateOrderStatus(item._id, editOrderStatus);
                                                item.status = editOrderStatus;
                                                setEditOrderId(null);
                                            }}>
                                                <Ionicons name='save-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[Style.actionButton, Style.actionClose]} onPress={() => {
                                                setEditOrderId(null);
                                                setEditOrderStatus('');
                                            }}>
                                                <Ionicons name='close-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                        </View>
                                    ) : (
                                        <View style={Style.listActions}>
                                            <TouchableOpacity style={[Style.actionButton, Style.actionView]} onPress={() => navigation.navigate('Order View', {item})}>
                                                <Ionicons name='eye-outline' size={20} color='white'></Ionicons>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={[Style.orderStatusButton, buttonStyle]} onPress={() => {
                                                setEditOrderId(item._id);
                                                setEditOrderStatus(item.status);
                                            }}>
                                                <Text style={[Style.orderStatusText, Style.boldText]}>{item.status}</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) }
                                </View>
                            );
                        })}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}