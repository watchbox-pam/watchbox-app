import { ApiHelper } from "@/src/utils/axios";
import { Encryption } from "@/src/utils/encryption";
import { validate as isUUID } from "uuid";

export async function loginUser({
	identifier,
	password
}: {
	identifier: string;
	password: string;
}) {
	try {
		if (!identifier) {
			return {
				success: false,
				message: "L'identifiant est requis",
				element: "identifier"
			};
		}
		if (!password) {
			return {
				success: false,
				message: "Le mot de passe est requis",
				element: "password"
			};
		}

		const hashedPassword = await Encryption.encryptPassword(password);
		const result = await ApiHelper.post("/users/login", {
			identifier: identifier,
			password: hashedPassword
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
