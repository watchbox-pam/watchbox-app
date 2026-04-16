import React from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Linking,
	Image,
	StyleSheet
} from "react-native";

type CadrePublicitaireProps = {
	title?: string;
	description?: string;
	imageUrl?: string;
	link?: string;
};

const CadrePublicitaire: React.FC<CadrePublicitaireProps> = ({
	title = "Publicité",
	description = "Découvrez nos offres exclusives",
	imageUrl,
	link
}) => {
	const handlePress = () => {
		if (link) {
			Linking.openURL(link);
		}
	};

	return (
		<TouchableOpacity
			style={styles.adContainer}
			onPress={handlePress}
			activeOpacity={0.8}>
			<View style={styles.adBadge}>
				<Text style={styles.adBadgeText}>Pub</Text>
			</View>

			{imageUrl && (
				<Image source={{ uri: imageUrl }} style={styles.adImage} />
			)}

			<View style={styles.adContent}>
				<Text style={styles.adTitle} numberOfLines={2}>
					{title}
				</Text>
				<Text style={styles.adDescription} numberOfLines={2}>
					{description}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	adContainer: {
		backgroundColor: "#2C2C2E",
		borderRadius: 12,
		marginVertical: 15,
		marginHorizontal: 16,
		overflow: "hidden",
		borderWidth: 1,
		borderColor: "#FFD700",
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		minHeight: 120,
		position: "relative"
	},
	adBadge: {
		position: "absolute",
		top: 8,
		right: 8,
		backgroundColor: "#FFD700",
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 4,
		zIndex: 1
	},
	adBadgeText: {
		fontSize: 10,
		fontWeight: "bold",
		color: "#000"
	},
	adImage: {
		width: 80,
		aspectRatio: 2 / 3,
		borderRadius: 8,
		marginRight: 12
	},
	adContent: {
		flex: 1,
		justifyContent: "center"
	},
	adTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#FFFFFF",
		marginBottom: 6
	},
	adDescription: {
		fontSize: 14,
		color: "#B0B0B0"
	}
});

export default CadrePublicitaire;
