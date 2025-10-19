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
const success = '#1ec81e';
//#endregion
//#region Constants
const cLoginBackground = darkBlue;
const cTextInputBorder = lightBlue;
const cButtonBackground = lightBlue;
const cTabHeaderBackground = lightBlue;
const cTabHeaderBorder = gold;
const cAuthHeaderBackground = darkBlue;
const cListHeader = darkGrey;
const cActionViewBackground = lightBlue;
const cActionEditBackground = gold;
const cActionDeleteBackground = danger;
const cActionAddBackground = darkGrey;
const cBackButtonBackground = darkGrey;
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
    scrollView: {
        width: '100%',
        
    },
    pageContent: {
        flex: 1,
        width: '100%',
        backgroundColor: white,
        gap: 8,
        padding: 10,
    },
    background: {
        backgroundColor: white,
        width: '100%',
        alignItems: 'stretch',
    },
    //#endregion
    //#region Login
    loginBackground: {
        backgroundColor: cLoginBackground,
        width: '100%',
        alignItems: 'stretch',
    },
    loginLogoBox: {
        gap: 10,
        width: '100%',
    },
    loginImage: {
        width: '100%',
        maxWidth: 412,
        maxHeight: 149,
    },
    loginTitle: {
        fontSize: 32,
        color: white,
        textAlign: 'center',
    },
    loginMessageBox: {
        paddingBottom: 10,
    },
    loginMessageText: {
        color: danger,
        fontSize: 24,
        textAlign: 'center',
    },
    loginFormBox: {
        width: '80%',
        gap: 12,
    },
    loginInput: {
        width: '100%',
        backgroundColor: white,
        borderColor: cTextInputBorder,
        borderWidth: 3,
        borderRadius: 5,
        padding: 10,
        fontSize: 24,
        color: darkGrey,
    },
    loginButton: {
        width: '100%',
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
    //#region Auth
    authHeader: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: cAuthHeaderBackground,
    },
    authText: {
        color: white,
        fontSize: 16,
    },
    authLogout: {
        backgroundColor: white,
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    authLogoutText: {
        color: black,
        fontSize: 16,
    },
    //#endregion
    //#region Lists
    listHeader: {
        borderBottomWidth: 1,
        borderColor: cListHeader,
    },
    listHeaderText: {
        fontSize: 16,
        color: cListHeader,
    },
    listBox: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    listActions: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        padding: 4,
        paddingTop: 3,
        paddingBottom: 2, 
        borderRadius: 5,
    },
    actionView: {
        backgroundColor: cActionViewBackground,
    },
    actionEdit: {
        backgroundColor: cActionEditBackground,
    },
    actionDelete: {
        backgroundColor: cActionDeleteBackground,
    },
    listAddBox: {
        padding: 8,
    },
    listAdd: {
        backgroundColor: cActionAddBackground,
        flexDirection: 'row',
        gap: 10,
        padding: 4,
        borderRadius: 5,
    },
    listAddText: {
        color: white,
        fontSize: 16,
    },
    //#endregion
    //#region Item
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: cListHeader,
        paddingTop: 8,
        paddingBottom: 8,
    },
    itemDetails: {
        flexDirection: 'row',
        gap: 8,
    },
    itemImageBox: {
        overflow: 'hidden',
        width: 64,
        height: 64,
        borderRadius: 5,
    },
    itemImage: {
        width: 64,
        height: 64,
        borderRadius: 5,
    },
    itemInfo: {
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    itemText: {
        fontSize: 16,
    },
    itemCategoryText: {
        color: darkGrey,
    },
    categoryText: {
        fontSize: 16,
    },
    //#endregion
    //#region Data Form
    backButtonBox: {
        flexDirection: 'row',
    },
    backButton: {
        backgroundColor: cBackButtonBackground,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        borderRadius: 5,
        gap: 10,
    },
    backButtonText: {
        color: white,
        fontSize: 16,
    },
    invisibleFill: {
        flex: 1,
        width: '100%',
    },
    formBox: {
        gap: 5,
    },
    formField: {
        flex: 1,
    },
    formFieldText: {
        color: cListHeader,
        fontSize: 16,
    },
    formFieldInput: {
        borderColor: cTextInputBorder,
        borderWidth: 2,
        borderRadius: 5,
        fontSize: 16,
        padding: 5,
        flex: 1,
    },
    formDoubleField: {
        flexDirection: 'row',
        gap: 10,
        flex: 1,
    },
    formButtonBox: {
        paddingTop: 10,
        paddingBottom: 10,
        borderTopWidth: 1,
        borderColor: cListHeader,
    },
    formButton: {
        backgroundColor: cButtonBackground,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        gap: 5,
        borderRadius: 5,
    },
    formButtonText: {
        fontSize: 16,
        color: white,
    },
    formFieldPicker: {
        backgroundColor: white,
        borderStyle: 'solid',
        textAlign: 'center',
    },
    formMessageBox: {
        alignItems: 'center',
    },
    formMessage: {
        fontSize: 24,
        textAlign: 'center',
    },
    formMessageSuccess: {
        color: success,
    },
    formMessageFailure: {
        color: danger,
    },
    //#endregion
    //#region View Item
    viewItemCard: {
        flexDirection: 'row',
        padding: 10,
        gap: 10,
        borderBottomWidth: 1,
        borderColor: cListHeader,
    },
    viewItemImageBox: {
        overflow: 'hidden',
        width: 128,
        height: 128,
        borderRadius: 5,
    },
    viewItemImage: {
        width: 128,
        height: 128,
        borderRadius: 5,
    },
    viewItemDetailText: {
        fontSize: 24,
    },
    viewItemCategoryText: {
        color: cListHeader,
    },
    viewItemDescription: {
        fontSize: 20,
        textAlign: 'center',
    },
    viewItemMiscBox: {
        padding: 10,
        gap: 10,
        borderTopWidth: 1,
        borderColor: cListHeader,
    },
    viewItemMiscText: {
        fontSize: 20,
    },
    viewItemMiscAvailable: {
        color: success,
    },
    viewItemMiscUnavailable: {
        color: danger,
    },
    viewItemAllergens: {
        padingRight: 10,
        paddingLeft: 10,
    },
    //#endregion
});