import { ApiHelper } from "@/src/utils/axios";

export type ApiQuestion = {
	id: number;
	question_type: string;
	question_text: string;
	answers: string[];
	answer_images: (string | null)[] | null;
	correct_answer: string;
	image_path: string | null;
};

export type AnswerPayload = {
	question_id: number;
	answer: string;
	time_taken: number;
};

export type QuizResult = {
	total_points: number;
	correct_count: number;
	new_global_score: number;
	new_genre_score: number;
	global_level: number;
	question_results: {
		question_id: number;
		correct: boolean;
		points_earned: number;
		correct_answer: string;
	}[];
};

export type LeaderboardEntry = {
	rank: number;
	user_id: string;
	username: string;
	picture: string | null;
	total_score: number;
	level: number;
};

export async function fetchQuizQuestions(genre: string) {
	return ApiHelper.get(`/quiz/questions/${genre}`);
}

export async function submitQuizAnswers(
	genre_slug: string,
	answers: AnswerPayload[]
) {
	return ApiHelper.post("/quiz/submit", { genre_slug, answers });
}

export async function fetchLeaderboard() {
	return ApiHelper.get("/quiz/leaderboard");
}

export async function fetchUserScores() {
	return ApiHelper.get("/quiz/scores");
}
