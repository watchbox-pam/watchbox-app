import React from "react";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const LogoButton = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Image
          source={require("../assets/images/Logo-removebg-preview.png")} // Assurez-vous que le chemin est correct
          style={{ width: 50, height: 50 }}
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
};

export default LogoButton;

const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-end",
    marginBottom: 20,
    marginRight: 5,
  },
});
