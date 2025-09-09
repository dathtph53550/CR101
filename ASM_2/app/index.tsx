import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';


const IndexScreen = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/Login');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <Image 
        source={require('../assets/images/logo.png')}
        style={styles.image}
      />
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  image: {
    width: 200, 
    height: 200, 
    marginBottom: 20, 
  },
  text: {
    color: 'white', 
    fontSize: 20,
  },
});

export default IndexScreen;