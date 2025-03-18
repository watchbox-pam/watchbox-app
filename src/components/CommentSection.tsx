import React = require("react");
import { View, Text, StyleSheet } from "react-native";

interface CommentSectionProps {
	isMyComments: boolean;
}

const CommentSection: React.FC<CommentSectionProps> = ({ isMyComments }) => {
	const comments = isMyComments
		? ["Mon premier commentaire", "J'aime ce film", "Très intéressant !"]
		: [
				"Commentaire de mon ami 1",
				"Super film !",
				"Je n'ai pas aimé ce film"
		  ];

	return (
		<View style={styles.commentContainer}>
			{comments.map((comment, index) => (
				<Text key={index} style={styles.comment}>
					{comment}
				</Text>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	commentContainer: {
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10
	},
	comment: {
		fontSize: 16,
		marginVertical: 5,
		color: "#fff",
		padding: 15,
		backgroundColor: "#326bbb",
		borderRadius: 8
	}
});

export default CommentSection;
