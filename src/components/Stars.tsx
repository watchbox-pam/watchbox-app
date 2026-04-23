import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps } from "react";
import { View, StyleSheet } from "react-native";
import StyledText from "@/src/components/StyledText";

type MaterialIconName = ComponentProps<typeof MaterialIcons>["name"];

const MAX_RATING = 5;
//const STAR_COLOR = "#FFD700";
const STAR_COLOR = "#F5C518";

function getStars(rating: number): MaterialIconName[] {
	const full = Math.floor(rating / 2);
	const half = rating % 2 !== 0 ? 1 : 0;
	const empty = MAX_RATING - full - half;
	return [
		...Array(full).fill("star"),
		...Array(half).fill("star-half"),
		...Array(empty).fill("star-border")
	];
}

type StarsProps = {
	rating: number;
	size?: "sm" | "md";
};

export default function Stars({ rating, size = "sm" }: StarsProps) {
	const starSize = size === "sm" ? 13 : 18;
	const stars = getStars(rating);

	return (
		<View style={styles.wrapper}>
			<StyledText style={[styles.score, size === "md" && styles.scoreLg]}>
				{rating.toFixed(1)}
			</StyledText>
			<View style={styles.stars}>
				{stars.map((name, i) => (
					<MaterialIcons
						key={i}
						name={name}
						size={starSize}
						color={STAR_COLOR}
					/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		alignItems: "flex-end",
		gap: 2
	},
	score: {
		color: STAR_COLOR,
		fontSize: 13,
		fontWeight: "700",
		letterSpacing: 0.3
	},
	scoreLg: {
		fontSize: 18
	},
	stars: {
		flexDirection: "row",
		gap: 1
	}
});
