import { View, Text, StyleSheet, ScrollView, RefreshControl, StatusBar, StatusBarStyle } from 'react-native';
import React, { useState } from 'react';

const Bai2 = () => {
  const [barStyle, setBarStyle] = useState<StatusBarStyle>('light-content' as StatusBarStyle);
  const [refreshing, setRefreshing] = useState(false);
  let a = 1;
  let b = 2;
  let c = a + b; 

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      setBarStyle(prevStyle => prevStyle === 'light-content' ? 'dark-content' : 'light-content');
    }, 2000);
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <StatusBar
        barStyle={barStyle}
        translucent={false}
        backgroundColor={barStyle === 'light-content' ? 'black' : 'white'}
      />
      <Text style={styles.text}> Kéo xuống để đổi màu Statusbar</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

export default Bai2;
