import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Stack } from "expo-router";
import FeedScreen from "./FeedScreen";
import ContactScreen from "./ContactScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Text,StyleSheet,Image, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

const renderLabel = ({ focused, color, children, iconName,background }) => (
  <View style={styles.tabItem}>
    <Ionicons
      name={iconName}
      size={20}
      color={focused ? "#FF6C21" : "gray"}
      style={styles.iconStyle}
    />
    <Text style={[styles.labelStyle, { color: focused ? "#FF6C21" : "gray" }]}>
      {children}
    </Text>
  </View>
);
export default function RootLayout() {
  return (
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FF6C21',
          tabBarStyle: {flexDirection: 'row'}

          }} >
          <Tab.Screen name="Home" component={FeedScreen}  options={{
            tabBarIcon: ({focused}) => <Ionicons name="home"
            size={25}
            color={focused ? "#FF6C21" : "gray"} />,
            tabBarLabel: (props) => renderLabel(props)
          }}/>
          <Tab.Screen name="Cart" component={ContactScreen} options={{
            tabBarIcon: ({focused}) => <Ionicons name="cart"
            size={25}
            color={focused ? "#FF6C21" : "gray"} />,
            tabBarLabel: props => renderLabel(props)
          }}/>
          <Tab.Screen name="Favourite" component={ContactScreen} options={{
            tabBarIcon: ({focused}) => <Ionicons name="heart"
            size={25}
            color={focused ? "#FF6C21" : "gray"} />,
            tabBarLabel: props => renderLabel(props)
          }}/>
          <Tab.Screen name="Settings" component={FeedScreen} options={{
            tabBarIcon: ({focused}) => <Ionicons name="settings"
            size={25}
            color={focused ? "#FF6C21" : "gray"} />,
            tabBarLabel: props => renderLabel(props)
          }}/>
        </Tab.Navigator>
    
  );
}

const styles = StyleSheet.create({
  tabItem: {
    flexDirection: "row",  
    alignItems: "center",
    gap: 5
  },
  labelStyle: {
    fontSize: 14,
    fontWeight: "bold",
  },
  iconStyle: {
    marginBottom: -2, // Căn chỉnh icon nếu cần
  },
});
