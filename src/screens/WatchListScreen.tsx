import BackButton from "../components/BackButton";
import ListWatchList from "../components/ListWatchList";
import LogoButton from "../components/Logo";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

export default function Index() {
	const { id } = useLocalSearchParams();

	const [media, setMedia] = useState({
		providers: [] as string[]
	});

	useEffect(() => {
		setMedia({
			providers: [
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg",
				"/pbpMk2JmcoNnQwx5JGpXngfoWtp.jpg",
				"/pvske1MyAoymrs5bguRfVqYiM9a.jpg"
			]
		});
	}, [id]);

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={styles.contentContainer}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<BackButton />
				<LogoButton />
			</View>
			<ListWatchList providers={media.providers} />
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#0A1E38",
		margin: 0,
		padding: 0
	},
	contentContainer: {
		alignItems: "center",
		paddingVertical: 20
	},
	header: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		paddingHorizontal: 25
	}
});
