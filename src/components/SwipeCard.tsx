import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import { Movie } from "@/src/services/SwipeService";

type Props = {
	movie: Movie;
};

const { width, height } = Dimensions.get("window");

export const SwipeCard: React.FC<Props> = ({ movie }) => {
	return (
		<View style={styles.card}>
			<Image
				source={{ uri: movie.posterUrl }}
				style={styles.image}
				resizeMode="cover"
			/>
			<View style={styles.overlay}>
				<Text style={styles.title}>{movie.title}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	card: {
		width: width * 0.9,
		height: height * 0.65,
		borderRadius: 16,
		overflow: "hidden",
		backgroundColor: "#222",
		alignSelf: "center"
	},
	image: {
		width: "100%",
		height: "100%"
	},
	overlay: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		backgroundColor: "rgba(0,0,0,0.6)",
		padding: 12
	},
	title: {
		color: "#fff",
		fontSize: 22,
		fontWeight: "bold"
	}
});
