import { Image, Text, TouchableOpacity } from "react-native";
import UserSearchResultModel from "@/src/models/UserSearchResultModel";
import React, { useEffect } from "react";
import { router } from "expo-router";
import userSearchStyles from "@/src/styles/UserSearchStyle";
import useSessionStore from "@/src/zustand/sessionStore";

export default function UserSearchResult({
	user
}: {
	user: UserSearchResultModel;
}) {
	const currentUser = useSessionStore((state: any) => state.user);
	const navigationUrl =
		currentUser.id == user.id
			? `/(app)/(tabs)/profile`
			: `/(app)/(tabs)/user/${user.id}`;

	return (
		<TouchableOpacity
			key={user.id}
			onPress={() => router.push(navigationUrl)}
			style={userSearchStyles.userCard}>
			<Image
				style={userSearchStyles.userProfilePicture}
				source={require("@/src/assets/images/default-user.png")}
			/>
			<Text style={userSearchStyles.userName} numberOfLines={2}>
				{user.username}
			</Text>
		</TouchableOpacity>
	);
}
