import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TabView, TabBar } from 'react-native-tab-view';



const FirstRoute = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Cho Bạn Screen</Text>
  </View>
);

const SecondRoute = () => (
  <View style={[styles.container,{backgroundColor: 'blue'}]}>
    <Text style={styles.text}>Trực Tiếp Screen</Text>
  </View>
);

const ThirdRoute = () => (
  <View style={[styles.container,{backgroundColor: 'yellow'}]}>
    <Text style={styles.text}>Trò Chơi Screen</Text>
  </View>
);

const renderScene = ({ route }) => {
  console.log(route.key);
  switch (route.key) {
    case 'first':
      return <FirstRoute />;
    case 'second':
      return <SecondRoute />;
    case 'third':
      return <ThirdRoute />;
    default:
      return null;
  }
};

const renderTabBar = (props) => (
  <TabBar
    {...props}
    indicatorStyle={{ backgroundColor: 'red', height: 2 }}
    style={{ backgroundColor: '#4A3D62' }} 
    labelStyle={{ fontSize: 14, fontWeight: 'bold' }}
    activeColor="white"
    inactiveColor="gray"
    
  />
);

const FeedScreen = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'CHO BẠN' },
    { key: 'second', title: '🔴 TRỰC TIẾP' },
    { key: 'third', title: '🎮 TRÒ CHƠI' },
  ]);
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={{ width: Dimensions.get('window').width }}
        lazy={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6C21',
    margin: 10
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default FeedScreen;
