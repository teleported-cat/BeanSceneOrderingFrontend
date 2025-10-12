import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//#region Palette
const white = '#fff';
const black = '#000';
const darkBlue = '#083944';
const midBlue = '#2F6672';
const lightBlue = '#4AA1B5';
const gold = '#EBC136';
const paleGold = '#F8E8B5';
const darkGold = '#CC9E09';
const lightGrey = '#E0E0E0';
const darkGrey = '#808080';
const danger = '#FF3030';
//#endregion
//#region Constants
const cLoginBackground = darkBlue;
const cTextInputBorder = lightBlue;
const cButtonBackground = lightBlue;
const cTabHeaderBackground = lightBlue;
const cTabHeaderBorder = gold;
//#endregion

export default StyleSheet.create({
    //#region General
    row: {
        flexDirection: 'row',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    topCenter: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    regularText: {
        fontFamily: 'OpenSans_400Regular',
    },
    italicText: {
        fontFamily: 'OpenSans_400Regular_Italic',
    },
    boldText: {
        fontFamily: 'OpenSans_700Bold',
    },
    //#endregion
    //#region Login
    loginBackground: {
        backgroundColor: cLoginBackground,
    },
    loginLogoBox: {
        gap: 10,
    },
    loginImage: {
        width: wp('100%'),
        maxWidth: 412,
        maxHeight: 149,
    },
    loginTitle: {
        fontSize: 32,
        color: white,
    },
    loginMessageBox: {
        paddingBottom: 10,
    },
    loginMessageText: {
        color: danger,
        fontSize: 24,
    },
    loginFormBox: {
        width: wp('80%'),
        gap: 12,
    },
    loginInput: {
        width: wp('80%'),
        backgroundColor: white,
        borderColor: cTextInputBorder,
        borderWidth: 3,
        borderRadius: 5,
        padding: 10,
        fontSize: 24,
        color: darkGrey,
    },
    loginButton: {
        width: wp('80%'),
        backgroundColor: cButtonBackground,
        padding: 10,
        borderRadius: 5,
    },
    loginButtonText: {
        fontSize: 24,
        color: white,
        textAlign: 'center',
    },
    //#endregion
    //#region Tab Bar
    tabBar: {
        //height: hp("9%"),
        height: 60,
    },
    tabBarLabel: {
        fontSize: 16,
    },
    tabHeader: {
        backgroundColor: cTabHeaderBackground,
        borderBottomColor: cTabHeaderBorder,
        height: 56,
    },
    tabHeaderLeftText: {
        fontSize: 18,
        fontWeight: 500,
        color: white,
    },
    tabHeaderRightText: {
        fontSize: 18,
        fontWeight: 500,
        color: white,
        marginLeft: 16,
        marginRight: 16,
    },
    //#endregion
});