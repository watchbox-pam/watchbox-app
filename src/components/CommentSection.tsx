import { View, FlatList } from "react-native";
import Review from "@/src/models/Review";
import styles from "@/src/styles/CommentaryStyle";
import React from "react";
import MovieReview from "@/src/components/MovieReview";

interface CommentSectionProps {
	isMyComments: boolean;
	reviews: Review[];
}

// Displays a list of user reviews with rating stars and comments
const CommentSection: React.FC<CommentSectionProps> = ({
	isMyComments,
	reviews
}) => {
	return (
		<View style={styles.commentContainer}>
			<FlatList
				scrollEnabled={false}
				data={reviews}
				renderItem={({ item }) => <MovieReview review={item} />}
			/>
		</View>
	);
};

export default CommentSection;
