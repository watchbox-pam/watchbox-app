import { router } from "expo-router";
import { checkLogin } from "@/src/services/LandingService";
import useSessionStore from "@/src/zustand/sessionStore";
import { fetchPopular } from "@/src/services/HomePageService";
import { Friend } from "../FriendsScreen";
import { loginUser } from "@/src/services/LoginService";
import { Notification } from "../NotifScreen";
import { Media } from "../PersonScreen";
import { getUserProfile } from "@/src/services/ProfileService";
import {
	createPlaylist,
	getUserPlaylists
} from "@/src/services/PlaylistService";
import Playlist from "@/src/models/Playlist";
import { searchInfos } from "@/src/services/SearchService";
import { getAllCountries, registerUser } from "@/src/services/SignupService";
import UserSignup from "@/src/models/UserSignup";
import { DateTimePickerEvent } from "@react-native-community/datetimepicker";

export const checkUserLogin = async () => {
	const result = await checkLogin();
	if (result !== null) {
		const signIn = (
			useSessionStore.getState() as {
				signIn: (id: string, identifier: string) => void;
			}
		).signIn;
		signIn(result.id, result.identifier);
		router.replace("/");
		return;
	}
};

export const fetchPopularMovies = async () => {
	const popularDay = await fetchPopular("day");
	const popularWeek = await fetchPopular("week");
	return {
		day: popularDay.data || [],
		week: popularWeek.data || []
	};
};

export const addFriend = (
	newFriend: string,
	setFriends: Function,
	setNewFriend: Function,
	friends: Friend[]
) => {
	if (newFriend.trim()) {
		setFriends([...friends, { id: Date.now(), name: newFriend.trim() }]);
		setNewFriend("");
	}
};

export const handleLoginSubmit = async (
	identifier: string,
	password: string
) => {
	const result = await loginUser({ identifier, password });
	if (result.success) {
		const signIn = (
			useSessionStore.getState() as {
				signIn: (id: string, identifier: string) => void;
			}
		).signIn;
		signIn(result.message, identifier);
		router.replace("/");
	} else {
		alert(result.message);
	}
};

export const markAsRead = (id: number, setNotifications: Function) => {
	setNotifications((prev: any) =>
		prev.map((notif: Notification) =>
			notif.id === id ? { ...notif, read: true } : notif
		)
	);
};

export const convertDateToAge = (date: string) => {
	const today = new Date();
	const birthDate = new Date(date);
	let age = today.getFullYear() - birthDate.getFullYear();

	const monthDiff = today.getMonth() - birthDate.getMonth();
	const dayDiff = today.getDate() - birthDate.getDate();

	// Adjust if the birthday hasn't occurred yet this year
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		age--;
	}

	return age;
};

const removeDuplicates = (arr: Media[]) => {
	return arr.filter(
		(item: Media, index: number, self: Media[]) =>
			index === self.findIndex((t: Media) => t.title === item.title)
	);
};

export const processCreditData = (
	data: any,
	mediaTypes: {
		type: string;
		role: string;
		setter: Function;
	}[]
) => {
	mediaTypes.forEach(({ type, role, setter }) => {
		const filteredData = removeDuplicates(
			data.combined_credits[role].filter(
				(item: Media) => item.media_type === type
			)
		);
		setter(filteredData);
	});
};

export const fetchProfileData = async (
	userId: string,
	setLoading: Function,
	setProfileData: Function,
	setError: Function
) => {
	setLoading(true);
	setError(null);

	try {
		const response = await getUserProfile(userId);
		if (response.success) {
			setProfileData(response.data);
		} else {
			setError(
				response.message || "Erreur lors de la récupération du profil"
			);
			console.error(
				"Erreur lors de la récupération du profil:",
				response.message
			);
		}
	} catch (error: any) {
		setError(error.message || "Une erreur est survenue");
	} finally {
		setLoading(false);
	}
};

export const fetchUserPlaylists = async (
	userId: string,
	setUserPlaylists: Function
) => {
	const response = await getUserPlaylists(userId);
	if (response.success) {
		setUserPlaylists(response.data);
	} else {
		console.error("Error fetching user playlists:", response.message);
	}
};

export const handleSavePlaylist = async (
	id: string | string[],
	currentUser: any,
	playlistTitle: string,
	isPrivate: boolean,
	setModalVisible: Function,
	setPlaylistTitle: Function,
	setIsPrivate: Function
) => {
	const userId = id || (currentUser && currentUser.id);
	if (!userId) {
		alert("User is not logged in.");
		return;
	}

	const playlistToInsert: Playlist = {
		id: "",
		user_id: userId,
		title: playlistTitle,
		is_private: isPrivate,
		created_at: new Date()
	};

	const result = await createPlaylist(playlistToInsert);

	if (result.success) {
		alert(result.message || "Playlist created successfully!");
		setModalVisible(false);
		setPlaylistTitle("");
		setIsPrivate(false);
	} else {
		alert(
			result.message || "An error occurred while creating the playlist."
		);
	}
};

export const search = async (searchTerm: string, setResults: Function) => {
	if (searchTerm.trim()) {
		const searchResults = await searchInfos(searchTerm);
		if (searchResults.success) {
			setResults(searchResults.data);
		}
	}
};

export const signupUser = async (userToInsert: UserSignup) => {
	const result = await registerUser(userToInsert);
	if (result.success) {
		const signIn = (
			useSessionStore.getState() as {
				signIn: (id: string, identifier: string) => void;
			}
		).signIn;
		signIn(result.message, userToInsert.username);
		router.replace("/");
	} else {
		alert(result.message);
	}
};

export const getCountries = async (setCountries: Function) => {
	const countriesResult = await getAllCountries();
	setCountries(countriesResult);
};

export const onChangeBirthdate = (
	selectedDate: Date | undefined,
	setDtPickerVisible: Function,
	setBirthdate: Function
) => {
	const currentDate = selectedDate;
	setDtPickerVisible(false);
	setBirthdate(currentDate);
};
