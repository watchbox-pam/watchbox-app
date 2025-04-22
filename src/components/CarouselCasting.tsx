import { FlatList, Image, StyleSheet, View } from "react-native";
import StyledText from "./StyledText";
import { Link } from "expo-router";

export default function CarouselCasting({ cast }: any) {
	if (!cast || cast.length === 0 || cast.every((item: any) => item === null))
		return null;
	return (
		<View>
			<FlatList
				overScrollMode="never"
				data={cast}
				keyExtractor={(item) => item.id.toString()}
				horizontal
				renderItem={({ item }) => (
					<Link
						href={{
							pathname: "/person/[id]",
							params: { id: item.id.toString() }
						}}>
						<View style={{ margin: 5 }}>
							<Image
								style={styles.image}
								source={{
									uri: `https://image.tmdb.org/t/p/original${item.profile_path}`
								}}
							/>
							<StyledText style={styles.name}>
								{item.name}
							</StyledText>
							{item.character && (
								<StyledText style={styles.character}>
									{item.character}
								</StyledText>
							)}
						</View>
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
