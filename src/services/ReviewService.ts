import { ApiHelper } from "@/src/utils/axios";
import Review from "@/src/models/Review";

const createReview = async (review: Review) => {
	try {
		const response = await ApiHelper.post("/review/", {
			id: "",
			rating: review.rating,
			comment: review.comment,
			has_spoiler: review.isSpoiler,
			movie_id: review.mediaId,
			tv_id: null,
			tv_episode_id: null,
			user_id: review.userId,
			created_at: Date.now()
		});
		if (response.success) {
			return {
				success: true,
				message: response.data
			};
		}
		return {
			success: false,
			message: response.data
		};
	} catch (error: any) {
		return {
			success: false,
			// @ts-ignore
			message: error.detail
		};
	}
};

export default createReview;
