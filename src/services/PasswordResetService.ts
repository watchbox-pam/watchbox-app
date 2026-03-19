import { ApiHelper } from "@/src/utils/axios";
import UserPassword from "@/src/models/UserPassword";
import { Encryption } from "@/src/utils/encryption";

export async function sendPasswordResetEmail(email: string): Promise<boolean> {
	try {
		const result = await ApiHelper.post(`/users/forgot-password`, {
			email
		});
		return result.data;
	} catch (error: any) {
		console.error(error);
		return false;
	}
}

export async function checkPasswordResetTokenValidity(token: string) {
	try {
		const result = await ApiHelper.post(
			`/users/check-password-reset-token`,
			{
				token
			}
		);
		return result.data;
	} catch (error: any) {
		console.error(error);
		return "";
	}
}

export async function resetUserPassword(data: UserPassword) {
	try {
		// Validate all required fields
		if (!data.password) {
			return {
				success: false,
				message: "Le mot de passe est requis",
				element: "password"
			};
		}
		if (data.password !== data.confirmPassword) {
			return {
				success: false,
				message: "Les mots de passe ne sont pas identiques",
				element: "password,confirmPassword"
			};
		}

		// Hashing password with custom logic (double hash + salt)
		const firstHash = await Encryption.encryptPassword(data.password);
		const salt = await Encryption.randomString(32);
		const hashedPassword = await Encryption.encryptPassword(
			firstHash + salt
		);

		// Prepare registration data and call API
		const result = await ApiHelper.post("/users/reset-password", {
			id: data.id,
			password: hashedPassword,
			salt: salt
		});

		// Handle successful registration
		if (result.success) {
			return {
				success: true,
				message: {
					id: result.data.user_id,
					token: result.data.token
				}
			};
		} else {
			// API call failed
			return {
				success: false,
				message: result.data
			};
		}
	} catch (error) {
		// Catch any unexpected error and return detail if available
		return {
			success: false,
			// @ts-ignore
			message: error.detail
		};
	}
}
