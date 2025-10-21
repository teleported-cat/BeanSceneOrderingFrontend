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

                    {/* Details Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Details</Text>
                    </View>

                    {/* Details Form */}
                    <View>

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