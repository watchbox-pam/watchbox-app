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
			const response = await this.instance.get(url, options);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	static async post(url: string, data: any, options?: AxiosRequestConfig) {
		try {
			const jsonData: string = JSON.stringify(data);
			const response = await ApiHelper.instance.post(
				url,
				jsonData,
				options
			);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	public static async put(
		url: string,
		data: any,
		options?: AxiosRequestConfig
	) {
		try {
			const jsonData: string = JSON.stringify(data);
			const response = await this.instance.put(url, jsonData, options);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}

	public static async delete(url: string, options?: AxiosRequestConfig) {
		try {
			const response = await this.instance.delete(url, options);
			return response.data;
		} catch (error) {
			console.error(error);
		}
	}
}
