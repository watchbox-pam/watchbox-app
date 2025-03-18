import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const BackButton = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => navigation.goBack()}>
				<Ionicons name="arrow-back" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-start",
		marginBottom: 20,
		marginLeft: 5
	},
	button: {
		alignItems: "center",
		backgroundColor: "#313131",
		padding: 10,
		borderRadius: 50
	}
});

export default BackButton;
