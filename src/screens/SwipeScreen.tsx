import React, {
	useState,
	useCallback,
	useRef,
	useEffect,
	useLayoutEffect
} from "react";
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	PanResponder,
	ActivityIndicator
} from "react-native";
import {
	runOnJS,
	useSharedValue,
	withSpring,
	withTiming
} from "react-native-reanimated";
import { useRouter } from "expo-router";
import { fetchMovies, postSwipe } from "../services/SwipeService";
import { postFeedback } from "../services/ReviewService";
import SwipeCard, { Movie } from "../components/SwipeCard";
import styles from "../styles/SwipeStyle";
import { Ionicons } from "@expo/vector-icons";
import MovieLoader from "../components/MovieLoader";
import useSessionStore from "../zustand/sessionStore";

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const PREFETCH_THRESHOLD = 10;

type SwipeDirection = "left" | "right" | "up";

export default function SwipeScreen() {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [loading, setLoading] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);

	const [likedCount, setLikedCount] = useState(0);
	const [dislikedCount, setDislikedCount] = useState(0);
	const [skippedCount, setSkippedCount] = useState(0);

	const router = useRouter();
	const currentUser = useSessionStore((state) => state.user);

	const translateX = useSharedValue(0);
	const translateY = useSharedValue(0);
	const dummyTranslate = useSharedValue(0);
	const nextCardScale = useSharedValue(0.9);

	const currentIndexRef = useRef(0);
	const moviesRef = useRef<Movie[]>([]);
	const tapStartTime = useRef(0);
	const isAnimatingRef = useRef(false);
	const isFetchingMoreRef = useRef(false);
	const seenMovieIdsRef = useRef<Set<number>>(new Set());

	useEffect(() => {
		currentIndexRef.current = currentIndex;
	}, [currentIndex]);

	useEffect(() => {
		moviesRef.current = movies;
	}, [movies]);

	useEffect(() => {
		const remaining = movies.length - currentIndex;
		if (
			remaining > PREFETCH_THRESHOLD ||
			movies.length === 0 ||
			isFetchingMoreRef.current
		)
			return;

		isFetchingMoreRef.current = true;
		fetchMovies()
			.then((newMovies) => {
				const fresh = newMovies.filter(
					(m) => !seenMovieIdsRef.current.has(m.id)
				);
				fresh.forEach((m) => seenMovieIdsRef.current.add(m.id));
				if (fresh.length > 0) {
					setMovies((prev) => [...prev, ...fresh]);
				}
				isFetchingMoreRef.current = false;
			})
			.catch(() => {
				isFetchingMoreRef.current = false;
			});
	}, [currentIndex, movies.length]);

	useEffect(() => {
		const load = async () => {
			try {
				const res = await fetchMovies();
				res.forEach((m) => seenMovieIdsRef.current.add(m.id));
				setMovies(res);
			} catch (err) {
				console.error("Erreur lors du chargement des films :", err);
			} finally {
				setLoading(false);
			}
		};

		load();
	}, []);

	useLayoutEffect(() => {
		translateX.value = 0;
		translateY.value = 0;
	}, [currentIndex, translateX, translateY]);

	// Runs on JS thread — no runOnJS needed
	const handleSwipeComplete = useCallback(
		(direction: SwipeDirection) => {
			const movie = moviesRef.current[currentIndexRef.current];
			if (!movie) return;

			const apiDirection =
				direction === "right"
					? "like"
					: direction === "left"
						? "dislike"
						: "skip";
			postSwipe(movie.id, apiDirection);

			if (apiDirection === "like" || apiDirection === "dislike") {
				const rating = apiDirection === "like" ? 8 : 2;
				postFeedback(movie.id, currentUser.id, rating);
			}

			if (direction === "right") setLikedCount((n) => n + 1);
			else if (direction === "left") setDislikedCount((n) => n + 1);
			else setSkippedCount((n) => n + 1);

			setCurrentIndex((prev) => prev + 1);
			nextCardScale.value = withTiming(0.95, { duration: 400 });
			isAnimatingRef.current = false;
			setIsAnimating(false);
		},
		[nextCardScale]
	);

	const forceSwipe = useCallback(
		(direction: SwipeDirection) => {
			if (isAnimatingRef.current) return;
			isAnimatingRef.current = true;
			setIsAnimating(true);

			const targets: Record<SwipeDirection, { x: number; y: number }> = {
				right: { x: SCREEN_WIDTH * 1.5, y: 0 },
				left: { x: -SCREEN_WIDTH * 1.5, y: 0 },
				up: { x: 0, y: -SCREEN_HEIGHT * 1.5 }
			};

			translateX.value = withTiming(targets[direction].x, {
				duration: SWIPE_OUT_DURATION
			});

			translateY.value = withTiming(
				targets[direction].y,
				{
					duration: SWIPE_OUT_DURATION
				},
				() => {
					runOnJS(handleSwipeComplete)(direction);
				}
			);
		},
		[handleSwipeComplete, translateX, translateY]
	);

	const resetPosition = useCallback(() => {
		translateX.value = withSpring(0, { damping: 15 });
		translateY.value = withSpring(0, { damping: 15 });
		nextCardScale.value = withTiming(0.95, { duration: 300 });
	}, [nextCardScale, translateX, translateY]);

	const panResponder = useRef(
		PanResponder.create({
			onStartShouldSetPanResponder: () => true,
			onMoveShouldSetPanResponder: () => true,

			onPanResponderGrant: () => {
				tapStartTime.current = Date.now();
			},

			onPanResponderMove: (_, gesture) => {
				if (isAnimatingRef.current) return;
				translateX.value = gesture.dx;
				translateY.value = gesture.dy;

				const progress = Math.min(
					Math.sqrt(gesture.dx ** 2 + gesture.dy ** 2) /
						SWIPE_THRESHOLD,
					1
				);
				nextCardScale.value = 0.95 + 0.05 * progress;
			},

			// PanResponder callbacks are already on the JS thread — no runOnJS needed
			onPanResponderRelease: (_, gesture) => {
				if (isAnimatingRef.current) return;
				const tapDuration = Date.now() - tapStartTime.current;
				const isTab =
					Math.abs(gesture.dx) < 10 &&
					Math.abs(gesture.dy) < 10 &&
					tapDuration < 300;

				if (isTab) {
					const movie = moviesRef.current[currentIndexRef.current];
					if (movie) {
						translateX.value = 0;
						translateY.value = 0;
						router.push({
							pathname: "/(app)/(tabs)/movie/[id]",
							params: { id: movie.id.toString() }
						});
					}
					return;
				}

				const absDx = Math.abs(gesture.dx);
				const absDy = Math.abs(gesture.dy);

				if (absDy > absDx) {
					if (gesture.dy < -SWIPE_THRESHOLD) {
						forceSwipe("up");
					} else {
						resetPosition();
					}
				} else {
					if (gesture.dx > SWIPE_THRESHOLD) {
						forceSwipe("right");
					} else if (gesture.dx < -SWIPE_THRESHOLD) {
						forceSwipe("left");
					} else {
						resetPosition();
					}
				}
			}
		})
	).current;

	const handleDislike = useCallback(() => forceSwipe("left"), [forceSwipe]);
	const handleSkip = useCallback(() => forceSwipe("up"), [forceSwipe]);
	const handleLike = useCallback(() => forceSwipe("right"), [forceSwipe]);

	const visibleMovies = movies.slice(currentIndex, currentIndex + 3);
	const hasEnded =
		!loading && currentIndex >= movies.length && movies.length > 0;
	const hasMovies =
		!loading && movies.length > 0 && currentIndex < movies.length;

	if (loading) {
		return <MovieLoader />;
	}

	if (movies.length === 0) {
		return (
			<View style={styles.centered}>
				<Text style={styles.endText}>Aucun film disponible</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.cardContainer}>
				{hasEnded ? (
					<View style={styles.centered}>
						<Text style={styles.endTitle}>C'est tout !</Text>
						<View style={styles.endStats}>
							<View style={styles.endText}>
								<Text style={styles.btnIconEndStats}>
									<Ionicons
										name="close"
										size={50}
										color="#ef4444"
									/>
								</Text>
								<Text
									style={[
										styles.btnLabelEndStats,
										{ color: "#ef4444" }
									]}>
									J'AIME PAS
								</Text>
								<Text
									style={[
										styles.LabelEndStats,
										,
										{ color: "#ef4444" }
									]}>
									{dislikedCount}
								</Text>
							</View>
							<View style={styles.endText}>
								<Text style={styles.btnIconEndStats}>
									<Ionicons
										name="eye-off"
										size={50}
										color="#fbbf24"
									/>
								</Text>
								<Text
									style={[
										styles.btnLabelEndStats,
										{ color: "#fbbf24" }
									]}>
									PAS VU
								</Text>
								<Text
									style={[
										styles.LabelEndStats,
										{ color: "#fbbf24" }
									]}>
									{skippedCount}
								</Text>
							</View>
							<View style={styles.endText}>
								<Text style={styles.btnIconEndStats}>
									<Ionicons
										name="heart"
										size={50}
										color="#22c55e"
									/>
								</Text>
								<Text
									style={[
										styles.btnLabelEndStats,
										{ color: "#22c55e" }
									]}>
									J'AIME
								</Text>
								<Text
									style={[
										styles.LabelEndStats,
										{ color: "#22c55e" }
									]}>
									{likedCount}
								</Text>
							</View>
						</View>
					</View>
				) : (
					[...visibleMovies].reverse().map((movie, ReverseIndex) => {
						const index = visibleMovies.length - 1 - ReverseIndex;
						return (
							<SwipeCard
								key={`${movie.id}-${currentIndex + index}`}
								movie={movie}
								index={index}
								totalCards={visibleMovies.length}
								panHandlers={
									index === 0 ? panResponder.panHandlers : {}
								}
								translateX={
									index === 0 ? translateX : dummyTranslate
								}
								translateY={
									index === 0 ? translateY : dummyTranslate
								}
								nextCardScale={
									index === 1 ? nextCardScale : dummyTranslate
								}
							/>
						);
					})
				)}
			</View>

			{hasMovies && (
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style={styles.dislikeBtn}
						onPress={handleDislike}
						disabled={isAnimating}
						activeOpacity={0.8}>
						<Text style={styles.btnIcon}>
							<Ionicons name="close" size={28} color="#ef4444" />
						</Text>
						<Text style={[styles.btnLabel, { color: "#ef4444" }]}>
							J'AIME PAS
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.skipBtn}
						onPress={handleSkip}
						disabled={isAnimating}
						activeOpacity={0.8}>
						<Text style={styles.btnIcon}>
							<Ionicons
								name="eye-off"
								size={24}
								color="#fbbf24"
							/>
						</Text>
						<Text style={[styles.btnLabel, { color: "#fbbf24" }]}>
							PAS VU
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={styles.likeBtn}
						onPress={handleLike}
						disabled={isAnimating}
						activeOpacity={0.8}>
						<Text style={styles.btnIcon}>
							<Ionicons name="heart" size={28} color="#22c55e" />
						</Text>
						<Text style={[styles.btnLabel, { color: "#22c55e" }]}>
							J'AIME
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
}
