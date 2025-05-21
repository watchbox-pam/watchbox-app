import Review from "@/src/models/Review";
import styles from "@/src/styles/CommentaryStyle";
import { Image, TouchableOpacity, View } from "react-native";
import StyledText from "@/src/components/StyledText";
import Stars from "@/src/components/Stars";
import React, { useState } from "react";

export default function MovieReview({ review }: { review: Review }) {
	const [isSpoiler, setIsSpoiler] = useState<boolean>(review.isSpoiler);

	return (
		<View style={styles.comment} key={review.id}>
			<View style={styles.commentTop}>
				<View style={styles.userInfo}>
					<Image
						source={require("../assets/images/Interstellar-film1.png")}
						style={styles.userPicture}
					/>
					<StyledText style={styles.userName}>
						{review.user?.username}
					</StyledText>
				</View>
				{review.rating !== null && review.rating !== undefined && (
					<Stars rating={review.rating} />
				)}
			</View>
			<View>
				{isSpoiler ? (
					<View style={{ alignItems: "center" }}>
						<TouchableOpacity
							style={styles.spoilerWarning}
							onPress={() => setIsSpoiler(false)}>
							<StyledText
								style={{
									textDecorationLine: "underline"
								}}>
								Afficher le spoiler
							</StyledText>
						</TouchableOpacity>
					</View>
				) : null}
				<StyledText style={isSpoiler ? styles.commentText : null}>
					{review.comment}
				</StyledText>
			</View>
		</View>
	);
}
