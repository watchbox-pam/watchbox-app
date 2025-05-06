type Review = {
	userId: string;
	mediaId: string;
	rating?: number | null;
	comment?: string | null;
	isSpoiler: boolean;
};

export default Review;
