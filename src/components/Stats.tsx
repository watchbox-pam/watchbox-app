import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Stats = () => {
	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>STATS</Text>

			<View style={styles.statBlockLeft}>
				<Text style={styles.labelLeft}>Films regardés cette année</Text>
				<Text style={styles.valueLeft}>146</Text>
			</View>

			<View style={styles.statBlockRight}>
				<Text style={styles.valueRight}>387</Text>
				<Text style={styles.labelRight}>Films regardés au total</Text>
			</View>

			<View style={styles.statBlockTime}>
				<Text style={styles.label}>Temps passé devant des films</Text>
				<Text style={styles.timeValue}>
					<Text style={styles.highlight}>1</Text> mois{" "}
					<Text style={styles.highlight}>12</Text> jours{" "}
					<Text style={styles.highlight}>9</Text> h
				</Text>
			</View>

			<View style={styles.statBlockLeft}>
				<Text style={styles.labelLeft}>Épisodes vus cette année</Text>
				<Text style={styles.valueLeft}>146</Text>
			</View>

			<View style={styles.statBlockRight}>
				<Text style={styles.valueRight}>4525</Text>
				<Text style={styles.labelRight}>Épisodes vus au total</Text>
			</View>

			<View style={styles.statBlockTime}>
				<Text style={styles.label}>Temps passé devant des séries</Text>
				<Text style={styles.timeValue}>
					<Text style={styles.highlight}>4</Text> mois{" "}
					<Text style={styles.highlight}>3</Text> jours{" "}
					<Text style={styles.highlight}>15</Text> h
				</Text>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		width: "90%",
		marginVertical: 30,
		paddingHorizontal: 20,
		backgroundColor: "#0D1321",
		borderRadius: 12
	},
	title: {
		fontSize: 40,
		fontWeight: "bold",
		color: "#FFF",
		marginBottom: 20,
		textDecorationLine: "underline"
	},
	statBlockLeft: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginVertical: "auto"
	},
	labelLeft: {
		width: "51%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "right",
		paddingTop: 15
	},
	valueLeft: {
		width: "49%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF"
	},
	statBlockRight: {
		flexDirection: "row",
		alignItems: "flex-end",
		marginBottom: 20,
		marginVertical: "auto"
	},
	labelRight: {
		width: "51%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "left",
		paddingTop: 15
	},
	valueRight: {
		width: "49%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF",
		textAlign: "right"
	},
	statBlockTime: {
		flexDirection: "row",
		alignItems: "flex-start",
		marginBottom: 20
	},
	label: {
		width: "50%",
		fontSize: 14,
		color: "#FFF",
		textAlign: "center"
	},
	value: {
		width: "50%",
		fontSize: 50,
		fontWeight: "bold",
		color: "#D0BFFF"
	},
	timeValue: {
		fontSize: 20,
		color: "#FFF"
	},
	highlight: {
		fontSize: 24,
		fontWeight: "bold",
		color: "#FF4A4A"
	}
});

export default Stats;
