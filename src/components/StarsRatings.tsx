import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { ComponentProps, useRef } from "react";
import { PanResponder, View, StyleSheet } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withSpring,
	withSequence
} from "react-native-reanimated";
import StyledText from "@/src/components/StyledText";

type MaterialIconsName = ComponentProps<typeof MaterialIcons>["name"];

const STAR_SIZE = 22;
const GAP = 4;
const TOTAL_WIDTH = STAR_SIZE * 5 + GAP * 4;

const ACCENT = "#E8173A";
const STAR_ACTIVE = "#FFFFFF";
const STAR_INACTIVE = "#2A3A5C";

function getRatingFromX(x: number): number {
	const clamped = Math.max(0, Math.min(x, TOTAL_WIDTH));
	const raw = (clamped / TOTAL_WIDTH) * 5;
	return Math.max(0.5, Math.round(raw * 2) / 2);
}

function getStarIcon(
	starIndex: number,
	value: number | null
): MaterialIconsName {
	if (value === null) return "star-outline";
	if (value >= starIndex) return "star";
	if (value >= starIndex - 0.5) return "star-half";
	return "star-outline";
}

type StarsRatingsProps = {
	value: number | null;
	onChange: (value: number) => void;
};

export default function StarsRatings({ value, onChange }: StarsRatingsProps) {
	const containerX = useRef<number>(0);
	const scroreScale = useSharedValue(1);

	const handleChange = (newValue: number) => {
		if (newValue !== value) {
			scroreScale.value = withSequence(
				withSpring(1.2, { damping: 4 }),
				withSpring(1, { damping: 6 })
			);
		}
		onChange(newValue);
	};

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,
			onPanResponderGrant: (e) => {
				handleChange(
					getRatingFromX(e.nativeEvent.pageX - containerX.current)
				);
			},
			onPanResponderMove: (e) => {
				handleChange(
					getRatingFromX(e.nativeEvent.pageX - containerX.current)
				);
			}
		})
	).current;

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View
					style={styles.stars}
					onLayout={(e) => {
						containerX.current = e.nativeEvent.layout.x;
					}}
					{...panResponder.panHandlers}>
					{[1, 2, 3, 4, 5].map((star) => (
						<MaterialIcons
							key={star}
							name={getStarIcon(star, value)}
							size={STAR_SIZE}
							color={
								value !== null && value >= star - 0.5
									? STAR_ACTIVE
									: STAR_INACTIVE
							}
						/>
					))}
				</View>
				<View style={styles.separator} />
				<View style={styles.scoreBlock}>
					<StyledText style={styles.scoreNumber}>
						{value ?? ""}
					</StyledText>
					<StyledText style={styles.scoreMax}>/5</StyledText>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		alignItems: "flex-start",
		gap: 8
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		backgroundColor: "#0F1E3C",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#4a6a8a",
		paddingHorizontal: 12,
		paddingVertical: 8
	},
	stars: {
		flexDirection: "row",
		gap: GAP,
		width: TOTAL_WIDTH
	},
	separator: {
		width: 1,
		height: 18,
		backgroundColor: "#4a6a8a"
	},
	scoreBlock: {
		flexDirection: "row",
		alignItems: "flex-end",
		gap: 2
	},
	scoreNumber: {
		fontSize: 18,
		fontWeight: "800",
		color: "#fff",
		letterSpacing: -0.5,
		lineHeight: 22,
		width: 28,
		textAlign: "center"
	},
	scoreMax: {
		fontSize: 11,
		color: "#4a6a8a",
		fontWeight: "600",
		paddingBottom: 1
	},
	labelPill: {
		backgroundColor: ACCENT,
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 20
	},
	labelText: {
		color: "#fff",
		fontSize: 10,
		fontWeight: "700",
		textTransform: "uppercase",
		letterSpacing: 0.8
	}
});
