{/* Components */}
import React, {useEffect, useState} from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';
import { API_BASE_URL } from '../../components/APIAddress.js';
import useNetworkStatus from '../../components/useNetworkStatus.js';
import OfflineToast from '../../components/OfflineToast.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function StaffList({props, navigation}) {
    const isOffline = useNetworkStatus();
    //#region GET Staff
    const [staffData, setStaffData] = useState([]);

    const isFocused = useIsFocused();
    
    const getStaff = async () => {
        // Get from async storage
        if (isOffline) {
            const storageData = await AsyncStorage.getItem('StaffCollection');
            if (storageData !== null) {
                const parsedData = JSON.parse(storageData);
                setStaffData(parsedData);
            } else {
                console.log("Async-Storage Error: No stored collection!")
            }
            return;
        }

        var url = API_BASE_URL + "/Staff";
        var header = new Headers({});
        var options = {
            method: "GET",
            headers: header,
        };

        let data;

        try {
            const response = await fetch(url, options);
            data = await response.json();
            setStaffData(data);
        } catch (error) {
            console.log("GET Staff failed: " + error.message);
        }

        // Set async storage
        try {
            await AsyncStorage.setItem('StaffCollection', JSON.stringify(data));
        } catch (error) {
            console.log("Async-Storage Error: " + error);
        }
    };

    useEffect(() => {
        if (isFocused && isOffline !== null) {
            getStaff();
        }
    }, [props, isFocused, isOffline])
    //#endregion
    //#region DELETE methods
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedStaff, setSelectedStaff] = useState({});

    const showModal = (staff) => {
        setSelectedStaff(staff);
        setModalVisible(true);
    };

    const hideModal = () => {
        setModalVisible(false);
        setSelectedStaff({});
    };

    const confirmDelete = async () => {
        var url = `${API_BASE_URL}/Staff/${selectedStaff._id}`;
        var header = new Headers({});
        header.append('Content-Type', "application/json");
        var options = {
            method: "DELETE",
            headers: header
        };

        try {
            const response = await fetch(url, options);
            console.log("Staff deleted!");
            hideModal();
            getStaff();
        } catch(error) {
            console.log("DELETE Staff failed: " + error.message);
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
                        <Text style={[Style.modalMessage, Style.regularText]}>Are you sure you want to delete {selectedStaff.firstName} {selectedStaff.lastName}?</Text>
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
                        <Text style={[Style.listHeaderText, Style.boldText]}>Staff Accounts</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {staffData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <View style={Style.itemDetails}>
                                        <View style={Style.itemInfo}>
                                            <Text style={[Style.itemText, Style.regularText]}>{item.firstName} {item.lastName}</Text>
                                            <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{item.role}</Text>
                                        </View>
                                    </View>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionEdit]} onPress={() => {
                                            if (isOffline) {return;}
                                            navigation.navigate('Update Staff', {item});
                                        }}>
                                            <Ionicons name='pencil-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionDelete]} onPress={() => {
                                            if (isOffline) {return;}
                                            showModal(item);
                                        }}>
                                            <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <TouchableOpacity style={Style.listAdd} onPress={() => {
                                if (isOffline) {return;}
                                navigation.navigate('Add Staff');
                            }}>
                                <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                                <Text style={[Style.listAddText, Style.regularText]}>Add New Account</Text>
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