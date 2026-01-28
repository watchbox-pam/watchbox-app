// ==================== USERS ====================
export interface User {
	id: number;
	email: string;
	username: string;
	created_at: string;
	is_active: boolean;
	role: "admin" | "user";
	stats?: {
		movies_seen: number;
		movies_liked: number;
		ratings_count: number;
	};
	is_beta?: boolean;
}

// ==================== MOVIES ====================
export interface Movie {
	id: number;
	tmdb_id: number;
	title: string;
	original_title?: string;
	poster_path: string;
	backdrop_path?: string;
	release_date: string;
	vote_average: number;
	vote_count?: number;
	overview: string;
	popularity?: number;
	adult: boolean;
	genre?: string;
	genre_ids?: number[];
}

// ==================== EVENTS ====================
export interface Event {
	id: number;
	title: string;
	description: string;
	start_date: string; // Ajouté pour le backend
	end_date: string; // Ajouté pour le backend
	event_date: string; // Gardé pour compatibilité
	location?: string;
	type: string; // Ajouté pour le backend
	event_type: "festival" | "premiere" | "screening";
	is_active: boolean; // Ajouté pour le backend
	attendees?: number; // Ajouté pour le backend
	created_at: string;
}

// ==================== ADS ====================
export interface Ad {
	id: number;
	title: string;
	type: "image" | "video" | "carousel";
	platform: string;
	position: number;
	is_active: boolean;
	impressions?: number;
	clicks?: number;
	created_at?: string;
}

// ==================== STATS ====================
export interface Stats {
	total_users: number;
	active_users: number;
	new_users_this_month: number;
	total_movies: number;
	total_events: number;
	active_events: number;
	total_ads?: number;
	active_ads?: number;
	total_impressions?: number;
	total_clicks?: number;
	average_ctr?: number;
	users_growth: number;
	movies_growth: number;
}

// ==================== ANALYTICS ====================
export interface UserGrowth {
	month: string;
	count: number;
}

export interface MovieStats {
	month: string;
	count: number;
}

export interface TopMovie {
	id: number;
	title: string;
	rating: number;
	views: number;
}

// ==================== SWIPE ====================
export interface SwipeStats {
	like_percentage: number;
	dislike_percentage: number;
	average_time: number;
	problematic_count: number;
}

export interface ProblematicMovie {
	id: number;
	title: string;
	like_percentage: number;
	dislike_percentage: number;
	status: string;
}

export interface SwipeRule {
	id: string;
	label: string;
	enabled: boolean;
}

// ==================== API RESPONSES ====================
export interface ApiResponse<T> {
	data: T;
	message?: string;
	error?: string;
}

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	limit: number;
	total_pages: number;
}
