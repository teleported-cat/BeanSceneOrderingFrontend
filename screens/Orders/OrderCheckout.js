{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal, Picker } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import ImageFallback from '../../components/ImageFallback.js';
import { isBlank } from '../../components/PostValidationMethods.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function OrderCheckout({props, route, navigation}) {
    //#region Order Storage
    const transferedOrder = route.params?.order;
    const [itemData, setItemData] = useState([]);

    const [tableNo, setTableNo] = useState('');
    const [name, setName] = useState('');
    const [notes, setNotes] = useState('');
    const [orderItems, setOrderItems] = useState([]);

    const [totalCost, setTotalCost] = useState(0);
    const [message, setMessage] = useState('');
    const [messageStyle, setMessageStyle] = useState(Style.formMessageFailure);

    const isFocused = useIsFocused();

    const validateOrderData = () => {
        if (transferedOrder != null) {
            console.log("OrderCheckout: Got transfered order!");
            setTableNo(transferedOrder.tableno);
            setName(transferedOrder.name);
            setNotes(transferedOrder.notes);
            setOrderItems(transferedOrder.itemids);

            console.log(transferedOrder);
            return;
        }
        console.log("OrderCheckout: No order! That's an error!");
    };

    const constructOrderObject = () => {
        const order = {
            tableno: tableNo,
            name: name,
            notes: notes,
            itemids: orderItems,
        };
        return order;
    };

    const prepareOrderObject = () => {
        const date = new Date();
        const order = {
            tableno: tableNo,
            name: name,
            status: 'Pending',
            notes: notes,
            datetime: date.toISOString(),
            itemids: orderItems,
        };
        console.log(order);
        return order;
    };

    const backToItemList = () => {
        const order = constructOrderObject();
        navigation.navigate('Order New', {order});
    };

    const calculateCost = () => {
        // get total cost of items here!
        console.log("cost calculation begin");
        console.log(itemData);
        console.log(orderItems);
        if (itemData.length == 0) {return;}
        if (orderItems.length == 0) {
            setTotalCost(0);
            return;
        }
        let totalCost = 0;
        orderItems.forEach(i => {
            console.log(i);
            console.log(itemData.find(d => d._id == i._id));
            const iPrice = itemData.find(d => d._id == i._id).price;
            totalCost += i.quantity * iPrice;
        });
        console.log("cost calculation end: " + totalCost);
        setTotalCost(totalCost);
    };

    const removeItemFromOrder = (removeId) => {
        const newOrderItem = orderItems.filter(i => i._id !== removeId);
        setOrderItems(newOrderItem);
    };

    const postOrder = async () => {
        // Validate order
        if (orderItems.length == 0) {
            setMessage("Add some items to order!");
            setMessageStyle(Style.formMessageFailure);
            return;
        }
        
        if (isBlank(name)) {
            setMessage("Name is required.");
            setMessageStyle(Style.formMessageFailure);
            return;
        }

        if (isBlank(tableNo)) {
            setMessage("Table number is required.");
            setMessageStyle(Style.formMessageFailure);
            return;
        }

        const order = prepareOrderObject();

        // Begin request
        var url = `${API_BASE_URL}/Orders/`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "POST",
            headers: header,
            body: JSON.stringify(order)
        };

        try {
            const response = await fetch(url, options);
            setMessageStyle(Style.formMessageSuccess);
            setMessage("Order placed successfully!");
        } catch(error) {
            console.log("POST Order failed: " + error.message);
            setMessageStyle(Style.formMessageFailure);
            setMessage("Something went wrong, try again.");
        }
    };

    useEffect(() => {
        if (isFocused) {
            getItems();
            validateOrderData();
        }
    }, [props, isFocused])

    useEffect(() => {
        calculateCost();
    }, [itemData, orderItems])
    //#endregion

    const tableCodes = [
        'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
        'O1','O2','O3','O4','O5','O6','O7','O8','O9','O10',
        'B1','B2','B3','B4','B5','B6','B7','B8','B9','B10',
    ];

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

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Cancel Order Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => backToItemList()}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Back to Items</Text>
                        </TouchableOpacity>
                        <View style={Style.invisibleFill}></View>
                    </View>

                    {/* Checkout Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Checkout</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {itemData.map((item, index) => {
                            if (!orderItems.map(i => i._id).includes(item._id)) {
                                return;
                            }
                            const quantity = orderItems.find(i => i._id === item._id)?.quantity ?? 0;
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
                                    <View style={Style.itemQuantity}>
                                        <Text style={[Style.itemQuantityText, Style.boldText]}>Quantity:</Text>
                                        <Text style={[Style.itemQuantityText, Style.regularText]}>{quantity}</Text>
                                    </View>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={Style.orderRemoveButton} onPress={() => {removeItemFromOrder(item._id); calculateCost();}}>
                                            <Ionicons name='remove-outline' size={20} color='white'></Ionicons>
                                            <Text style={[Style.listAddText, Style.regularText]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.orderTotalPrice}>
                            <Text style={[Style.orderPriceText, Style.boldText]}>Total Price: </Text>
                            <Text style={[Style.orderPriceText, Style.regularText]}>${totalCost.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Details Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Details</Text>
                    </View>

                    {/* Details Form */}
                    <View style={Style.formBox}>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Name</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(name) => setName(name)} defaultValue={name}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Table</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]} onValueChange={(table) => setTableNo(table)} selectedValue={tableNo}>
                                    <Picker.Item label='Select table...' value=''></Picker.Item>
                                    {tableCodes.map((item, index) => {
                                        return (
                                            <Picker.Item key={index} label={item} value={item}></Picker.Item>
                                        );
                                    })}
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Notes</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]} onChangeText={(notes) => setNotes(notes)} defaultValue={notes}></TextInput>
                        </View>
                    </View>

                    {/* Form Button */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton} onPress={() => postOrder()}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Place Order</Text>
                            <Ionicons name='checkmark-circle-outline' size={24} color='white'></Ionicons>
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