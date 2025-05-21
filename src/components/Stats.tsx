import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type StatsProps = {
	totalMovies: number;
	total_runtime: number;
};

const Stats = ({ totalMovies, total_runtime }: StatsProps) => {
	const formatRuntime = (totalMinutes: number) => {
		const MINUTES_IN_HOUR = 60;
		const HOURS_IN_DAY = 24;
		const DAYS_IN_MONTH = 30;

		const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
		const months = Math.floor(totalHours / (HOURS_IN_DAY * DAYS_IN_MONTH));
		const days = Math.floor(
			(totalHours % (HOURS_IN_DAY * DAYS_IN_MONTH)) / HOURS_IN_DAY
		);
		const hours = totalHours % HOURS_IN_DAY;
		const minutes = totalMinutes % MINUTES_IN_HOUR;

		const parts = [];
		if (months > 0) parts.push(`${months} mois`);
		if (days > 0) parts.push(`${days} jour${days > 1 ? "s" : ""}`);
		if (hours > 0) parts.push(`${hours} h`);
		if (minutes > 0) parts.push(`${minutes} min`);

		return parts;
	};

	const runtimeParts = formatRuntime(total_runtime || 0);

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<Text style={styles.title}>STATS</Text>

			<View style={styles.statBlockRight}>
				<Text style={styles.valueRight}>{totalMovies}</Text>
				<Text style={styles.labelRight}>Films regardés au total</Text>
			</View>

			<View style={styles.statBlockTime}>
				<Text style={styles.label}>Temps passé devant des films</Text>
				<Text style={styles.timeValue}>
					{runtimeParts.map((part, index) => (
						<Text key={index} style={styles.highlight}>
							{part}{" "}
						</Text>
					))}
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
