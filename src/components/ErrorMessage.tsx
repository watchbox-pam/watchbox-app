import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

export const ErrorMessage = ({
	message,
	onRetry
}: {
	message?: string;
	onRetry?: () => void;
}) => {
	return (
		<View style={styles.errorContainer} testID="error">
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>
					{message || "Erreur lors du chargement des données."}
				</Text>
				<TouchableOpacity
					style={[styles.retryButton]}
					onPress={onRetry}>
					<Text style={styles.retryButtonText}>Réessayer</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#0A1E38"
	},
	errorText: {
		color: "#ff6b6b",
		textAlign: "center",
		marginBottom: 20
	},
	retryButton: {
		backgroundColor: "#4a69bd",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 4
	},
	retryButtonText: {
		color: "#fff",
		fontWeight: "600"
	}
});
