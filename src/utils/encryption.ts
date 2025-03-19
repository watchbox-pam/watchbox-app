import * as Crypto from "expo-crypto";

export abstract class Encryption {
	private static async randomString(length: number) {
		return Math.random().toString(36).slice(-length);
	}

	public static async encryptPassword(password: string) {
		const firstHash = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			password
		);
		const salt = await this.randomString(32);
		const hashedPassword = await Crypto.digestStringAsync(
			Crypto.CryptoDigestAlgorithm.SHA256,
			firstHash + salt
		);
		return { hashedPassword, salt };
	}
}
