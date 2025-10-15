{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity, Picker } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import { Ionicons } from '@expo/vector-icons';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemAdd({props, navigation}) {
    return(
        <SafeAreaView style={[Style.center, Style.background]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Back Button */}
                    <View style={Style.backButtonBox}>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Item List')}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Back</Text>
                        </TouchableOpacity>
                        <View style={Style.invisibleFill}></View>
                    </View>

                    {/* Form Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Create New Menu Item</Text>
                    </View>

                    {/* Form */}
                    <View style={Style.formBox}>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Name</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Description</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Image Path</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Price</Text>
                                <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Available?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select availability...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formDoubleField}>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Gluten Free?</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select gluten...' value=''></Picker.Item>
                                    <Picker.Item label='Yes' value='true'></Picker.Item>
                                    <Picker.Item label='No' value='false'></Picker.Item>
                                </Picker>
                            </View>
                            <View style={Style.formField}>
                                <Text style={[Style.formFieldText, Style.regularText]}>Diet Type</Text>
                                <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select diet...' value=''></Picker.Item>
                                    <Picker.Item label='Neither' value='neither'></Picker.Item>
                                    <Picker.Item label='Vegetarian' value='vegetarian'></Picker.Item>
                                    <Picker.Item label='Vegan' value='vegan'></Picker.Item>
                                </Picker>
                            </View>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Allergens</Text>
                            <TextInput style={[Style.formFieldInput, Style.regularText]}></TextInput>
                        </View>
                        <View style={Style.formField}>
                            <Text style={[Style.formFieldText, Style.regularText]}>Category</Text>
                            <Picker style={[Style.formFieldInput, Style.formFieldPicker, Style.regularText]}>
                                    <Picker.Item label='Select category...' value=''></Picker.Item>
                                    {/* TODO: map function for category data goes here */}
                                </Picker>
                        </View>
                    </View>

                    {/* Form Button Box */}
                    <View style={Style.formButtonBox}>
                        <TouchableOpacity style={Style.formButton}>
                            <Text style={[Style.formButtonText, Style.boldText]}>Create Item</Text>
                            <Ionicons name='add-circle-outline' size={24} color='white'></Ionicons>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}