import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from "@react-navigation/stack";
import Home from './index';
import Detail from './Detail';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function dieuHuong() {
    return (
      <Drawer.Navigator >
       <Drawer.Screen name="Home" component={Home} />
       <Drawer.Screen name="Detail" component={Detail} />
    </Drawer.Navigator>
    )
}


export default function RootLayout() {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={dieuHuong} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
