import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import styles from "@/src/styles/BackButtonStyle";

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

export default BackButton;
