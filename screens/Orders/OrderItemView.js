{/* Components */}
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import BackButton from '../../components/BackButton.js';
import ImageFallback from '../../components/ImageFallback.js';
import { Ionicons } from '@expo/vector-icons';
import { useNavigationState } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function OrderItemView({props, route, navigation}) {
    const itemObject = route.params.item;
    const item = route.params.orderObject;
    console.log(itemObject);
    console.log(item);

    const dietType = () => {
        if (itemObject.diettype === "neither") {
            return "Contains Meat";
        }
        if (itemObject.diettype === "vegetarian") {
            return "Vegetarian";
        }
        if (itemObject.diettype === "vegan") {
            return "Vegan";
        }
    };

    const allergens = () => {
        if (itemObject.hasOwnProperty("allergens")) {
            if (itemObject.allergens.length > 0) {
                return itemObject.allergens;
            }
        }
        return "None";
    };

    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Back Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Order View', {item})}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Back</Text>
                        </TouchableOpacity>
                        <View style={Style.invisibleFill}></View>
                    </View>
                    
                    {/* Name Card */}
                    <View style={Style.viewItemCard}>
                        <View style={Style.viewItemImageBox}>
                            <ImageFallback style={Style.viewItemImage} source={`../../assets/food_images/${itemObject.imagepath}`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                        </View>
                        <View style={Style.itemInfo}>
                            <Text style={[Style.viewItemDetailText, Style.regularText]}>{itemObject.name}</Text>
                            <Text style={[Style.viewItemDetailText, Style.regularText, Style.viewItemCategoryText]}>{itemObject.categoryname}</Text>
                            <Text style={[Style.viewItemDetailText, Style.boldText]}>${itemObject.price.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={[Style.italicText, Style.viewItemDescription]}>{itemObject.description}</Text>

                    {/* Misc Details */}
                    <View style={Style.viewItemMiscBox}>
                        <Text style={[Style.viewItemMiscText, itemObject.available ? Style.viewItemMiscAvailable : Style.viewItemMiscUnavailable, Style.regularText]}>{itemObject.available ? "Available" : "Unavailable"}</Text>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>{itemObject.glutenfree ? "Gluten Free" : "Contains Gluten"}</Text>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>{dietType()}</Text>
                    </View>

                    {/* Allergens Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Allergens</Text>
                    </View>

                    {/* Allergens */}
                    <View style={Style.viewItemAllergens}>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>{allergens()}</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}