import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = () => {
    if (email === '' || password === '') {
      setError('Please enter your email and password.');
    } else if (password !== '123456') {
      setError('Password is not correct. Try Again!');
    } else {
      setError('');
      navigation.navigate('home')
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')} 
      />
      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={styles.subtitle}>Login to Continue</Text>

      {/* Email Input */}
      <TextInput
        style={[styles.input, error && email === '' ? styles.inputError : null]}
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={[
            styles.input,
            { flex: 1 },
            error && password === '' ? styles.inputError : null,
          ]}
          placeholder="Password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Image
            source={
              isPasswordVisible
                ? require('../assets/images/eye1.png')
                : require('../assets/images/eye2.png')
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {/* Sign In Button */}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Google Sign In */}
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate('home')}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            style={{ marginRight: 10 }}
            source={require('../assets/images/gg.png')} 
          />
          <Text style={styles.googleButtonText}>Sign in with Google</Text>
        </View>
      </TouchableOpacity>

      {/* Footer */}
      <View style={{ marginTop: 20, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: '#fff' }}>Don’t have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('register')}>
            <Text style={{ color: '#D17842', fontWeight: 'bold' }}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text style={{ color: '#fff' }}>Forgot Password? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('ResetPassword')}>
            <Text style={{ color: '#D17842', fontWeight: 'bold' }}>Reset</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C0F14',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  logo: {
    alignSelf: 'center',
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#333',
  },
  inputError: {
    borderColor: '#FF5A5F',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  eyeIcon: {
    width: 24,
    height: 24,
    tintColor: '#D17842',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#D17842',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#FFF',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  googleButtonText: {
    color: '#121212',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5A5F',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: -20,
  },
});

export default SignInScreen;
