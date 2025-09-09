import { createNativeStackNavigator } from "@react-navigation/native-stack";
import screen1 from "./screen1";
import screen2 from "./screen2";

export type RootStackParamList = {
  Home: undefined;
  Details: { id: number,name: string };
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={screen1} />
      <Stack.Screen name="Details" component={screen2} />
    </Stack.Navigator>
  );
}
