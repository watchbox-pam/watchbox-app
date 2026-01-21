import UserSignup from "@/src/models/UserSignup";
import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import Country from "@/src/models/Country";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

/**
 * Register a new user in the system
 * @param user UserSignup object containing registration info
 * @returns Object indicating success or failure with appropriate messages
 */
export async function registerUser(user: UserSignup) {
	try {
		// Validate all required fields
		if (!user.username) {
			return {
				success: false,
				message: "Le pseudo est requis",
				element: "username"
			};
		}
		if (!user.email) {
			return {
				success: false,
				message: "L'adresse mail est requise",
				element: "email"
			};
		}
		if (!user.password) {
			return {
				success: false,
				message: "Le mot de passe est requis",
				element: "password"
			};
		}
		if (!user.country) {
			return {
				success: false,
				message: "Le pays est requis",
				element: "country"
			};
		}
		if (!user.birthdate) {
			return {
				success: false,
				message: "La date de naissance est requise",
				element: "birthdate"
			};
		}
		if (user.password !== user.confirmPassword) {
			return {
				success: false,
				message: "Les mots de passe ne sont pas identiques",
				element: "password,confirmPassword"
			};
		}

		// Hashing password with custom logic (double hash + salt)
		const firstHash = await Encryption.encryptPassword(user.password);
		const salt = await Encryption.randomString(32);
		const hashedPassword = await Encryption.encryptPassword(
			firstHash + salt
		);

		// Prepare registration data and call API
		const result = await ApiHelper.post("/users/signup", {
			id: "",
			username: user.username,
			email: user.email,
			password: hashedPassword,
			salt: salt,
			country: user.country,
			birthdate: new Date(user.birthdate).toISOString().split("T")[0]
		});

		// Handle successful registration
		if (result.success) {
			// Store credentials securely depending on platform
			if (Platform.OS === "ios" || Platform.OS === "android") {
				await SecureStore.setItemAsync(
					"verification_code_token",
					result.data.verification_code_token
				);
				await SecureStore.setItemAsync("identifier", user.username);
				await SecureStore.setItemAsync("id", result.data.user_id);
				await SecureStore.setItemAsync(
					"token",
					JSON.stringify(result.data.token)
				);
			} else {
				localStorage.setItem(
					"verification_code_token",
					result.data.verification_code_token
				);
				localStorage.setItem("id", result.data.user_id);
				localStorage.setItem("identifier", user.username);
				localStorage.setItem(
					"token",
					JSON.stringify(result.data.token)
				);
			}

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

/**
 * Fetch the list of all countries from the API
 * @returns Sorted list of Country objects or empty array on failure
 */
export async function getAllCountries() {
	try {
		let data = await ApiHelper.get("/countries");

		if (data.success) {
			let countries: Country[] = data.data;

			// Sort countries alphabetically
			countries = countries.sort((country) =>
				country.name.localeCompare(country.name)
			);
			return countries;
		} else {
			return [];
		}
	} catch (error) {
		// Return empty list in case of error
		return [];
	}
}
