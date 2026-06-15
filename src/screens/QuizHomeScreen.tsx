import { useState, useCallback } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	ImageSourcePropType,
	Modal,
	FlatList,
	ActivityIndicator
} from "react-native";
import { router, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import BackButton from "../components/BackButton";
import styles from "@/src/styles/QuizHomeStyle";
import {
	fetchUserScores,
	fetchLeaderboard,
	type LeaderboardEntry
} from "@/src/services/QuizService";

type Genre = {
	slug: string;
	name: string;
	image: ImageSourcePropType;
};

const GENRES: Genre[] = [
	{
		slug: "horreur",
		name: "HORREUR",
		image: require("../assets/images/Emotion/the-shining.png")
	},
	{
		slug: "aventure",
		name: "AVENTURE",
		image: require("../assets/images/Emotion/jurassic-park.jpg")
	},
	{
		slug: "action",
		name: "ACTION",
		image: require("../assets/images/Emotion/avengers.jpg")
	},
	{
		slug: "comedie",
		name: "COMÉDIE",
		image: require("../assets/images/Emotion/asterix.png")
	},
	{
		slug: "drame",
		name: "DRAME",
		image: require("../assets/images/Emotion/forrest-gump.png")
	},
	{
		slug: "thriller",
		name: "THRILLER",
		image: require("../assets/images/Emotion/oppenheimer.jpeg")
	},
	{
		slug: "animation",
		name: "ANIMATION",
		image: require("../assets/images/Emotion/up.jpg")
	},
	{
		slug: "romance",
		name: "ROMANCE",
		image: require("../assets/images/Emotion/titanic.png")
	}
];

function computeLevel(score: number) {
	return Math.floor(Math.sqrt(score) / 10);
}

function levelProgress(score: number) {
	const level = computeLevel(score);
	const start = (level * 10) ** 2;
	const end = ((level + 1) * 10) ** 2;
	return (score - start) / (end - start);
}

const RANK_EMOJIS: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function QuizHomeScreen() {
	const [globalScore, setGlobalScore] = useState(0);
	const [leaderboardVisible, setLeaderboardVisible] = useState(false);
	const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
	const [leaderboardLoading, setLeaderboardLoading] = useState(false);

	useFocusEffect(
		useCallback(() => {
			fetchUserScores().then((res) => {
				if (res.success) setGlobalScore(res.data.global_score ?? 0);
			});
		}, [])
	);

	const openLeaderboard = async () => {
		setLeaderboardVisible(true);
		setLeaderboardLoading(true);
		const res = await fetchLeaderboard();
		if (res.success) setLeaderboard(res.data);
		setLeaderboardLoading(false);
	};

	const level = computeLevel(globalScore);
	const progress = levelProgress(globalScore);
	const levelStart = (level * 10) ** 2;
	const levelEnd = ((level + 1) * 10) ** 2;

	return (
		<>
			<ScrollView
				style={styles.container}
				contentContainerStyle={{ paddingBottom: 40 }}
				showsVerticalScrollIndicator={false}>
				<View style={styles.header}>
					<BackButton />
					<View style={styles.headerTitle}>
						<Text style={styles.headerTitleTop}>The Absolute</Text>
						<Text style={styles.headerTitleMain}>Quiz</Text>
					</View>
					<View style={{ width: 45 }} />
				</View>

				<View style={styles.hero}>
					<Image
						source={require("../assets/images/scorsese.png")}
						style={styles.heroImage}
					/>
				</View>

				<View style={styles.scoreCard}>
					<View style={styles.scoreRow}>
						<View style={styles.scoreLabelRow}>
							<Text style={styles.scoreLabel}>Ton score</Text>
							<Text style={styles.scoreEmoji}> 🎯</Text>
						</View>
						<Text style={styles.scorePoints}>
							{globalScore} points
						</Text>
					</View>
					<View style={styles.progressBarBg}>
						<View
							style={[
								styles.progressBarFill,
								{ width: `${Math.min(progress * 100, 100)}%` }
							]}
						/>
					</View>
					<Text style={styles.levelText}>
						niv. {level} — {globalScore - levelStart} /{" "}
						{levelEnd - levelStart} pts
					</Text>
				</View>

				<TouchableOpacity
					style={styles.leaderboardButton}
					activeOpacity={0.8}
					onPress={openLeaderboard}>
					<View style={styles.leaderboardIcon}>
						<MaterialIcons
							name="bar-chart"
							size={20}
							color="#fff"
						/>
					</View>
					<Text style={styles.leaderboardText}>
						Voir le classement
					</Text>
					<MaterialIcons
						name="chevron-right"
						size={26}
						color="#fff"
					/>
				</TouchableOpacity>

				<Text style={styles.sectionTitle}>Genres</Text>

				<View style={styles.genreGrid}>
					{GENRES.map((genre) => (
						<TouchableOpacity
							key={genre.slug}
							style={styles.genreCard}
							activeOpacity={0.85}
							onPress={() =>
								router.push(`/(app)/quiz/${genre.slug}` as any)
							}>
							<Image
								source={genre.image}
								style={styles.genreImage}
							/>
							<LinearGradient
								colors={["transparent", "rgba(0,0,0,0.75)"]}
								style={styles.genreOverlay}>
								<Text style={styles.genreName}>
									{genre.name}
								</Text>
							</LinearGradient>
						</TouchableOpacity>
					))}
				</View>
			</ScrollView>

			<Modal
				visible={leaderboardVisible}
				transparent
				animationType="slide"
				onRequestClose={() => setLeaderboardVisible(false)}>
				<TouchableOpacity
					style={styles.modalOverlay}
					activeOpacity={1}
					onPress={() => setLeaderboardVisible(false)}>
					<View style={styles.modalContent}>
						<View style={styles.modalHandle} />
						<Text style={styles.modalTitle}>
							Classement mondial 🌍
						</Text>

						{leaderboardLoading ? (
							<ActivityIndicator
								size="large"
								color="#AC2821"
								style={{ marginVertical: 32 }}
							/>
						) : (
							<FlatList
								data={leaderboard}
								keyExtractor={(item) => item.user_id}
								renderItem={({ item, index }) => (
									<View
										style={[
											styles.leaderboardRow,
											index % 2 === 1 &&
												styles.leaderboardRowAlt
										]}>
										<Text
											style={[
												styles.leaderboardRank,
												index < 3 &&
													styles.leaderboardRankTop
											]}>
											{RANK_EMOJIS[index + 1] ??
												`${index + 1}`}
										</Text>
										<Text
											style={styles.leaderboardUsername}>
											{item.username}
										</Text>
										<View>
											<Text
												style={styles.leaderboardScore}>
												{item.total_score} pts
											</Text>
											<Text
												style={styles.leaderboardLevel}>
												niv. {item.level}
											</Text>
										</View>
									</View>
								)}
							/>
						)}
					</View>
				</TouchableOpacity>
			</Modal>
		</>
	);
}
