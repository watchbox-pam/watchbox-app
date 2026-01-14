import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, useNavigation } from "expo-router";
import styles from "@/src/styles/BackButtonStyle";

// Component that renders a back navigation button
const BackButton = () => {
	const navigation = useNavigation();

	const handleBack = () => {
		// Check if there's a previous route in the stack
		if (navigation.canGoBack()) {
			router.back();
		} else {
			// Fallback to home if no back history
			router.push("/(app)/(tabs)");
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleBack}>
				<Ionicons name="arrow-back" size={24} color="white" />
			</TouchableOpacity>
		</View>
	);
};

export default BackButton;
