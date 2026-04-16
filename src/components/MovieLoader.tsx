import React, { useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	withSequence,
	withDelay,
	Easing,
	interpolate,
	cancelAnimation
} from "react-native-reanimated";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const CARD_WIDTH = SCREEN_WIDTH * 0.62;
const CARD_HEIGHT = CARD_WIDTH * 1.5;

const COLORS = {
	bg: "#0A1E38",
	card1: "#0F2A4A",
	card3: "#0B1C34",
	shimmer: "#1A3A5C",
	accent: "#2A5A8A",
	text: "#4A7FAA",
	dot: "#1E4D7A",
	dotActive: "#4A9FE0"
};

function SkeletonCard({
	delay,
	offsetX,
	offsetY,
	scale,
	rotate,
	zIndex
}: {
	delay: number;
	offsetX: number;
	offsetY: number;
	scale: number;
	rotate: string;
	zIndex: number;
}) {
	const shimmer = useSharedValue(0);
	const pulse = useSharedValue(0);

	useEffect(() => {
		shimmer.value = withDelay(
			delay,
			withRepeat(
				withTiming(1, {
					duration: 1600,
					easing: Easing.inOut(Easing.sine)
				}),
				-1,
				true
			)
		);
		pulse.value = withDelay(
			delay,
			withRepeat(
				withSequence(
					withTiming(1, {
						duration: 900,
						easing: Easing.inOut(Easing.ease)
					}),
					withTiming(0, {
						duration: 900,
						easing: Easing.inOut(Easing.ease)
					})
				),
				-1,
				false
			)
		);
		return () => {
			cancelAnimation(shimmer);
			cancelAnimation(pulse);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const cardStyle = useAnimatedStyle(() => ({
		opacity: interpolate(pulse.value, [0, 1], [0.5, 0.85])
	}));

	const shimmerStyle = useAnimatedStyle(() => ({
		opacity: interpolate(shimmer.value, [0, 1], [0, 0.18])
	}));

	return (
		<Animated.View
			style={[
				styles.card,
				{
					transform: [
						{ translateX: offsetX },
						{ translateY: offsetY },
						{ scale },
						{ rotate }
					],
					zIndex
				},
				cardStyle
			]}>
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					styles.shimmerOverlay,
					shimmerStyle
				]}
			/>
			<View style={styles.skeletonPoster} />
			<View style={styles.skeletonContent}>
				<View
					style={[styles.skeletonLine, { width: "70%", height: 14 }]}
				/>
				<View
					style={[
						styles.skeletonLine,
						{ width: "45%", height: 10, marginTop: 8 }
					]}
				/>
				<View style={styles.skeletonTags}>
					<View style={styles.skeletonTag} />
					<View style={styles.skeletonTag} />
				</View>
			</View>
		</Animated.View>
	);
}

// Chaque dot est son propre composant pour appeler les hooks au top level
function LoadingDot({ index }: { index: number }) {
	const anim = useSharedValue(0);

	useEffect(() => {
		anim.value = withDelay(
			index * 180,
			withRepeat(
				withSequence(
					withTiming(1, {
						duration: 400,
						easing: Easing.out(Easing.ease)
					}),
					withTiming(0, {
						duration: 400,
						easing: Easing.in(Easing.ease)
					}),
					withDelay(300, withTiming(0, { duration: 0 }))
				),
				-1,
				false
			)
		);
		return () => cancelAnimation(anim);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const dotStyle = useAnimatedStyle(() => ({
		opacity: interpolate(anim.value, [0, 1], [0.25, 1]),
		transform: [{ scale: interpolate(anim.value, [0, 1], [0.7, 1.2]) }],
		backgroundColor: anim.value > 0.5 ? COLORS.dotActive : COLORS.dot
	}));

	return <Animated.View style={[styles.dot, dotStyle]} />;
}

function LoadingDots() {
	return (
		<View style={styles.dotsRow}>
			<LoadingDot index={0} />
			<LoadingDot index={1} />
			<LoadingDot index={2} />
		</View>
	);
}

export default function MovieLoader() {
	const titleOpacity = useSharedValue(0);

	useEffect(() => {
		titleOpacity.value = withDelay(
			200,
			withTiming(1, { duration: 600, easing: Easing.out(Easing.ease) })
		);
		return () => cancelAnimation(titleOpacity);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const titleStyle = useAnimatedStyle(() => ({
		opacity: titleOpacity.value
	}));

	return (
		<View style={styles.container}>
			<View style={styles.cardsWrapper}>
				<SkeletonCard
					delay={400}
					offsetX={-CARD_WIDTH * 0.18}
					offsetY={10}
					scale={0.88}
					rotate="-6deg"
					zIndex={1}
				/>
				<SkeletonCard
					delay={200}
					offsetX={CARD_WIDTH * 0.18}
					offsetY={6}
					scale={0.92}
					rotate="4deg"
					zIndex={2}
				/>
				<SkeletonCard
					delay={0}
					offsetX={0}
					offsetY={0}
					scale={1}
					rotate="0deg"
					zIndex={3}
				/>
			</View>

			<Animated.View style={[styles.textBlock, titleStyle]}>
				<Text style={styles.label}>Chargement des films</Text>
				<LoadingDots />
			</Animated.View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.bg,
		alignItems: "center",
		justifyContent: "center",
		gap: 48
	},
	cardsWrapper: {
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		alignItems: "center",
		justifyContent: "center"
	},
	card: {
		position: "absolute",
		width: CARD_WIDTH,
		height: CARD_HEIGHT,
		borderRadius: 18,
		backgroundColor: COLORS.card1,
		borderWidth: 1,
		borderColor: COLORS.accent + "30",
		overflow: "hidden"
	},
	shimmerOverlay: {
		backgroundColor: COLORS.shimmer,
		borderRadius: 18
	},
	skeletonPoster: {
		width: "100%",
		height: "62%",
		backgroundColor: COLORS.card3
	},
	skeletonContent: {
		padding: 14
	},
	skeletonLine: {
		borderRadius: 6,
		backgroundColor: COLORS.shimmer
	},
	skeletonTags: {
		flexDirection: "row",
		gap: 8,
		marginTop: 14
	},
	skeletonTag: {
		width: 56,
		height: 22,
		borderRadius: 11,
		backgroundColor: COLORS.card3,
		borderWidth: 1,
		borderColor: COLORS.accent + "20"
	},
	textBlock: {
		alignItems: "center",
		gap: 14
	},
	label: {
		fontSize: 13,
		letterSpacing: 2.5,
		textTransform: "uppercase",
		color: COLORS.text,
		fontWeight: "500"
	},
	dotsRow: {
		flexDirection: "row",
		gap: 8,
		alignItems: "center"
	},
	dot: {
		width: 6,
		height: 6,
		borderRadius: 3
	}
});
