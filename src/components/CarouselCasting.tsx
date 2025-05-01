import {
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import StyledText from "./StyledText";
import { Link } from "expo-router";

export default function CarouselCasting({
	cast,
	testID
}: {
	cast: any;
	testID?: string;
}) {
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
							pathname: "/person/[id]",
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

const styles = StyleSheet.create({
	image: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: 100
	},
	noImage: {
		aspectRatio: 3 / 4,
		borderRadius: 5,
		width: 100,
		backgroundColor: "#ccc"
	},
	name: {
		textAlign: "center",
		fontWeight: "bold",
		flexWrap: "wrap",
		width: 100
	},
	character: {
		textAlign: "center",
		flexWrap: "wrap",
		width: 100
	}
});
