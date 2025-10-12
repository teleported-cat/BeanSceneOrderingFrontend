{/* Components */}
import { StyleSheet, Text, View, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

{/* Stylesheet */}
import Style from '../styles/Style.js';

export default function Login({route, navigation}) {

    const loginManager = () => {
        navigation.navigate('Manager Dashboard');
    };

    const loginStaff = () => {
        navigation.navigate('Staff Dashboard');
    };

    return (
        <SafeAreaView style={[Style.center, Style.loginBackground]}>
            <ScrollView contentContainerStyle={Style.center}>
                {/* Logo Box */}
                <View style={[Style.loginLogoBox, Style.center]}>
                    <Image style={Style.loginImage} source={require('../assets/brand_materials/logo/png/logo-secondary-transparent.png')} resizeMode='contain'></Image>
                    <Text style={[Style.loginTitle, Style.boldText]}>Ordering System</Text>
                </View>

                {/* Message Box */}
                <View style={Style.loginMessageBox}>
                    <Text style={[Style.loginMessageText, Style.italicText]}>Test Message!</Text>
                </View>

                {/* Form Box */}
                <View style={[Style.loginFormBox, Style.topCenter]}>
                    <TextInput style={[Style.loginInput, Style.regularText]} placeholder='Username'></TextInput>
                    <TextInput style={[Style.loginInput, Style.regularText]} placeholder='Password'></TextInput>
                    <TouchableOpacity style={[Style.loginButton]} onPress={loginManager}>
                        <Text style={[Style.loginButtonText, Style.boldText]}>Login Manager</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[Style.loginButton]} onPress={loginStaff}>
                        <Text style={[Style.loginButtonText, Style.boldText]}>Login Staff</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}