import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
        paddingHorizontal: 10,
    },
    row: {
        flexDirection: "row",
        gap: 10,
    },
    card: {
        width: 160,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
        marginHorizontal: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    imageBackground: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    image: {
        borderRadius: 10,
    },
    gradient: {
        flex: 1,
        justifyContent: "flex-end",
        padding: 10,
    },
    buttonCard: {
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20,
        backgroundColor: "#E92729",
    },
    title: {
        fontSize: 15,
        fontWeight: "bold",
        fontFamily: "Oswald",
        color: "white",
    },
});

export default styles;