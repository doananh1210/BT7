import React, { useState } from 'react';
import { Text, SafeAreaView, TextInput, StyleSheet, TouchableOpacity, View, KeyboardAvoidingView, Platform, Alert } from 'react-native';

const SigninScreen = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  
  function ValidateUSPhoneNumber(phoneNumber) {
    const regExp = /^\(\d{3}\) \d{3}-\d{4}$/; 
    return regExp.test(phoneNumber);
  }

  
  const formatPhoneNumber = (text) => {
    const cleaned = ('' + text).replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return text;
  };

  const handlePhoneNumberChange = (text) => {
    const cleaned = text.replace(/\D/g, '');
    if (cleaned.length > 10) {
      return; 
    }
    const formattedPhoneNumber = formatPhoneNumber(cleaned);
    setPhoneNumber(formattedPhoneNumber);
    setErrorMessage(''); 
  };

  // Xử lý khi nhấn nút "Tiếp tục"
  const handleContinuePress = () => {
    if (ValidateUSPhoneNumber(phoneNumber)) {
      Alert.alert('Success', 'Số điện thoại hợp lệ!');
      navigation.navigate('Home'); // Chuyển sang trang Home
    } else {
      setErrorMessage('Số điện thoại không hợp lệ. Vui lòng nhập lại!');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.avoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={100} 
      >
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Đăng nhập</Text>
          <Text style={styles.subtitle}>Nhập số điện thoại</Text>
          <Text style={styles.info}>
            Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập số điện thoại của bạn"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            onChangeText={handlePhoneNumberChange} 
            value={phoneNumber}
            maxLength={14} 
          />
          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          <TouchableOpacity
            style={[
              styles.button,
              phoneNumber.length === 14 ? styles.buttonActive : styles.buttonInactive, 
            ]}
            disabled={phoneNumber.length < 14}
            onPress={handleContinuePress} 
          >
            <Text style={styles.buttonText}>Tiếp tục</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  avoidingView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5, 
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  info: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#000',
    marginBottom: 30,
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#007bff',
  },
  buttonInactive: {
    backgroundColor: '#e0e0e0',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default SigninScreen;
