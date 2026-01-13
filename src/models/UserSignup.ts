type UserSignup = {
	id: string;
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	country?: string;
	birthdate: Date | null;
};

export default UserSignup;
