import React from "react";
import { View, Text } from "react-native";
import styles from "@/src/styles/StatsStyle";

type StatsProps = {
	totalMovies: number;
	total_runtime: number;
};

const Stats = ({ totalMovies, total_runtime }: StatsProps) => {
	const formatRuntime = (totalMinutes: number) => {
		const MINUTES_IN_HOUR = 60;
		const HOURS_IN_DAY = 24;
		const DAYS_IN_MONTH = 30;

		// Si pas de temps, retourner "0min"
		if (!totalMinutes || totalMinutes === 0) {
			return ["0min"];
		}

		const totalHours = Math.floor(totalMinutes / MINUTES_IN_HOUR);
		const months = Math.floor(totalHours / (HOURS_IN_DAY * DAYS_IN_MONTH));
		const days = Math.floor(
			(totalHours % (HOURS_IN_DAY * DAYS_IN_MONTH)) / HOURS_IN_DAY
		);
		const hours = totalHours % HOURS_IN_DAY;
		const minutes = totalMinutes % MINUTES_IN_HOUR;

		const parts = [];
		if (months > 0) parts.push(`${months}m`);
		if (days > 0) parts.push(`${days}j`);
		if (hours > 0) parts.push(`${hours}h`);
		if (minutes > 0) parts.push(`${minutes}min`);

		return parts;
	};

	// S'assurer que totalMovies est au moins 0
	const safeMovieCount = totalMovies || 0;

	// S'assurer que total_runtime est au moins 0
	const safeRuntime = total_runtime || 0;

	const formattedTime = formatRuntime(safeRuntime);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>STATS</Text>

			<View style={styles.statsGrid}>
				<View style={styles.statItem}>
					<Text style={styles.statNumber}>{safeMovieCount}</Text>
					<Text style={styles.statLabel}>Films</Text>
				</View>

				<View style={styles.statDivider} />

				<View style={styles.statItem}>
					<Text style={styles.statTime}>{formattedTime}</Text>
					<Text style={styles.statLabel}>Temps total</Text>
				</View>
			</View>
		</View>
	);
};

export default Stats;
