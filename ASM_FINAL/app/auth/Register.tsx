import React, {useState} from 'react';
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
// import {
//   isValidEmail,
//   isValidPassword,
//   isValidName,
//   isValidRePassword,
// } from '../constants/validation';
import { isValidEmail, isValidPassword, isValidName, isValidRePassword } from '../constants/validation';


import { NavigationProp } from '@react-navigation/native';

interface RegisterProps {
  navigation: NavigationProp<any>;
}

const Register = ({ navigation }: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailExists, setIsEmailExists] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorRePassword, setErrorRePassword] = useState('');

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleRePasswordVisibility = () => {
    setShowRePassword(!showRePassword);
  };

  const handleTextPressRegister = () => {
    console.log('Sign In');
    navigation.navigate('Login');
  };

  const checkEmailExists = async () => {
    try {
      let url_check_login = 'http://localhost:3000/login?email=' + email;
      const response = await fetch(url_check_login);
      const data = await response.json();

      console.log(data.length);

      if (data.length === 0) {
        setIsEmailExists(true);
      } else {
        setIsEmailExists(false);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = async () => {
    if (isValidEmail(email)) {
      try {
        await checkEmailExists();
        if (!isEmailExists) {
          Alert.alert('Email đã tồn tại !! Vui lòng nhập email khác !!');
          return;
        } else {
          const apiUrl = 'http://localhost:3000/login';
          await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          })
            .then(response => response.json())
            .then(data => {
              console.log('Đăng ký thành công !:', data);
              navigation.navigate('Login');
            })
            .catch(error => {
              console.error('Đăng ký không thành công !:', error);
            });
        }
      } catch (error) {
        console.error('Check email error:', error);
      }
    } else {
      console.log('email không hợp lệ');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView>
        <StatusBar
          backgroundColor={'#0C0F14'}
          barStyle="light-content"></StatusBar>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={require('../../assets/images/cofee.png')}></Image>
        </View>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              color: 'white',
              fontFamily: 'Poppins-Regular.ttf',
              fontSize: 16,
              lineHeight: 26,
              fontWeight: 700,
            }}>
            Welcome to Lungo !!
          </Text>
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Text
            style={{
              color: '#828282',
              fontFamily: 'Poppins-Regular.ttf',
              fontSize: 12,
              lineHeight: 26,
              fontWeight: 700,
            }}>
            Login to Continue
          </Text>
        </View>
        <View style={styles.inputsContainer}>
          <View>
            <TextInput
              placeholder="Name"
              placeholderTextColor="#828282"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={text => {
                setErrorName(
                  isValidName(text) == true
                    ? ''
                    : 'Tên phải có nhiều hơn 3 ký tự !!',
                );
                setName(text);
              }}
              style={[styles.textInput,
                errorName ? { borderColor: 'red' } : {}]
              }
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorName}
            </Text>
          </View>
          <View>
            <TextInput
              placeholder="Email"
              placeholderTextColor="#828282"
              secureTextEntry={false}
              inputMode="text"
              onChangeText={text => {
                setErrorEmail(
                  isValidEmail(text) == true
                    ? ''
                    : 'Email không đúng với định dạng !!',
                );
                setEmail(text);
              }}
              style={[styles.textInput,
                errorName ? { borderColor: 'red' } : {}]
              }
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorEmail}
            </Text>
          </View>
    
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#828282"
              secureTextEntry={!showPassword}
              style={[styles.textInput,
                errorName ? { borderColor: 'red' } : {}]
              }
              value={password}
              onChangeText={text => {
                setErrorPassword(
                  isValidPassword(text) == true
                    ? ''
                    : 'Password phải nhiều hơn 7 ký tự và ít hơn 10 ký tự !!',
                );
                setPassword(text);
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorPassword}
            </Text>
            <TouchableOpacity
              onPress={togglePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 21,
                
              }}>
              <Image
                source={
                  showPassword
                    ? require('../../assets/images/eye.png')
                    : require('../../assets/images/eyeClose.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.passWordInput}>
            <TextInput
              placeholder="Re-type password"
              placeholderTextColor="#828282"
              secureTextEntry={!showRePassword}
              style={[styles.textInput,
                errorName ? { borderColor: 'red' } : {}]
              }
              value={rePassword}
              onChangeText={text => {
                setErrorRePassword(
                  isValidRePassword(text, password) == true
                    ? ''
                    : 'Mật khẩu không trùng khớp với mật khẩu trên !!',
                );
                setRePassword(text);
              }}
            />
            <Text
              style={{
                color: 'red',
                fontSize: 12,
                marginTop: 3,
                marginStart: 5,
              }}>
              {errorRePassword}
            </Text>
            <TouchableOpacity
              onPress={toggleRePasswordVisibility}
              style={{
                position: 'absolute',
                right: 45,
                top: 21,
              }}>
              <Image
                source={
                  showRePassword
                    ? require('../../assets/images/eye.png')
                    : require('../../assets/images/eyeClose.png')
                }
                style={{width: 20, height: 20}}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButtonText}>Register</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Regular.ttf',
                color: '#828282',
                fontSize: 12,
                fontWeight: 700,
                lineHeight: 26,
                marginBottom: 10,
              }}>
              You have an account? Click
            </Text>
          </View>
          <View style={{marginStart: 5, marginBottom: 10}}>
            <TouchableOpacity onPress={handleTextPressRegister}>
              <Text
                style={{
                  color: '#D17842',
                  fontFamily: 'Poppins-Regular.ttf',
                  fontSize: 12,
                  fontWeight: 700,
                  lineHeight: 26,
                }}>
                Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#0C0F14',
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  inputsContainer: {
    paddingStart: 30,
    marginTop: 25,
  },
  text: {
    fontSize: 15,
    color: '#828282',
  },
  textInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#252A32',
    marginBottom: 0,
    height: 48,
    color: '#828282',
    paddingStart: 25,
    marginEnd: 30,
    marginTop: 10,
  },
  signInButton: {
    backgroundColor: '#D17842',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 20,
  },
  signInButtonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Regular.ttf',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  signInWithGGButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 12,
    height: 57,
    marginEnd: 30,
    marginTop: 5,
  },
  signInWithGGButtonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular.ttf',
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 26,
  },
  googleIcon: {
    width: 15,
    height: 15,
  },
  passWordInput: {
    
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 3,
    marginStart: 5,
  },
  
});

export default Register;
