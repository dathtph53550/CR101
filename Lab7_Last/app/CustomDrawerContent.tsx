import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { MaterialIcons } from "@expo/vector-icons";

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      {/* 🔹 Header - Thông tin người dùng */}
      <View style={styles.profileContainer}>
        <Image
          source={{ uri: "https://i.pravatar.cc/100" }} // Avatar người dùng
          style={styles.avatar}
        />
        <Text style={styles.name}>Nguyen Van A</Text>
        <Text style={styles.email}>vana@gmail.com</Text>
      </View>

      {/* 🔹 Menu items */}
      <View style={{ flex: 1 }}>
        <DrawerItemList {...props} />
      </View>

      {/* 🔹 Footer - Nút Logout */}
      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="red" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#f5f5f5",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5,
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#ddd",
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 10,
    color: "red",
  },
});

export default CustomDrawerContent;
