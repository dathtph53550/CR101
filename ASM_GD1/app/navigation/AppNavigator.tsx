import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../home';
import DetailScreen from '../detail';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home"
    screenOptions={{
      headerShown: false, 
    }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;