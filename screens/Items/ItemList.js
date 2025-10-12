{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AuthHeader from '../../components/AuthHeader.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemList() {
    
    // Placeholder data for map function
    const itemData = [
        {
            _id: '1',
            name: 'Placeholder 1',
            imagepath: 'item-placeholder.png',
            price: 27.00,
            categoryname: 'Main',
        },
        {
            _id: '2',
            name: 'Placeholder 2',
            imagepath: 'item-placeholder.png',
            price: 42.00,
            categoryname: 'Entree',
        },
        {
            _id: '3',
            name: 'Placeholder 3',
            imagepath: 'item-placeholder.png',
            price: 3.00,
            categoryname: 'Drinks',
        },
        {
            _id: '4',
            name: 'Placeholder 4',
            imagepath: 'item-placeholder.png',
            price: 10.50,
            categoryname: 'Dessert',
        },
        {
            _id: '5',
            name: 'Placeholder 5',
            imagepath: 'item-placeholder.png',
            price: 1,
            categoryname: 'Main',
        },
        {
            _id: '6',
            name: 'Placeholder 6',
            imagepath: 'item-placeholder.png',
            price: 1,
            categoryname: 'Main',
        },
        {
            _id: '7',
            name: 'Placeholder 7',
            imagepath: 'item-placeholder.png',
            price: 1,
            categoryname: 'Main',
        },
    ];
    const categoryData = [
        {
            name: 'Entree',
        },
        {
            name: 'Main',
        },
        {
            name: 'Dessert',
        },
        {
            name: 'Drinks',
        },
        {
            name: 'Sides',
        },
        {
            name: 'Specials',
        },
    ];

    return(
        <SafeAreaView style={[Style.center, Style.scrollView]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={Style.topCenter}>
                <View style={Style.pageContent}>
                    {/* Item Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Items</Text>
                    </View>

                    {/* Item List */}
                    <View style={Style.listBox}>
                        {itemData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <View style={Style.itemDetails}>
                                        <View style={Style.itemImageBox}>
                                            <Image style={Style.itemImage} source={`../../assets/food_images/${item.imagepath}`} resizeMode='contain'></Image>
                                        </View>
                                        <View style={Style.itemInfo}>
                                            <Text style={[Style.itemText, Style.regularText]}>{item.name}</Text>
                                            <Text style={[Style.itemText, Style.itemCategoryText, Style.regularText]}>{item.categoryname}</Text>
                                            <Text style={[Style.itemText, Style.boldText]}>${item.price}</Text>
                                        </View>
                                    </View>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionView]}>
                                            <Ionicons name='eye-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionEdit]}>
                                            <Ionicons name='pencil-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionDelete]}>
                                            <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <TouchableOpacity style={Style.listAdd}>
                                <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                                <Text style={[Style.listAddText, Style.regularText]}>Add New Item</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Category Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Categories</Text>
                    </View>

                    {/* Category List */}
                    <View style={Style.listBox}>
                        {categoryData.map((item, index) => {
                            return (
                                <View key={index} style={Style.itemContainer}>
                                    <Text style={[Style.categoryText, Style.regularText]}>{item.name}</Text>
                                    <View style={Style.listActions}>
                                        <TouchableOpacity style={[Style.actionButton, Style.actionDelete]}>
                                            <Ionicons name='trash-outline' size={20} color='white'></Ionicons>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                        <View style={Style.listAddBox}>
                            <TouchableOpacity style={Style.listAdd}>
                                <Ionicons name='add-circle-outline' size={20} color='white'></Ionicons>
                                <Text style={[Style.listAddText, Style.regularText]}>Add New Category</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}