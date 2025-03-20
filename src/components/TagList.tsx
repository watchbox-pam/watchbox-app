import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Tag from "./Tag";
import StyledText from "./StyledText";

export default function TagList({
	tags,
	tagStyle
}: {
	tags: any[];
	tagStyle?: any;
}) {
	return (
		<View style={styles.tagsContainer}>
			<FlatList
				overScrollMode="never"
				horizontal
				data={tags}
				renderItem={({ item }) => (
					<View style={styles.tagContainer}>
						<Tag style={tagStyle}>
							<StyledText style={styles.tag}>
								{item.name}
							</StyledText>
						</Tag>
					</View>
				)}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	tagsContainer: {
		marginTop: 5,
		flexDirection: "row"
	},
	tagContainer: {
		marginRight: 5
	},
	tag: {
		fontSize: 10
	}
});
