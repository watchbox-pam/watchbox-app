import { useState, useEffect, useRef, useCallback } from "react";
import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	ActivityIndicator,
	Modal
} from "react-native";
import Toast from "react-native-toast-message";
import { useLocalSearchParams, router } from "expo-router";
import { useNavigation, NavigationAction } from "@react-navigation/native";
import BackButton from "../components/BackButton";
import styles from "@/src/styles/QuizGameStyle";
import {
	fetchQuizQuestions,
	submitQuizAnswers,
	type ApiQuestion,
	type AnswerPayload,
	type QuizResult
} from "@/src/services/QuizService";

const GENRE_LABELS: Record<string, string> = {
	horreur: "HORREUR",
	aventure: "AVENTURE",
	action: "ACTION",
	comedie: "COMÉDIE",
	drame: "DRAME",
	thriller: "THRILLER",
	animation: "ANIMATION",
	romance: "ROMANCE"
};

const TOTAL_QUESTIONS = 10;
const TIMER_MAX = 30;

const TMDB_IMAGE = "https://image.tmdb.org/t/p/w780";

export default function QuizGameScreen() {
	const { genre } = useLocalSearchParams<{ genre: string }>();
	const genreLabel = GENRE_LABELS[genre ?? ""] ?? (genre ?? "").toUpperCase();

	const [questions, setQuestions] = useState<ApiQuestion[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
	const [validated, setValidated] = useState(false);
	const [timer, setTimer] = useState(TIMER_MAX);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [quizDone, setQuizDone] = useState(false);
	const [result, setResult] = useState<QuizResult | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [submitError, setSubmitError] = useState(false);

	const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const startTimeRef = useRef(Date.now());
	const answersRef = useRef<AnswerPayload[]>([]);
	const questionsRef = useRef<ApiQuestion[]>([]);
	const currentIndexRef = useRef(0);
	const validatedRef = useRef(false);
	const selectedAnswerRef = useRef<string | null>(null);
	const mountedRef = useRef(true);
	const pendingActionRef = useRef<NavigationAction | null>(null);
	const [quitModalVisible, setQuitModalVisible] = useState(false);

	const navigation = useNavigation();

	useEffect(() => {
		if (loading || quizDone) return;
		const unsubscribe = navigation.addListener("beforeRemove", (e) => {
			e.preventDefault();
			pendingActionRef.current = e.data.action;
			setQuitModalVisible(true);
		});
		return unsubscribe;
	}, [navigation, loading, quizDone]);

	const confirmQuit = () => {
		setQuitModalVisible(false);
		if (pendingActionRef.current) {
			navigation.dispatch(pendingActionRef.current);
		}
	};

	const clearTimer = () => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
	};

	const startTimer = useCallback(() => {
		clearTimer();
		validatedRef.current = false;
		selectedAnswerRef.current = null;
		startTimeRef.current = Date.now();
		setTimer(TIMER_MAX);
		setSelectedAnswer(null);
		setValidated(false);

		timerRef.current = setInterval(() => {
			setTimer((prev) => {
				const next = prev - 1;
				if (next <= 0) {
					clearTimer();
					if (!validatedRef.current) {
						doValidate(null);
					}
					return 0;
				}
				return next;
			});
		}, 1000);
	}, []);

	const doValidate = useCallback(
		(answer: string | null) => {
			if (validatedRef.current) return;
			validatedRef.current = true;
			clearTimer();

			const timeTaken = Math.min(
				(Date.now() - startTimeRef.current) / 1000,
				TIMER_MAX
			);
			const question = questionsRef.current[currentIndexRef.current];
			if (!question) return;

			answersRef.current = [
				...answersRef.current,
				{
					question_id: question.id,
					answer: answer ?? "",
					time_taken: timeTaken
				}
			];

			setValidated(true);

			setTimeout(() => {
				if (!mountedRef.current) return;
				const nextIndex = currentIndexRef.current + 1;
				if (nextIndex >= questionsRef.current.length) {
					handleSubmit();
				} else {
					currentIndexRef.current = nextIndex;
					setCurrentIndex(nextIndex);
					startTimer();
				}
			}, 1500);
		},
		[startTimer]
	);

	const handleSubmit = async () => {
		if (!mountedRef.current) return;
		setSubmitError(false);
		setSubmitting(true);
		const res = await submitQuizAnswers(genre!, answersRef.current);
		if (!mountedRef.current) return;
		if (res.success) {
			setResult(res.data);
			setQuizDone(true);
		} else {
			setSubmitting(false);
			setSubmitError(true);
			Toast.show({
				type: "error",
				text1: "Erreur de connexion",
				text2: "Impossible d'envoyer tes réponses."
			});
		}
		setSubmitting(false);
	};

	const loadQuestions = useCallback(async () => {
		clearTimer();
		setLoading(true);
		setError(null);
		setCurrentIndex(0);
		setSelectedAnswer(null);
		setValidated(false);
		setQuizDone(false);
		setResult(null);
		setSubmitting(false);
		setSubmitError(false);
		answersRef.current = [];
		currentIndexRef.current = 0;
		validatedRef.current = false;
		selectedAnswerRef.current = null;

		const res = await fetchQuizQuestions(genre!);
		if (!mountedRef.current) return;
		if (res.success && Array.isArray(res.data) && res.data.length > 0) {
			questionsRef.current = res.data;
			setQuestions(res.data);
			setLoading(false);
			startTimer();
		} else if (
			!res.success &&
			res.data ===
				"Questions en cours de préparation, réessaie dans quelques secondes."
		) {
			setError("Questions en cours de génération…");
			setLoading(false);
			setTimeout(() => {
				if (mountedRef.current) loadQuestions();
			}, 8000);
		} else {
			setError("Impossible de charger les questions.");
			setLoading(false);
		}
	}, [genre, startTimer]);

	useEffect(() => {
		mountedRef.current = true;
		loadQuestions();
		return () => {
			mountedRef.current = false;
			clearTimer();
		};
	}, [genre]);

	const handleSelectAnswer = (answer: string) => {
		if (validatedRef.current) return;
		selectedAnswerRef.current = answer;
		setSelectedAnswer(answer);
	};

	const handleValidate = () => {
		if (!selectedAnswerRef.current || validatedRef.current) return;
		doValidate(selectedAnswerRef.current);
	};

	const getAnswerStyle = (answer: string) => {
		const question = questions[currentIndex];
		if (!validated) {
			return selectedAnswer === answer
				? [styles.answerButton, styles.answerButtonSelected]
				: styles.answerButton;
		}
		if (answer === question?.correct_answer) {
			return [styles.answerButton, styles.answerButtonCorrect];
		}
		if (answer === selectedAnswer) {
			return [styles.answerButton, styles.answerButtonWrong];
		}
		return styles.answerButton;
	};

	const currentQuestion = questions[currentIndex];
	const timerProgress = timer / TIMER_MAX;

	if (loading) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<ActivityIndicator size="large" color="#AC2821" />
				<Text style={styles.loadingText}>
					Chargement des questions…
				</Text>
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, styles.loadingContainer]}>
				<Text style={styles.errorText}>{error}</Text>
				<TouchableOpacity
					style={styles.validateButton}
					onPress={loadQuestions}>
					<Text style={styles.validateText}>Réessayer</Text>
				</TouchableOpacity>
			</View>
		);
	}

	if (submitError) {
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<BackButton />
					<View style={styles.headerTitle}>
						<Text style={styles.headerGenre}>{genreLabel}</Text>
						<Text style={styles.headerQuiz}>Résultat</Text>
					</View>
					<View style={styles.headerSpacer} />
				</View>
				<View style={styles.resultContainer}>
					<Text style={styles.resultEmoji}>😞</Text>
					<Text style={styles.submitErrorTitle}>
						Erreur de connexion
					</Text>
					<Text style={styles.submitErrorMessage}>
						Tes réponses n'ont pas pu être envoyées.{"\n"}Vérifie ta
						connexion et réessaie.
					</Text>
					<TouchableOpacity
						style={styles.resultButtonPrimary}
						onPress={handleSubmit}>
						<Text style={styles.resultButtonText}>Réessayer</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}

	if (quizDone || submitting) {
		const correct = result?.correct_count ?? 0;
		const pts = result?.total_points ?? 0;
		const level = result?.global_level ?? 0;
		const emoji = correct >= 8 ? "🏆" : correct >= 5 ? "🎯" : "💪";

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<BackButton />
					<View style={styles.headerTitle}>
						<Text style={styles.headerGenre}>{genreLabel}</Text>
						<Text style={styles.headerQuiz}>Résultat</Text>
					</View>
					<View style={styles.headerSpacer} />
				</View>

				{submitting ? (
					<View style={styles.resultContainer}>
						<ActivityIndicator size="large" color="#AC2821" />
					</View>
				) : (
					<View style={styles.resultContainer}>
						<Text style={styles.resultEmoji}>{emoji}</Text>
						<Text style={styles.resultPoints}>+{pts}</Text>
						<Text style={styles.resultPointsLabel}>
							points gagnés
						</Text>
						<Text style={styles.resultCorrect}>
							{correct} / {questionsRef.current.length} bonnes
							réponses
						</Text>
						<Text style={styles.resultLevel}>Niveau {level}</Text>
						<View style={styles.resultButtonRow}>
							<TouchableOpacity
								style={styles.resultButtonSecondary}
								onPress={() => router.back()}>
								<Text style={styles.resultButtonText}>
									Retour
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.resultButtonPrimary}
								onPress={loadQuestions}>
								<Text style={styles.resultButtonText}>
									Rejouer
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		);
	}

	const isPosterGuess = currentQuestion?.question_type === "poster_guess";

	const imageUri = currentQuestion?.image_path
		? `${TMDB_IMAGE}${currentQuestion.image_path}`
		: null;
	const imageBlur = isPosterGuess && !validated ? 18 : 0;

	const getPosterAnswerStyle = (answer: string) => {
		const question = questions[currentIndex];
		if (!validated) {
			return selectedAnswer === answer
				? [styles.posterCard, styles.posterCardSelected]
				: styles.posterCard;
		}
		if (answer === question?.correct_answer) {
			return [styles.posterCard, styles.posterCardCorrect];
		}
		if (answer === selectedAnswer) {
			return [styles.posterCard, styles.posterCardWrong];
		}
		return styles.posterCard;
	};

	return (
		<ScrollView
			style={styles.container}
			contentContainerStyle={{ paddingBottom: 40 }}
			showsVerticalScrollIndicator={false}>
			<View style={styles.header}>
				<BackButton />
				<View style={styles.headerTitle}>
					<Text style={styles.headerGenre}>{genreLabel}</Text>
					<Text style={styles.headerQuiz}>Quiz</Text>
				</View>
				<View style={styles.headerSpacer} />
			</View>

			<View style={styles.progressRow}>
				{Array.from({
					length: questions.length || TOTAL_QUESTIONS
				}).map((_, i) => {
					const dotStyle = [
						styles.progressDot,
						i < currentIndex ? styles.progressDotDone : null,
						i === currentIndex ? styles.progressDotActive : null
					];
					return <View key={i} style={dotStyle} />;
				})}
			</View>

			<View style={styles.timerRow}>
				<View style={styles.timerBarBg}>
					<View
						style={[
							styles.timerBarFill,
							{ width: `${timerProgress * 100}%` }
						]}
					/>
				</View>
				<Text style={styles.timerText}>{timer}s</Text>
			</View>

			{imageUri != null ? (
				<View style={styles.movieImageContainer}>
					<Image
						source={{ uri: imageUri }}
						style={styles.movieImage}
						blurRadius={imageBlur}
					/>
				</View>
			) : null}

			{currentQuestion?.question_type === "same_director" ? (
				<View style={styles.sameDirectorBlock}>
					<Text style={styles.sameDirectorLabel}>
						Qui réalise ces 4 films ?
					</Text>
					{(
						currentQuestion.question_text.match(/"([^"]+)"/g) ?? []
					).map((t, i) => (
						<View key={i} style={styles.sameDirectorRow}>
							<Text style={styles.sameDirectorIndex}>
								{i + 1}
							</Text>
							<Text style={styles.sameDirectorTitle}>
								{t.replace(/"/g, "")}
							</Text>
						</View>
					))}
				</View>
			) : (
				<Text style={styles.question}>
					{currentQuestion?.question_text}
				</Text>
			)}

			{isPosterGuess ? (
				<View style={styles.posterGrid}>
					{currentQuestion?.answers.map((answer, index) => {
						const rawPath = currentQuestion.answer_images?.[index];
						const uri =
							rawPath != null ? `${TMDB_IMAGE}${rawPath}` : null;
						return (
							<TouchableOpacity
								key={index}
								style={getPosterAnswerStyle(answer)}
								activeOpacity={0.8}
								onPress={() => handleSelectAnswer(answer)}>
								{uri != null ? (
									<Image
										source={{ uri }}
										style={styles.posterCardImage}
									/>
								) : (
									<View
										style={styles.posterCardPlaceholder}
									/>
								)}
								{validated && (
									<View style={styles.posterCardLabel}>
										<Text
											style={styles.posterCardLabelText}
											numberOfLines={2}>
											{answer}
										</Text>
									</View>
								)}
							</TouchableOpacity>
						);
					})}
				</View>
			) : (
				<View style={styles.answersContainer}>
					{currentQuestion?.answers.map((answer, index) => (
						<TouchableOpacity
							key={index}
							style={getAnswerStyle(answer)}
							activeOpacity={0.8}
							onPress={() => handleSelectAnswer(answer)}>
							<Text style={styles.answerText}>{answer}</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			<TouchableOpacity
				style={[
					styles.validateButton,
					(!selectedAnswer || validated) &&
						styles.validateButtonDisabled
				]}
				activeOpacity={0.8}
				onPress={handleValidate}
				disabled={!selectedAnswer || validated}>
				<Text style={styles.validateText}>Valider ta réponse</Text>
			</TouchableOpacity>

			<Modal
				visible={quitModalVisible}
				transparent
				animationType="fade"
				onRequestClose={() => setQuitModalVisible(false)}>
				<View style={styles.quitModalOverlay}>
					<View style={styles.quitModalCard}>
						<Text style={styles.quitModalTitle}>
							Quitter le quiz ?
						</Text>
						<Text style={styles.quitModalMessage}>
							Ta progression sera perdue. Les points ne sont
							comptabilisés qu'en fin de quiz.
						</Text>
						<View style={styles.quitModalButtons}>
							<TouchableOpacity
								style={styles.quitModalContinue}
								onPress={() => setQuitModalVisible(false)}
								activeOpacity={0.8}>
								<Text style={styles.quitModalButtonText}>
									Continuer
								</Text>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.quitModalQuit}
								onPress={confirmQuit}
								activeOpacity={0.8}>
								<Text style={styles.quitModalButtonText}>
									Quitter
								</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</Modal>
		</ScrollView>
	);
}
