import UserSignup from "@/src/models/UserSignup";
import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import Country from "@/src/models/Country";
import { validate as isUUID } from "uuid";

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
		const result = await ApiHelper.post("/users", {
			id: "",
			username: user.username,
			email: user.email,
			password: hashedPassword,
			salt: salt,
			country: user.country,
			birthdate: new Date(user.birthdate).toISOString().split("T")[0]
		});
		if (isUUID(result)) {
			return {
				success: true,
				message: result
			};
		} else {
			return {
				success: false,
				message: result
			};
		}
	} catch (error) {
		return {
			success: false,
			message: error.message
		};
	}
}

export async function getAllCountries() {
	try {
		let countries: Country[] = await ApiHelper.get("/countries");
		countries = countries.sort((country) =>
			country.name.localeCompare(country.name)
		);
		return countries;
	} catch (error) {
		return [];
	}
}
