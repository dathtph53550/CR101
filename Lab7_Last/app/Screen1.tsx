import { View, Text ,StyleSheet,TextInput,Button, Alert} from 'react-native'
import React from 'react'
import { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const Screen1 = () => {

    const [name, setName] = useState('');
    const navigation = useNavigation();


  return (
    <View style={styles.container}>
      <Text style={{color: 'red',fontSize: 20, margin: 10,fontWeight: 'bold'}}>Chao ban day la man hinh 1</Text>
        <TextInput 
            style={{ height: 40, borderColor: 'gray', borderWidth: 1 , width: 300,padding: 10,borderRadius: 12}}
            placeholder='nhap ten cua ban'
            value={name}
            onChangeText={setName}
            />
        <Button title='Submit' onPress={() => {
            if(!name)
              Alert.alert('Vui lòng không để trống');
            else 
              navigation.navigate('Details', {name: name, id: Math.floor(Math.random() * 100)});
        }}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    }

})

export default Screen1


