import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({ emailValid: false, minLength: false, hasNumber: false, hasCapital: false });

  // Animate form appearance
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 1200,
    useNativeDriver: true,
  }).start();

  // Email validation logic (must include "@gmail.com")
  const validateEmail = (email) => {
    const isValid = email.endsWith('@gmail.com');
    setErrors((prevErrors) => ({ ...prevErrors, emailValid: isValid }));
    return isValid;
  };

  // Password validation logic
  const validatePassword = (pass) => {
    const validation = {
      minLength: pass.length >= 8,
      hasNumber: /\d/.test(pass),
      hasCapital: /[A-Z]/.test(pass),
    };
    setErrors((prevErrors) => ({ ...prevErrors, ...validation }));
    return validation;
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    if (key === 'email') validateEmail(value);
    if (key === 'password') validatePassword(value);
  };

  const isValid = Object.values(errors).every(v => v) && formData.email;

  return (
    <SafeAreaProvider>
      <ImageBackground 
        source={{ uri: 'https://img.freepik.com/free-vector/abstract-background-gradient-colorful-design_677411-3431.jpg?semt=ais_hybrid&w=740' }}
        style={styles.background}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.container}>
          <StatusBar style="light" />

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Welcome Back</Text>
            <Text style={styles.headerSubtitle}>Log in to continue</Text>
          </View>

          {/* Form Section */}
          <Animated.View style={[styles.form, { opacity: fadeAnim }]}>
            <TextInput 
              style={styles.input} 
              placeholder="Email (must be @gmail.com)" 
              placeholderTextColor="#eee"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleChange('email', text)}
            />
            <Text style={[styles.validationText, errors.emailValid ? styles.validationSuccess : styles.validationError]}>
              {errors.emailValid ? '✓ Valid Gmail address' : '✗ Must be a @gmail.com email'}
            </Text>

            <TextInput 
              style={styles.input} 
              placeholder="Password" 
              placeholderTextColor="#eee"
              secureTextEntry 
              value={formData.password} 
              onChangeText={(text) => handleChange('password', text)}
            />

            {/* Password Validation Messages */}
            <View style={styles.validationContainer}>
              {Object.entries(errors).filter(([key]) => key !== 'emailValid').map(([key, value]) => (
                <Text key={key} style={[styles.validationText, value ? styles.validationSuccess : styles.validationError]}>
                  {value ? '✓' : '✗'} {key === 'minLength' ? 'At least 8 characters' : 
                    key === 'hasNumber' ? 'Contains a number' : 
                    'Contains a capital letter'}
                </Text>
              ))}
            </View>

            <TouchableOpacity style={[styles.loginButton, !isValid && styles.disabledButton]} disabled={!isValid}>
              <Text style={styles.loginButtonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.signupButton}>
              <Text style={styles.signupText}>Want to sign up? Click here</Text>
            </TouchableOpacity>
          </Animated.View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#ddd',
    fontStyle: 'italic',
  },
  form: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    padding: 30,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.25)',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    fontSize: 18,
    color: 'white',
  },
  validationContainer: {
    marginBottom: 15,
  },
  validationText: {
    fontSize: 15,
    marginVertical: 3,
  },
  validationSuccess: {
    color: '#4CAF50',
  },
  validationError: {
    color: '#F44336',
  },
  loginButton: {
    backgroundColor: '#ff4081',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#BDBDBD',
    opacity: 0.7,
  },
  signupButton: {
    marginTop: 15,
    alignItems: 'center',
  },
  signupText: {
    color: '#eee',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
