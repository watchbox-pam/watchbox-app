import { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import StyledText from "./StyledText";

export default function ReadMore({ data }: { data: any }) {
	const [showFullBio, setShowFullBio] = useState(false);

	return (
		<View style={styles.biographyContainer}>
			<StyledText>
				{data
					? showFullBio
						? data
						: `${data.substring(0, 400)}...`
					: "Aucune biographie disponible"}
			</StyledText>
			{data && data.length > 100 && (
				<TouchableOpacity
					style={styles.readMoreButton}
					onPress={() => setShowFullBio(!showFullBio)}>
					<StyledText style={styles.readMoreText}>
						{showFullBio ? "Lire moins" : "Lire plus"}
					</StyledText>
				</TouchableOpacity>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	biographyContainer: {
		marginTop: 20,
		marginBottom: 20
	},
	readMoreButton: {
		marginTop: 8,
		alignSelf: "flex-start"
	},
	readMoreText: {
		color: "#4E9BF5",
		fontWeight: "bold",
		textDecorationLine: "underline"
	}
});
