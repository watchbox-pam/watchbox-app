import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        marginVertical: 5,
    },
    itemContainer: {
        width: 170,
        marginHorizontal: 5,
        alignItems: "flex-start",
    },
    image: {
        width: 170,
        height: 250,
        borderRadius: 8,
    },
    title: {
        color: "#ffffff",
        fontSize: 21,
        fontWeight: "bold",
        textAlign: "left",
        marginTop: 10,
        width: "100%",
    },
    overview: {
        color: "#ffffff",
        fontSize: 15,
        opacity: 0.8,
        marginTop: 4,
        width: "100%",
    },
});

export default styles;