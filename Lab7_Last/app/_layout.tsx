import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Screen1 from "./Screen1";
import Screen2 from "./Screen2";
import Chat from "./Chat";
import Setting from "./Setting";
import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerItem } from "@react-navigation/drawer";
import { View,Image,TouchableOpacity,Text,StyleSheet} from "react-native";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number,name: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SafeAreaProvider } from "react-native-safe-area-context";


const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: 'https://i.pravatar.cc/100' }} style={styles.avatar} />
        <Text style={styles.userName}>Nguyen Van A</Text>
        <Text style={styles.userEmail}>vana@gmail.com</Text>
      </View>
      <DrawerItemList {...props} />
      <Text style={styles.versionText}>Phiên bản ứng dụng: 2.6.0</Text>
    </DrawerContentScrollView>
  );
};



const Bai2 = () => {
  return (
    <SafeAreaProvider>
      <Drawer.Navigator 
        screenOptions={{
            drawerStyle: {
                width: '65%',
            },
            drawerActiveTintColor: "#BC4B52",
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}
      >

        <Drawer.Screen name="Home" component={Screen1} options={{
          drawerIcon: () =>
            <Ionicons name="home"
                size={30}
                color="black" />,
            drawerType: 'front'
        }}/>
        <Drawer.Screen name="Chat" component={Chat} options={{
          drawerIcon: () =>
            <Ionicons name="chatbox"
                size={30}
                color="black" />
        }}/>
        <Drawer.Screen name="Setting" component={Setting} options={{
          drawerIcon: () =>
            <Ionicons name="settings"
                size={30}
                color="black" />
        }}/>
      </Drawer.Navigator>
    </SafeAreaProvider>
    
  )
}


export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Bai2" component={Bai2} />
      <Stack.Screen name="Home" component={Screen1} />
      <Stack.Screen name="Details" component={Screen2} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  headerContainer: { alignItems: 'center', padding: 20, backgroundColor: '#D8BFD8',marginBottom: 20,borderRadius: 15 },
  avatar: { width: 60, height: 60, borderRadius: 30, marginBottom: 10 },
  userName: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#666' },
  versionText: { textAlign: 'center', padding: 10, color: '#777', fontSize: 12,position: 'absolute',bottom: 25,left: 70 }
})



