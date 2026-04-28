import { Text, View } from "react-native";
import UserSearchResultModel from "@/src/models/UserSearchResultModel";
import { useEffect } from "react";

export default function UserSearchResult({
	user
}: {
	user: UserSearchResultModel;
}) {
	useEffect(() => {
		console.log("fjhezurfjn", user.username);
	}, []);

	return (
		<View>
			<Text>{user.username}</Text>
		</View>
	);
}
