import * as Crypto from "expo-crypto";

export abstract class Encryption {
	public static async randomString(length: number) {
		const array = new Uint8Array(length);
		Crypto.getRandomValues(array);

		const charset =
			"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		let result = "";
		for (let i = 0; i < array.length; i++) {
			result += charset[array[i] % charset.length];
		}
		return result;
	}

	public static async encryptPassword(password: string) {
		const hashedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			password
		);
		return hashedPassword;
	}
}
