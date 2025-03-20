import * as Crypto from "expo-crypto";

export abstract class Encryption {
	public static async randomString(length: number) {
		return Math.random().toString(36).slice(-length);
	}

	public static async encryptPassword(password: string) {
		const hashedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			password
		);
		return hashedPassword;
	}
}
