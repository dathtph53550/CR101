import React, {useState} from 'react';
import {Button, ScrollView, StyleSheet, TextInput, View, Alert, SafeAreaView} from 'react-native';

export default function TabTwoScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const validateForm = () => {
    if(name.trim().length === 0){
      Alert.alert('Hãy nhập họ tên');
      return false;
    }
    else if(phone.trim().length === 0 || isNaN(Number(phone)) || phone.trim().length != 10){
      Alert.alert('Vui lòng nhập số điện thoại hợp lệ');
      return false;
    }
    else if(password.trim().length === 0){
      Alert.alert('Hãy nhập mật khẩu');
      return false;
    }
    else{
      return true;
    }
  }

  const handleSubmit = () => {
    if(validateForm()){
      Alert.alert('Thông tin đã nhập:', `Họ tên: ${name}\nSố điện thoại: ${phone}\nMật khẩu: ${password}`,
        [
          {
            text: 'OK',
            onPress: () => {
              setName('');
              setPhone('');
              setPassword('');
            }
          }
        ]
      );
    }
  };



  return (
    <SafeAreaView>
        <View style={styles.container}>
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Nhập họ tên"
            style={styles.tipStyle}
          />
          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Nhập số điện thoại"
            keyboardType="phone-pad"
            style={styles.tipStyle}
          />
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Nhập mật khẩu"
            secureTextEntry={true}
            style={styles.tipStyle}
          />
          <Button title="Lấy thông tin" onPress={handleSubmit} />
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  tipStyle: {
    marginVertical: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
});
