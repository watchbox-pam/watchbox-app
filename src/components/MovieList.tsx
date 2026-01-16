import React from "react";
import { Link } from "expo-router";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	ActivityIndicator,
	RefreshControl
} from "react-native";
import StyledText from "./StyledText";
import styles from "@/src/styles/MovieListStyle";

interface Movie {
	id: number;
	title: string;
	poster_path: string | null;
}

interface Emotion {
	id: number;
	label: string;
	value: string;
	startAngle: number;
	endAngle: number;
	color: string;
}

interface MovieListProps {
	movies: Movie[];
	loading: boolean;
	error: string | null;
	selectedEmotion: Emotion | null;
	onRetry: () => void;
	onBack: () => void;
	refreshing: boolean;
	onRefresh: () => void;
}

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieList: React.FC<MovieListProps> = ({
	movies,
	loading,
	error,
	selectedEmotion,
	onRetry,
	onBack,
	refreshing,
	onRefresh
}) => {
	const renderMovieItem = ({ item }: { item: Movie }) => (
		<Link
			href={{
				pathname: "/(app)/(tabs)/movie/[id]",
				params: { id: item.id }
			}}
			style={styles.movieCard}>
			<View style={styles.imagePosterContainer}>
				{item.poster_path ? (
					<Image
						source={{
							uri: `${TMDB_IMAGE_BASE_URL}${item.poster_path}`
						}}
						style={styles.poster}
					/>
				) : (
					<View style={styles.noPoster}>
						<Text style={styles.noPosterText}>Pas d'image</Text>
					</View>
				)}
			</View>
			<StyledText
				style={styles.movieTitle}
				numberOfLines={2}
				testID="movie-title">
				{item.title}
			</StyledText>
		</Link>
	);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TouchableOpacity
					style={[
						styles.backButton,
						selectedEmotion
							? { backgroundColor: selectedEmotion.color }
							: {}
					]}
					onPress={onBack}
					activeOpacity={0.7}>
					<Text style={styles.backButtonText}>←</Text>
				</TouchableOpacity>
				<Text style={styles.headerTitle}>
					Films pour: {selectedEmotion?.label || ""}
				</Text>
			</View>

			{loading ? (
				<View style={styles.loadingContainer}>
					<ActivityIndicator
						size="large"
						color={
							selectedEmotion ? selectedEmotion.color : "#ffffff"
						}
					/>
					<Text style={styles.loadingText}>
						Recherche de films...
					</Text>
				</View>
			) : error ? (
				<View style={styles.errorContainer}>
					<Text style={styles.errorText}>{error}</Text>
					<TouchableOpacity
						style={[
							styles.retryButton,
							selectedEmotion
								? { backgroundColor: selectedEmotion.color }
								: {}
						]}
						onPress={onRetry}>
						<Text style={styles.retryButtonText}>Réessayer</Text>
					</TouchableOpacity>
				</View>
			) : (
				<FlatList
					data={movies}
					renderItem={renderMovieItem}
					keyExtractor={(item) => item.id.toString()}
					contentContainerStyle={styles.moviesList}
					numColumns={2}
					showsVerticalScrollIndicator={true}
					showsHorizontalScrollIndicator={false}
					columnWrapperStyle={styles.columnWrapper}
					extraData={movies}
					refreshControl={
						<RefreshControl
							refreshing={refreshing}
							onRefresh={onRefresh}
						/>
					}
				/>
			)}
		</View>
	);
};

export default MovieList;
