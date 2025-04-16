import { TouchableOpacity, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const BackButton = () => {
	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => router.back()}>
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
		backgroundColor: "#13396A",
		padding: 10,
		borderRadius: 50
	}
});

export default BackButton;
