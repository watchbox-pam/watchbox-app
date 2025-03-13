import {StyleSheet} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0A1E38",
    },
    contentContainer: {
        alignItems: "center",
        paddingVertical: 20,
    },
    imageBannerContainer: {
        width: "100%",
        aspectRatio: 16 / 9,
    },
    imageBanner: {
        width: "100%",
        height: "100%",
    },
    imagePosterContainer: {
        flexDirection: "row",
        width: "70%",
        marginRight: 20,
    },
    ProfilPicture: {
        width: 100,
        height: 100,
        borderRadius: 100,
        borderWidth: 3,
        borderColor: "#ffffff",
        zIndex: 1,
    },
    title: {
        fontSize: 40,
        color: "#ffffff",
        paddingTop: 10,
        paddingLeft: 5,
    },
    text: {
        fontSize: 15,
    },
    textBold: {
        fontWeight: "bold",
    },
    description: {
        fontSize: 20,
        paddingRight: 20,
        paddingLeft: 20,
        marginBottom: 20,
        zIndex: -1,
    },
    infoContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        paddingRight: 20,
        paddingLeft: 20,
        top: -20,
    },
    infoDiv: {
        flexDirection: "column",
        alignSelf: "flex-end",
    },
    tagContainer: {
        marginBottom: -10,
    },
    textTag: {
        fontSize: 10,
    },
    WatchList: {
        width: 350,
        marginBottom: 10,
    },
    TitleWatchList: {
        color: "#ffffff",
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    shadowBottom: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "60%",
        transform: [{ rotate: "180deg" }],
        zIndex: 1,
    },
});

export default styles;