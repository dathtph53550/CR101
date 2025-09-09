import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './index';
import DetailScreen from './Detail';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


const dieuHuong = () => {
  return (
    <Tab.Navigator screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={HomeScreen} options={{
      }}/>
      <Tab.Screen name="Detail" component={DetailScreen} options={{
      }}/>
    </Tab.Navigator>
  )
}

export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={dieuHuong} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  )
}
