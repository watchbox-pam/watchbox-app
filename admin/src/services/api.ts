import axios from "axios";
import type { User, Movie, Event, Stats, Ad } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json"
	}
});

// Intercepteur pour ajouter le token d'authentification
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("admin_token");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

// Auth
export const authAPI = {
	login: (email: string, password: string) =>
		api.post("/auth/login", { email, password }),
	logout: () => {
		localStorage.removeItem("admin_token");
	}
};

// Stats
export const statsAPI = {
	getStats: () => api.get<Stats>("/admin/stats")
};

// Analytics
export const analyticsAPI = {
	getUserGrowth: () => api.get("/admin/analytics/user-growth"),
	getMoviesPerMonth: () => api.get("/admin/analytics/movies-per-month"),
	getGlobalActivity: () => api.get("/admin/analytics/global-activity"),
	getTopMovies: () => api.get("/admin/analytics/top-movies")
};

// Ads
export const adsAPI = {
	getAll: () => api.get<Ad[]>("/admin/ads"),
	getById: (id: number) => api.get<Ad>(`/admin/ads/${id}`),
	create: (data: Partial<Ad>) => api.post<Ad>("/admin/ads", data),
	update: (id: number, data: Partial<Ad>) =>
		api.put<Ad>(`/admin/ads/${id}`, data),
	toggleActive: (id: number) => api.patch(`/admin/ads/${id}/toggle-active`),
	delete: (id: number) => api.delete(`/admin/ads/${id}`)
};

// Users
export const usersAPI = {
	getAll: () => api.get<User[]>("/admin/users"),
	getById: (id: number) => api.get<User>(`/admin/users/${id}`),
	create: (data: Partial<User>) => api.post<User>("/admin/users", data),
	update: (id: number, data: Partial<User>) =>
		api.put<User>(`/admin/users/${id}`, data),
	delete: (id: number) => api.delete(`/admin/users/${id}`),
	toggleActive: (id: number) => api.patch(`/admin/users/${id}/toggle-active`)
};

// Movies
export const moviesAPI = {
	getAll: (page = 1, limit = 20) =>
		api.get<{ movies: Movie[]; total: number }>("/admin/movies", {
			params: { page, limit }
		}),
	getById: (id: number) => api.get<Movie>(`/admin/movies/${id}`),
	delete: (id: number) => api.delete(`/admin/movies/${id}`)
};

// Events
export const eventsAPI = {
	getAll: () => api.get<Event[]>("/admin/events"),
	getById: (id: number) => api.get<Event>(`/admin/events/${id}`),
	create: (data: Partial<Event>) => api.post<Event>("/admin/events", data),
	update: (id: number, data: Partial<Event>) =>
		api.put<Event>(`/admin/events/${id}`, data),
	delete: (id: number) => api.delete(`/admin/events/${id}`),
	toggleActive: (id: number) => api.patch(`/admin/events/${id}/toggle-active`)
};

// Swipe
export const swipeAPI = {
	getStats: () => api.get("/admin/swipe/stats"),
	getProblematicMovies: () => api.get("/admin/swipe/problematic-movies"),
	getRules: () => api.get("/admin/swipe/rules"),
	updateRule: (ruleId: string, enabled: boolean) =>
		api.patch(`/admin/swipe/rules/${ruleId}`, { enabled })
};

export default api;
