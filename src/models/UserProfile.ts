type UserProfile = {
	id: string;
	username: string;
	email: string;
	country: string;
	birthdate: Date;
	profile_picture_path: string;
	banner_path: string;
	is_private: boolean;
	history_private: boolean;
	adult_content: boolean;
	last_connection: Date;
	created_at: Date;
};

export default UserProfile;
