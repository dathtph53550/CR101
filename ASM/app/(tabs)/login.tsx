import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require('../assets/images/coffee-cup.png')} style={styles.logo} />
      <Text style={styles.welcomeText}>Welcome to Lungo !!</Text>
      <Text style={styles.subText}>Login to Continue</Text>

      {/* Email Input */}
      <TextInput
        placeholder="Email Address"
        placeholderTextColor="#aaa"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {/* Password Input */}
      <TextInput
        placeholder="Password"
        placeholderTextColor="#aaa"
        style={styles.input}
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity style={styles.signInButton}>
        <Text style={styles.signInText}>Sign In</Text>
      </TouchableOpacity>

      {/* Sign In with Google */}
      <TouchableOpacity style={styles.googleButton}>
        <Text style={styles.googleText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Register & Reset Links */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={styles.linkText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Forget Password? </Text>
        <TouchableOpacity onPress={() => router.push('/reset')}>
          <Text style={styles.linkText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  signInButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#b87333',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  signInText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  googleButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  googleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  footerText: {
    color: '#aaa',
    fontSize: 14,
  },
  linkText: {
    color: '#b87333',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default LoginScreen;
