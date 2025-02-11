import { Redirect } from "expo-router";
import { StyleSheet } from "react-native";

export default function Tab() {
  return <Redirect href="/home/home" />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
