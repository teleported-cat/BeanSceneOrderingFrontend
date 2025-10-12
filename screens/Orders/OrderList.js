{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AuthHeader from '../../components/AuthHeader.js';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function OrderList() {
    return(
        <SafeAreaView style={Style.center}>
            <ScrollView contentContainerStyle={Style.topCenter}>
                {/* Auth Header */}
                <AuthHeader/>

                <Text>OrderList</Text>
            </ScrollView>
        </SafeAreaView>
    );
}