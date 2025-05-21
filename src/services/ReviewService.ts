import { ApiHelper } from "@/src/utils/axios";
import Review from "@/src/models/Review";

export const createReview = async (review: Review) => {
	try {
		const response = await ApiHelper.post("/reviews", {
			id: "",
			rating: review.rating,
			comment: review.comment,
			isSpoiler: review.isSpoiler,
			movieId: review.mediaId,
			tvId: null,
			tvEpisodeId: null,
			userId: review.userId,
			createdAt: Date.now(),
			user: {
				username: "",
				picture: ""
			}
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

export const getReviewsByMedia = async (mediaId: number) => {
	try {
		const response = await ApiHelper.get(`/reviews/movie/${mediaId}`);
		if (response.success) {
			return {
				data: response.data,
				success: true
			};
		} else {
			return {
				data: [],
				success: false
			};
		}
	} catch (error: any) {
		return {
			data: [],
			success: false
		};
	}
};
