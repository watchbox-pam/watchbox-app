import React from "react";
import { FlatList, View } from "react-native";
import Tag from "./Tag";
import StyledText from "./StyledText";
import styles from "@/src/styles/TagListStyle";

export default function TagList({
	tags,
	tagStyle,
	testID
}: {
	tags: string[];
	tagStyle?: any;
	testID?: string;
}) {
	return (
		<FlatList
			overScrollMode="never"
			horizontal
			data={tags}
			style={styles.tagsContainer}
			testID={testID}
			renderItem={({ item }) => (
				<View style={styles.tagContainer}>
					<Tag style={tagStyle}>
						<StyledText style={styles.tag}>{item}</StyledText>
					</Tag>
				</View>
			)}
		/>
	);
}
