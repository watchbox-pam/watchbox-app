import UserSignup from "@/src/models/UserSignup";
import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import Country from "@/src/models/Country";
import { Platform } from "react-native";
import * as SecureStore from "expo-secure-store";

export async function registerUser(user: UserSignup) {
	try {
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

		const firstHash = await Encryption.encryptPassword(user.password);
		const salt = await Encryption.randomString(32);
		const hashedPassword = await Encryption.encryptPassword(
			firstHash + salt
		);
		const result = await ApiHelper.post("/users/signup", {
			id: "",
			username: user.username,
			email: user.email,
			password: hashedPassword,
			salt: salt,
			country: user.country,
			birthdate: new Date(user.birthdate).toISOString().split("T")[0]
		});
		if (result.success) {
			if (Platform.OS === "ios" || Platform.OS === "android") {
				await SecureStore.setItemAsync(
					"currentUser",
					JSON.stringify(result.data.token)
				);
			} else {
				localStorage.setItem(
					"currentUser",
					JSON.stringify(result.data.token)
				);
			}
			return {
				success: true,
				message: result.data.user_id
			};
		} else {
			return {
				success: false,
				message: result.data
			};
		}
	} catch (error) {
		console.log(error);
		return {
			success: false,
			// @ts-ignore
			message: error.detail
		};
	}
}

export async function getAllCountries() {
	try {
		let data = await ApiHelper.get("/countries");
		if (data.success) {
			let countries: Country[] = data.data;
			countries = countries.sort((country) =>
				country.name.localeCompare(country.name)
			);
			return countries;
		} else {
			return [];
		}
	} catch (error) {
		return [];
	}
}
