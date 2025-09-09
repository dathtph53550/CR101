import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../home/Index";
import CartScreen from "../home/Cart";
import FavouriteScreen from "../home/Favourite";
import NotificationScreen from "../home/Notification";
import { BlurView } from "expo-blur";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#FF6C21",
        tabBarInactiveTintColor: "#888",
        tabBarStyle: {
          position: "absolute",
          bottom: 2,
          left: 30,
          right: 30,
          height: 65,
          borderRadius: 30,
          borderTopWidth: 0,
          backgroundColor: "rgba(0,0,0,0.1)", // Làm mờ với màu tối
          overflow: "hidden",
          elevation: 10, 
          shadowColor: "#0C0F14",
          shadowOpacity: 0.5,
          shadowRadius: 15,
          justifyContent: 'center'
        },
        tabBarBackground: () => (
          <BlurView intensity={5} style={StyleSheet.absoluteFill} />
        ),
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center'
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="home" size={28} color={focused ? "#FF6C21" : "#888"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.activeLabel]}></Text>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="cart" size={28} color={focused ? "#FF6C21" : "#888"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.activeLabel]}></Text>
          ),
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={FavouriteScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="heart" size={28} color={focused ? "#FF6C21" : "#888"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.activeLabel]}></Text>
          ),
        }}
      />
      <Tab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons name="notifications" size={28} color={focused ? "#FF6C21" : "#888"} />
          ),
          tabBarLabel: ({ focused }) => (
            <Text style={[styles.label, focused && styles.activeLabel]}></Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    color: "#888",
  },
  activeLabel: {
    color: "#FF6C21",
    fontWeight: "bold",
  },
});
