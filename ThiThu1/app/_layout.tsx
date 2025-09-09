import { createStackNavigator } from "@react-navigation/stack";
import Index from "./index";
import Detail from "./detail";

const Stack = createStackNavigator();


export default function RootLayout() {
  return (
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Index} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
  );
}
