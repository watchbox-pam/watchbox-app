import { Switch, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "@/src/styles/ReviewStyle";
import StyledText from "@/src/components/StyledText";
import Slider from "@react-native-community/slider";
import { useState } from "react";
import useSessionStore from "@/src/zustand/sessionStore";
import Review from "@/src/models/Review";
import { router, useLocalSearchParams } from "expo-router";
import { createReview } from "@/src/services/ReviewService";
import BackButton from "@/src/components/BackButton";
export default function ReviewScreen() {
	const { id } = useLocalSearchParams();
	const currentUser = useSessionStore((state: any) => state.user);

	const [rating, setRating] = useState<number | null>(null);
	const [comment, setComment] = useState<string | null>(null);
	const [isSpoiler, setIsSpoiler] = useState<boolean>(false);

	const addReview = async () => {
		const review: Review = {
			userId: currentUser.id,
			mediaId: id,
			rating: rating,
			comment: comment,
			isSpoiler: isSpoiler
		};
		const result = await createReview(review);
		if (result.success) {
			router.back();
		} else {
			alert("Echec de la publication de la review");
		}
	};

	return (
		<View style={styles.container}>
			<BackButton />
			<StyledText style={styles.title}>Ajouter une review</StyledText>
			<TextInput
				editable
				multiline
				numberOfLines={10}
				placeholder={"Entrez votre commentaire"}
				placeholderTextColor={"#fff"}
				style={styles.comment}
				onChangeText={(text: string) => setComment(text)}
				textAlignVertical={"top"}
			/>
			<StyledText>Ajouter une note au film</StyledText>
			<View>
				<StyledText>{rating}</StyledText>
				<Slider
					step={1}
					minimumValue={0}
					maximumValue={10}
					onValueChange={(value: number) => setRating(value)}
				/>
			</View>
			<View style={styles.spoilerView}>
				<StyledText>Ajouter un spoiler warning</StyledText>
				<Switch
					value={isSpoiler}
					onValueChange={() =>
						setIsSpoiler((isSpoiler) => !isSpoiler)
					}
				/>
			</View>
			<TouchableOpacity style={styles.button} onPress={addReview}>
				<Text style={styles.buttonText}>Publier</Text>
			</TouchableOpacity>
		</View>
	);
}
