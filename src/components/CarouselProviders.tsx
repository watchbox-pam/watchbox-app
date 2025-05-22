import React from "react";
import { FlatList, View, Image } from "react-native";
import styles from "@/src/styles/CarouselProvidersStyle";

// Horizontal carousel displaying provider logos (e.g. Netflix, Hulu)
export default function CarouselProviders({
	providers
}: {
	providers: any;
	tagStyle?: any;
	testID?: string;
}) {
	return (
		<View style={styles.container}>
			<FlatList
				overScrollMode="never"
				data={providers}
				horizontal
				testID="carousel-providers"
				renderItem={({ item }) => (
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
				)}
			/>
		</View>
	);
}
