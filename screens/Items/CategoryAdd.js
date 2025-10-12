{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

{/* Stylesheet */}
import Style from '../../styles/Style.js';

export default function CategoryAdd() {
    return(
        <SafeAreaView style={Style.center}>
            <ScrollView contentContainerStyle={Style.center}>
                <Text>CategoryAdd</Text>
            </ScrollView>
        </SafeAreaView>
    );
}