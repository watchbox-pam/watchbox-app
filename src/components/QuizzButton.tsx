import { TouchableOpacity, View, Text } from "react-native";
import { router } from "expo-router";
import styles from "@/src/styles/QuizzButtonStyle";
import { MaterialIcons } from "@expo/vector-icons";

export default function Quizz() {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Envie de tester tes connaissances ? Réponds aux différents Quiz
				!
			</Text>
			<TouchableOpacity
				style={styles.buttonquizz}
				onPress={() => router.push("/quizz")}
				activeOpacity={0.8}>
				<View style={styles.iconQuizzButton}>
					<MaterialIcons name="bar-chart" size={24} color="#fff" />
				</View>
				<Text style={styles.buttonText}>Choisis ton Quiz !</Text>
				<MaterialIcons name="chevron-right" size={28} color="#fff" />
			</TouchableOpacity>
		</View>
	);
}
