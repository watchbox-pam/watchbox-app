type Review = {
	id: number;
	userId: string;
	mediaId: string;
	rating?: number | null;
	comment?: string | null;
	isSpoiler: boolean;
	user?: {
		username: string;
		picture: string;
	} | null;
};

export default Review;
