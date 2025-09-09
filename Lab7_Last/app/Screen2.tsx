import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "./_layout";

type DetailsScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Details">;

const Screen2 = () => {
  const navigation = useNavigation<DetailsScreenNavigationProp>();
  const route = useRoute();
  const { id, name } = route.params as { id: number; name: string };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Chào bạn, {name}</Text>
      <Text style={styles.subText}>ID của bạn là, {id}</Text>

      <Button title="goBack" onPress={() => navigation.goBack()} />

      <Button
        title="reset"
        onPress={() => navigation.reset({ routes: [{ name: "Home" }] })}
      />

      <Button title="pop" onPress={() => navigation.pop()} />

      <Button title="popToTop" onPress={() => navigation.popToTop()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 16,
    color: "gray",
  },
});

export default Screen2;
