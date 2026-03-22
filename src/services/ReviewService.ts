import { ApiHelper } from "@/src/utils/axios";
import Review from "@/src/models/Review";

/**
 * Create a review for a movie
 * @param review Review object containing rating, comment, user info, etc.
 * @returns Response indicating success or failure
 */
export const createReview = async (review: Review) => {
	try {
		// Send POST request to create a new review
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

		// Handle API response
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
		// Return error detail if request fails
		return {
			success: false,
			// @ts-ignore
			message: error.detail
		};
	}
};

/**
 * Fetch all reviews related to a specific movie
 * @param mediaId ID of the movie to get reviews for
 * @returns Array of reviews with success indicator
 */
export const getReviewsByMedia = async (mediaId: number) => {
	try {
		// Send GET request to retrieve reviews for the given movie ID
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
		// Return empty array in case of request failure
		return {
			data: [],
			success: false
		};
	}
};
