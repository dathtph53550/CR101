import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('All fields are required.');
    } else if (password !== confirmPassword) {
      setError('Passwords do not match.');
    } else {
      setError('');
      Alert.alert('Success', 'Registered successfully!');
      navigation.navigate('SignIn'); // Navigate to sign-in screen after registration
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/images/logo.png')} // Update this path as needed
      />
      <Text style={styles.title}>Welcome to Lungo !!</Text>
      <Text style={styles.subtitle}>Register to Continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
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
                ? require('../assets/images/eye1.png') // Replace with your "eye-open" icon
                : require('../assets/images/eye2.png') // Replace with your "eye-closed" icon
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Re-type password"
          placeholderTextColor="#aaa"
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity
          onPress={() =>
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
          }
        >
          <Image
            source={
              isConfirmPasswordVisible
                ? require('../assets/images/eye1.png') // Replace with your "eye-open" icon
                : require('../assets/images/eye2.png') // Replace with your "eye-closed" icon
            }
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={{ color: '#aaa' }}>You have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <Text style={styles.signInText}>Sign in</Text>
        </TouchableOpacity>
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
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF5A5F',
    textAlign: 'center',
    marginBottom: 10,
  },
  footer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText: {
    color: '#D17842',
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
