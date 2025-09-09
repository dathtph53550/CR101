import { TabView, SceneMap } from 'react-native-tab-view';
import Home from './index';
import Detail from './Detail';
import Screen2 from './Screen2';
import { SafeAreaView, View, useWindowDimensions } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";
import React from 'react';


const renderScene = SceneMap({
  first: Home,
  second: Screen2,
});

const routes = [
  { key: 'first', title: 'First' },
  { key: 'second', title: 'Second' },
];

const Stack = createStackNavigator();


const dieuHuong = () => {
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  return (
    <SafeAreaView style={{flex:1}}>
        <TabView 
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
      />
    </SafeAreaView>
  )
}


export default function RootLayout() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={dieuHuong} />
        <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
}
