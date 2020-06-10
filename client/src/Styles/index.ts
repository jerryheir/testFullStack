import { StyleSheet } from "react-native";
import { colors } from "./Colors";

export const styles = StyleSheet.create({
    buttonView: {
        height: 50,
        width: 250,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginTop: 11
    },
    buttonText: {
        fontSize: 24,
        fontFamily: 'Muli',
        color: colors.white
    },
    inputStyle: {
        fontSize: 14,
        fontFamily: 'Muli',
        backgroundColor: colors.transparent,
        borderBottomWidth: 1,
        color: colors.black,
        height: 50,
        width: 250,
        paddingBottom: 3
    },
    listContainer: {
        height: 150,
        width: 220,
        padding: 8,
        borderRadius: 5,
        marginVertical: 5,
        justifyContent: 'space-between',
        marginRight: 15,
        borderColor: colors.lightGray,
        borderWidth: 2,
    },
    listText: {
        fontSize: 12,
        fontFamily: 'Muli',
        color: colors.darkGray
    },
    rowSpaceBetween: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    closeIcon: { 
        height: 20, 
        width: 20 
    },
    listStatusView: {
        backgroundColor: colors.lightGray,
        height: 40, 
        width: 120,
        borderRadius: 5,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        paddingTop: 30,
    },
    text: {
        fontSize: 28,
        fontFamily: 'Muli',
        color: colors.darkGray
    },
    otherText: {
        fontSize: 16,
        fontFamily: 'Muli',
        color: colors.darkGray
    },
    logo: { 
        height: 60, 
        width: 60 
    },
    loadingScreen: {
        backgroundColor: 'rgba(0,0,0,.5)',
        position: 'absolute',
        left: 0, top: 0, bottom: 0, right: 0,
        zIndex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    innerLoadingScreen: { 
        backgroundColor: colors.white, 
        height: 100, 
        width: 100, 
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainListRowView: { 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%', 
        alignSelf: 'center' 
    }
})