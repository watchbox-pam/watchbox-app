import * as SecureStore from "expo-secure-store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export abstract class ApiHelper {
	private static config: AxiosRequestConfig = {
		headers: {
			"Content-Type": "application/json"
		},
		baseURL: baseURL
	};

	private static instance: AxiosInstance = axios.create(ApiHelper.config);

	public static async get(url: string, options?: AxiosRequestConfig) {
		try {
			const userToken = await SecureStore.getItemAsync("currentUser");
			const response = await this.instance.get(url, {
				...options,
				...{
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}
			});
			return {
				success: true,
				data: response.data
			};
		} catch (error: any) {
			return {
				success: false,
				data: error.message
			};
		}
	}

	static async post(url: string, data: any, options?: AxiosRequestConfig) {
		try {
			const userToken = await SecureStore.getItemAsync("currentUser");
			const jsonData: string = JSON.stringify(data);
			const response = await ApiHelper.instance.post(url, jsonData, {
				...options,
				...{
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}
			});
			return {
				success: true,
				data: response.data
			};
		} catch (error: any) {
			return {
				success: false,
				data: error.response.data.detail
			};
		}
	}

	public static async put(
		url: string,
		data: any,
		options?: AxiosRequestConfig
	) {
		try {
			const userToken = await SecureStore.getItemAsync("currentUser");
			const jsonData: string = JSON.stringify(data);
			const response = await this.instance.put(url, jsonData, {
				...options,
				...{
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}
			});
			return {
				success: true,
				data: response.data
			};
		} catch (error: any) {
			return {
				success: false,
				data: error.message
			};
		}
	}

	public static async delete(url: string, options?: AxiosRequestConfig) {
		try {
			const userToken = await SecureStore.getItemAsync("currentUser");
			const response = await this.instance.delete(url, {
				...options,
				...{
					headers: {
						Authorization: `Bearer ${userToken}`
					}
				}
			});
			return {
				success: true,
				data: response.data
			};
		} catch (error: any) {
			return {
				success: false,
				data: error.message
			};
		}
	}
}
