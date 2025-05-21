import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "@/src/styles/StatsStyle";

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

export default Stats;
