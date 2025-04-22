import { useState } from "react";
import {
	Image,
	StyleSheet,
	View,
	FlatList,
	Dimensions,
	TouchableOpacity,
	Text
} from "react-native";
import { Media } from "../screens/PersonScreen";
import StyledText from "./StyledText";
import { Link } from "expo-router";

export default function PersonMediaList({
	data
}: {
	data: Media[] | undefined;
}) {
	const numColumns = 4;
	const maxRows = 2;
	const [showAll, setShowAll] = useState(false);

	const displayedMedia = showAll
		? data
		: data?.slice(0, maxRows * numColumns);
	const hasMoreItems = (data?.length || 0) > maxRows * numColumns;

	return (
		<View style={styles.container}>
			<FlatList
				data={displayedMedia}
				numColumns={numColumns}
				renderItem={({ item }) => (
					<Link
						href={{
							// add path /tv/[id] in the future
							// it will fail when you click on a tv show / serie
							// pathname: item.media_type === "movie" ? "/movie/[id]" : "/tv/[id]",
							pathname: "/movie/[id]",
							params: { id: item.id }
						}}
						asChild>
						<View style={styles.imageContainer}>
							{!item.poster_path ? (
								<View style={styles.emptyImage}>
									<StyledText style={styles.emptyImageText}>
										{item.title || "inconnu"}
									</StyledText>
								</View>
							) : (
								<Image
									source={{
										uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`
									}}
									style={styles.image}
								/>
							)}
						</View>
					</Link>
				)}
				keyExtractor={(item, index) => index.toString()}
				key={numColumns}
				scrollEnabled={false}
			/>

			{hasMoreItems && (
				<TouchableOpacity
					style={styles.readMoreButton}
					onPress={() => setShowAll(!showAll)}>
					<Text style={styles.readMoreText}>
						{showAll ? "Lire moins" : "Lire plus"}
					</Text>
				</TouchableOpacity>
			)}
		</View>
	);
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%"
	},
	image: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: "100%"
	},
	emptyImage: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: "100%",
		backgroundColor: "#ccc",
		justifyContent: "center"
	},
	emptyImageText: {
		fontSize: 12,
		textAlign: "center",
		color: "black",
		alignItems: "center"
	},
	imageContainer: {
		flex: 1,
		maxWidth: width / 4,
		padding: 2,
		alignItems: "center"
	},
	row: {
		justifyContent: "space-between",
		width: "100%"
	},
	readMoreButton: {
		alignItems: "center",
		marginTop: 5
	},
	readMoreText: {
		color: "#3498db",
		fontSize: 16,
		fontWeight: "bold"
	}
});
