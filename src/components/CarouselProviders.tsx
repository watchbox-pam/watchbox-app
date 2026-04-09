import React from "react";
import {
	FlatList,
	View,
	Image,
	TouchableOpacity,
	Linking,
	Alert
} from "react-native";
import styles from "@/src/styles/CarouselProvidersStyle";

// Horizontal carousel displaying provider logos (e.g. Netflix, Hulu)
export default function CarouselProviders({
	providers,
	link,
	testID
}: {
	providers: any;
	link?: string | null;
	tagStyle?: any;
	testID?: string;
}) {
	const handlePress = async () => {
		if (!link) return;
		const supported = await Linking.canOpenURL(link);
		if (supported) {
			await Linking.openURL(link);
		} else {
			Alert.alert("Lien non supporté", "Impossible d'ouvrir le lien.");
		}
	};
	return (
		<View style={styles.container}>
			<FlatList
				overScrollMode="never"
				data={providers}
				horizontal
				testID={testID ?? "carousel-providers"}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={handlePress}
						activeOpacity={link ? 0.7 : 1}
						disabled={!link}>
						<View style={styles.imageContainer}>
							<Image
								source={{
									uri:
										"https://image.tmdb.org/t/p/original" +
										item.logo_path
								}}
								style={styles.image}
							/>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
