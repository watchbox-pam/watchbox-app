import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogoButton = () => {
	const navigation = useNavigation(); // Assurez-vous que le chemin est correcte (chemin complet vers HomeScreen)

	return (
		<View style={styles.container}>
			<TouchableOpacity
			// onPress={() =>
			// 	navigation.navigate("../screens/HomeScreen.tsx")}
			>
				<Image
					source={require("@/src/assets/images/watchbox-logo.png")} // Assurez-vous que le chemin est correct
					style={{ width: 50, height: 50 }}
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default LogoButton;

const styles = StyleSheet.create({
	container: {
		alignSelf: "flex-end",
		marginBottom: 20,
		marginRight: 5
	}
});
