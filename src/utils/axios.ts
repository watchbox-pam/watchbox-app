import * as SecureStore from "expo-secure-store";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { Platform } from "react-native";
import { router } from "expo-router";

const baseURL = process.env.EXPO_PUBLIC_BASE_API_URL;

export abstract class ApiHelper {
	private static config: AxiosRequestConfig = {
		headers: {
			"Content-Type": "application/json"
		},
		baseURL: baseURL
	};

	private static instance: AxiosInstance = axios.create(ApiHelper.config);

	private static initializeInterceptors() {
		const allowedEndpoints = ["/login", "/signup", "/base"];
		this.instance.interceptors.response.use(
			(response) => response,
			async (error: any) => {
				if (error.response?.status === 401) {
					if (Platform.OS === "ios" || Platform.OS === "android") {
						await SecureStore.deleteItemAsync("token");
					} else {
						localStorage.removeItem("token");
					}

					const requestUrl = error.config.url || "";
					const isAllowedEndpoint = allowedEndpoints.some(
						(endpoint) => requestUrl.includes(endpoint)
					);

					if (!isAllowedEndpoint) {
						router.replace("/base");
					}
				}

				return Promise.reject(error);
			}
		);
	}

	public static async get(url: string, options?: AxiosRequestConfig) {
		try {
			let userToken: string | null;
			if (Platform.OS === "ios" || Platform.OS === "android") {
				userToken = await SecureStore.getItemAsync("token");
			} else {
				userToken = localStorage.getItem("token");
			}
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
			let userToken: string | null;
			if (Platform.OS === "ios" || Platform.OS === "android") {
				userToken = await SecureStore.getItemAsync("token");
			} else {
				userToken = localStorage.getItem("token");
			}
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
			let userToken: string | null;
			if (Platform.OS === "ios" || Platform.OS === "android") {
				userToken = await SecureStore.getItemAsync("token");
			} else {
				userToken = localStorage.getItem("token");
			}
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
			let userToken: string | null;
			if (Platform.OS === "ios" || Platform.OS === "android") {
				userToken = await SecureStore.getItemAsync("token");
			} else {
				userToken = localStorage.getItem("token");
			}
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

ApiHelper["initializeInterceptors"]();
