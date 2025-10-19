{/* Components */}
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import BackButton from '../../components/BackButton.js';
import ImageFallback from '../../components/ImageFallback.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemView({props, route, navigation}) {
    const itemObject = route.params.item;

    const dietType = () => {
        if (itemObject.dietType === "neither") {
            return "Contains Meat";
        }
        if (itemObject.dietType === "vegetarian") {
            return "Vegetarian";
        }
        if (itemObject.dietType === "vegan") {
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
                    <BackButton />
                    
                    {/* Name Card */}
                    <View style={Style.viewItemCard}>
                        <View style={Style.viewItemImageBox}>
                            <ImageFallback style={Style.viewItemImage} source={`../../assets/food_images/${itemObject.imagePath}`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                        </View>
                        <View style={Style.itemInfo}>
                            <Text style={[Style.viewItemDetailText, Style.regularText]}>{itemObject.name}</Text>
                            <Text style={[Style.viewItemDetailText, Style.regularText, Style.viewItemCategoryText]}>{itemObject.categoryName}</Text>
                            <Text style={[Style.viewItemDetailText, Style.boldText]}>${itemObject.price.toFixed(2)}</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={[Style.italicText, Style.viewItemDescription]}>{itemObject.description}</Text>

                    {/* Misc Details */}
                    <View style={Style.viewItemMiscBox}>
                        <Text style={[Style.viewItemMiscText, itemObject.available ? Style.viewItemMiscAvailable : Style.viewItemMiscUnavailable, Style.regularText]}>{itemObject.available ? "Available" : "Unavailable"}</Text>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>{itemObject.glutenFree ? "Gluten Free" : "Contains Gluten"}</Text>
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