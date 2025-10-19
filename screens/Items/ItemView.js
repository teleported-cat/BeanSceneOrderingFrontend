{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import BackButton from '../../components/BackButton.js';
import ImageFallback from '../../components/ImageFallback.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemView() {
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
                            <ImageFallback style={Style.viewItemImage} source={`../../assets/food_images/item-placeholder.png`} fallbackSource={`../../assets/food_images/item-fallback.png`} resizeMode='contain' />
                        </View>
                        <View style={Style.itemInfo}>
                            <Text style={[Style.viewItemDetailText, Style.regularText]}>Item Name</Text>
                            <Text style={[Style.viewItemDetailText, Style.regularText, Style.viewItemCategoryText]}>Item Category</Text>
                            <Text style={[Style.viewItemDetailText, Style.boldText]}>$00.00</Text>
                        </View>
                    </View>

                    {/* Description */}
                    <Text style={[Style.italicText, Style.viewItemDescription]}>Espresso made with premium coffee beans, filled with steamed milk with a foamy top.</Text>

                    {/* Misc Details */}
                    <View style={Style.viewItemMiscBox}>
                        <Text style={[Style.viewItemMiscText, Style.viewItemMiscAvailable, Style.regularText]}>Available</Text>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>Gluten Free</Text>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>Vegetarian</Text>
                    </View>

                    {/* Allergens Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Allergens</Text>
                    </View>

                    {/* Allergens */}
                    <View style={Style.viewItemAllergens}>
                        <Text style={[Style.viewItemMiscText, Style.regularText]}>Lactose, item, item</Text>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}