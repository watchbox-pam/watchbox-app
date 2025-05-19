import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import CommentSection from "../components/CommentSection";
import SwitchButton from "../components/SwitchButton";
import styles from "@/src/styles/CommentaryStyle";
import { Link } from "expo-router";
import { getReviewsByMedia } from "@/src/services/ReviewService";
import StyledText from "../components/StyledText";

const CommentaryScreen = ({ mediaId }: { mediaId: string }) => {
	const [isMyComments, setIsMyComments] = useState(true);
	const [reviews, setReviews] = useState([]);

	const handleSwitch = () => {
		setIsMyComments((prevState) => !prevState);
	};

	const fetchReviews = async () => {
		try {
			const result = await getReviewsByMedia(parseInt(mediaId));
			if (result.success) {
				setReviews(result.data);
			}
		} catch (error: any) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.CommentTitle}>Commentaires</Text>
				<Link
					style={styles.addComment}
					href={`/movie/${mediaId}/review`}>
					Ajouter une review
				</Link>
			</View>
			<SwitchButton isOn={isMyComments} onToggle={handleSwitch} />
			{reviews.length > 0 ? (
				<CommentSection isMyComments={isMyComments} reviews={reviews} />
			) : (
				<StyledText>Aucun commentaire</StyledText>
			)}
		</View>
	);
};

export default CommentaryScreen;
