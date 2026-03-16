import React, { FC, memo, useEffect } from "react";
import { View, Text, Dimensions, Image } from "react-native";
//import FallBackImage from "../components/FallbackImage";
import Animated, {
	Easing,
	Extrapolation,
	interpolate,
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withSpring
} from "react-native-reanimated";
import styles from "../styles/SwipeCardStyle";

export interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
	runtime?: number;
}

interface SwipeCardViewProps {
	movie: Movie;
	index: number;
	totalCards: number;
	panHandlers: object;
	translateX: SharedValue<number>;
	translateY: SharedValue<number>;
	nextCardScale: SharedValue<number>;
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ROTATION_RANGE = 15;

const getPosterUri = (poster_path: string | null): string => {
	if (!poster_path) {
		//return <FallbackImage>;
	}
	if (poster_path.startsWith("http")) return poster_path;
	return `https://image.tmdb.org/t/p/w500${poster_path}`;
};

const SwipeCard: FC<SwipeCardViewProps> = ({
	movie,
	index,
	totalCards,
	panHandlers,
	translateX,
	translateY,
	nextCardScale
}) => {
	const isTopCard = index === 0;
	const isSecondCard = index === 1;

	const cardScale = useSharedValue(isTopCard ? 1 : isSecondCard ? 0.9 : 0.8);
	const cardOpacity = useSharedValue(
		isTopCard ? 1 : isSecondCard ? 0.9 : 0.8
	);

	useEffect(() => {
		const targetScale = isTopCard ? 1 : isSecondCard ? 0.95 : 0.9;
		cardScale.value = withSpring(targetScale, {
			duration: 300,
			easing: Easing.out(Easing.quad)
		});

		const targetOpacity = isTopCard ? 1 : isSecondCard ? 0.85 : 0.7;
		cardOpacity.value = withSpring(targetOpacity, {
			duration: 300,
			easing: Easing.out(Easing.quad)
		});
	}, [index, isTopCard, isSecondCard, cardScale, cardOpacity]);

	const animationStyle = useAnimatedStyle(() => {
		const currentX = isTopCard ? translateX.value : 0;
		const currentY = isTopCard ? translateY.value : 0;

		const rotation = interpolate(
			currentX,
			[-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
			[-ROTATION_RANGE, 0, ROTATION_RANGE],
			Extrapolation.CLAMP
		);

		const opacity = isTopCard
			? interpolate(
					Math.sqrt(currentX ** 2 + currentY ** 2),
					[0, SCREEN_WIDTH * 0.6],
					[1, 0.5],
					Extrapolation.CLAMP
				)
			: cardOpacity.value;

		const scale = isTopCard ? 1 : isSecondCard ? nextCardScale.value : 0.8;

		return {
			transform: [
				{ translateX: currentX },
				{ translateY: currentY },
				{ rotate: `${rotation}deg` },
				{ scale }
			],
			opacity,
			zIndex: totalCards - index
		};
	});

	const likeStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			translateX.value,
			[0, SCREEN_WIDTH / 4],
			[0, 1],
			Extrapolation.CLAMP
		)
	}));

	const nopeStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			translateX.value,
			[-SCREEN_WIDTH / 4, 0],
			[1, 0],
			Extrapolation.CLAMP
		)
	}));

	const skipStyle = useAnimatedStyle(() => ({
		opacity: interpolate(
			translateY.value,
			[-SCREEN_HEIGHT / 6, 0],
			[1, 0],
			Extrapolation.CLAMP
		)
	}));

	const posterUri = getPosterUri(movie.poster_path);

	return (
		<Animated.View
			style={[
				styles.card,
				animationStyle,
				{ height: SCREEN_HEIGHT * 0.62 }
			]}
			{...panHandlers}>
			<Image
				source={{ uri: posterUri }}
				style={styles.posterImage}
				resizeMode="cover"
			/>

			{isTopCard && (
				<>
					<Animated.View
						style={[styles.label, styles.likeLabel, likeStyle]}>
						<Text style={[styles.labelText, styles.likeLabelText]}>
							LIKE
						</Text>
					</Animated.View>
					<Animated.View
						style={[styles.label, styles.nopeLabel, nopeStyle]}>
						<Text style={[styles.labelText, styles.nopeLabelText]}>
							NOPE
						</Text>
					</Animated.View>
					<Animated.View
						style={[styles.label, styles.skipLabel, skipStyle]}>
						<Text style={[styles.labelText, styles.skipLabelText]}>
							UNSEE
						</Text>
					</Animated.View>
				</>
			)}

			{/* A GARDER AU CAS OU

			Descritpion et titre du film sous le film (le poster parle d'elle même et l'aspectRatio ne sera plus respecter si ajouter (deformement des posters))
			<View style={styles.cardFooter}>
				<Text style={styles.cardTitle} numberOfLines={1}>
					{movie.title}
				</Text>
				{movie.runtime ? (
					<Text style={styles.cardMeta}>{movie.runtime} min</Text>
				) : null}
			</View> */}
		</Animated.View>
	);
};

export default memo(SwipeCard);
