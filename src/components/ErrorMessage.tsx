import { StyleSheet, View } from "react-native";
import StyledText from "./StyledText";

export const ErrorMessage = ({ message }: { message?: string }) => {
	return (
		<View style={styles.errorContainer} testID="error">
			<StyledText style={styles.errorText}>
				{message || "Erreur lors du chargement des données."}
			</StyledText>
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
	}
});
