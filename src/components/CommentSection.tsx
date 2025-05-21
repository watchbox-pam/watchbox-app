import { View, FlatList, Image } from "react-native";
import Stars from "@/src/components/Stars";
import Review from "@/src/models/Review";
import styles from "@/src/styles/CommentaryStyle";
import React from "react";
import StyledText from "./StyledText";

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
				renderItem={({ item }) => (
					<View style={styles.comment} key={item.id}>
						<View style={styles.commentTop}>
							<View style={styles.userInfo}>
								<Image
									source={require("../assets/images/Interstellar-film1.png")}
									style={styles.userPicture}
								/>
								<StyledText style={styles.userName}>
									{item.user?.username}
								</StyledText>
							</View>
							{item.rating !== null &&
								item.rating !== undefined && (
									<Stars rating={item.rating} />
								)}
						</View>
						<StyledText>{item.comment}</StyledText>
					</View>
				)}
			/>
		</View>
	);
};

export default CommentSection;
