import { FlatList, Image, TouchableOpacity, View } from "react-native";
import StyledText from "./StyledText";
import { Link } from "expo-router";
import styles from "@/src/styles/CarouselCastingStyle";

// Horizontal scrollable cast list component
export default function CarouselCasting({
	cast,
	testID
}: {
	cast: any;
	testID?: string;
}) {
	// Return nothing if cast is undefined, empty, or only contains nulls
	if (!cast || cast.length === 0 || cast.every((item: any) => item === null))
		return null;
	return (
		<View>
			<FlatList
				overScrollMode="never"
				data={cast}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				testID={testID}
				renderItem={({ item }) => (
					<Link
						href={{
							pathname: "/(app)/(tabs)/person/[id]",
							params: { id: item.id.toString() }
						}}
						asChild>
						<TouchableOpacity style={{ marginRight: 5 }}>
							{item.profile_path ? (
								<Image
									style={styles.image}
									source={{
										uri: `https://image.tmdb.org/t/p/original${item.profile_path}`
									}}
								/>
							) : (
								<View style={styles.noImage} />
							)}
							<StyledText style={styles.name}>
								{item.name}
							</StyledText>
							{item.character && (
								<StyledText style={styles.character}>
									{item.character}
								</StyledText>
							)}
						</TouchableOpacity>
					</Link>
				)}
			/>
		</View>
	);
}
