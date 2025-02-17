import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#0A1E38",
      }}
    >
      <Text>Recherche</Text>
      <Link
        style={{
          width: "50%",
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 10,
          marginTop: 10,
          justifyContent: "center",
        }}
        href={{
          pathname: "/movie/[id]",
          params: { id: "1" },
        }}
      >
        View second user details
      </Link>
    </View>
  );
}
