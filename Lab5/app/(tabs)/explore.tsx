import React from "react";
import { View, Text, StyleSheet, ImageBackground, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar translucent={true} backgroundColor="transparent" />
      <ImageBackground
        style={styles.background}
        source={{
          uri: "https://images.pexels.com/photos/12732558/pexels-photo-12732558.jpeg",
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Summer {"\n"}beach party</Text>
          <Text style={styles.description}>
          Summer Beach Party 2023: hành trình rực rỡ của CRHers tại những bãi biển đẹp nhất Việt Nam
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    paddingHorizontal: 20,
    width: "100%",
  },
  title: {
    fontSize: 29,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left"
  },
  description: {
    fontSize: 14,
    color: "#fff",
    textAlign: "left",
    marginTop: 10,
    width:'80%',
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '40%'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Explore;
