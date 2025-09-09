import { View, Text,StyleSheet,Button } from 'react-native'
import React from 'react'

const Screen2 = () => {
  return (
    <View style={styles.container}>
        <Text style={{fontSize: 25}}>Chao ban, Dat</Text>
        <Text style={{fontSize: 20}}>Id cua ban la : 123</Text>


        <Button title='GoBack' onPress={() => {}}/>
        <Button title='Reset' onPress={() => {}}/>
        <Button title='Pop' onPress={() => {}}/>
        <Button title='PopToTop' onPress={() => {}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Screen2