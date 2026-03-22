import { useState } from "react";
import { Image, View, FlatList, TouchableOpacity, Text } from "react-native";
import { Media } from "../screens/PersonScreen";
import StyledText from "./StyledText";
import { Link } from "expo-router";
import styles from "@/src/styles/PersonMediaListStyle";

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
							pathname: "/(app)/(tabs)/movie/[id]",
							params: { id: item.id }
						}}
						asChild>
						<TouchableOpacity style={styles.imageContainer}>
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
						</TouchableOpacity>
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
