import React from "react";
import {
	FlatList,
	View,
	Image,
	TouchableOpacity,
	Linking,
	Platform,
	Alert
} from "react-native";
import styles from "@/src/styles/CarouselProvidersStyle";
import Toast from "react-native-toast-message";

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
	const handlePress = async (item: any) => {
		const deeplink =
			Platform.OS === "ios" ? item.deeplink_ios : item.deeplink_android;
		if (deeplink) {
			const canOpen = await Linking.canOpenURL(deeplink);
			if (canOpen) {
				await Linking.openURL(deeplink);
				return;
			}
		}
		const fallback = item.web_url ?? link;
		if (fallback) {
			await Linking.openURL(fallback);
		} else {
			Toast.show({
				type: "error",
				text1: "Lien indisponible",
				text2: "Impossible d'ouvrir cette plateforme"
			});
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
						onPress={() => handlePress(item)}
						activeOpacity={0.7}>
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
