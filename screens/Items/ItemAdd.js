{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';
import { Ionicons } from '@expo/vector-icons';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function ItemAdd({props, navigation}) {
    return(
        <SafeAreaView style={[Style.center, Style.scrollView]}>
            {/* Auth Header */}
            <AuthHeader/>
            <ScrollView contentContainerStyle={[Style.topCenter, Style.scrollView]}>
                <View style={Style.pageContent}>
                    {/* Back Button */}
                    <View>
                        <TouchableOpacity style={Style.backButton} onPress={() => navigation.navigate('Item List')}>
                            <Ionicons name='arrow-back-outline' size={24} color='white'></Ionicons>
                            <Text style={[Style.backButtonText, Style.boldText]}>Back</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Form Header */}
                    <View style={Style.listHeader}>
                        <Text style={[Style.listHeaderText, Style.boldText]}>Create New Menu Item</Text>
                    </View>

                    {/* Form */}
                    <View>
                        
                    </View>

                    {/* Form Button Box */}
                    <View>
                        
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}