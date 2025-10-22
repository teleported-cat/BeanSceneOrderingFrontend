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

export default function OrderCheckout({props, route, navigation}) {
    const tableCodes = [
        'M1','M2','M3','M4','M5','M6','M7','M8','M9','M10',
        'O1','O2','O3','O4','O5','O6','O7','O8','O9','O10',
        'B1','B2','B3','B4','B5','B6','B7','B8','B9','B10',
    ];

    const [itemData, setItemData] = useState([
        {
            _id: '1',
            name: 'Example',
            price: 0,
            categoryName: 'Example',
            imagePath: 'item-placeholder.png',
            quantity: 3,
        },
    ]);
    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Cancel Order Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Order New')}>
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
                                        <Text style={[Style.itemQuantityText, Style.regularText]}>{item.quantity}</Text>
                                    </View>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={Style.orderRemoveButton}>
                                            <Ionicons name='remove-outline' size={20} color='white'></Ionicons>
                                            <Text style={[Style.listAddText, Style.regularText]}>Remove</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.orderTotalPrice}>
                            <Text style={[Style.orderPriceText, Style.boldText]}>Total Price: </Text>
                            <Text style={[Style.orderPriceText, Style.regularText]}>$00.00</Text>
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
                                <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Table</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
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
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                    </View>

                    {/* Form Button */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Place Order</Text>
                            <Ionicons name='checkmark-circle-outline' size={24} color='white'></Ionicons>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}