import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, ScrollView, Alert,} from 'react-native';

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validateEmail = (text) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(text)) {
            setEmailError('Email không đúng định dạng');
            return false;
        } else {
            setEmailError('');
            return true;
        }
    };

    const handleRegister = () => {
        let isValid = true;

        if (name.trim() === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập tên của bạn.');
            isValid = false;
        }

        const isEmailValid = validateEmail(email);
        if (!isEmailValid) isValid = false;

        if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Mật khẩu xác nhận không khớp');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (isValid) {
            Alert.alert('Đăng ký thành công', `Chào mừng ${name}!`);
            navigation.navigate('Login');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingContainer}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Text style={styles.welcomeText}>Tạo tài khoản mới</Text>
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Tên của bạn</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tên của bạn"
                        placeholderTextColor="#aaa"
                        value={name}
                        onChangeText={setName}
                    />

                    <Text style={styles.label}>Địa chỉ Email</Text>
                    <TextInput
                        style={[styles.input, emailError ? styles.inputError : null]}
                        placeholder="Nhập email của bạn"
                        placeholderTextColor="#aaa"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text);
                            validateEmail(text);
                        }}
                        onBlur={() => validateEmail(email)}
                    />
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <Text style={styles.label}>Mật khẩu mới</Text>
                    <TextInput
                        style={[styles.input, passwordError ? styles.inputError : null]}
                        placeholder="Nhập mật khẩu mới"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <Text style={styles.label}>Xác nhận mật khẩu</Text>
                    <TextInput
                        style={[styles.input, confirmPasswordError ? styles.inputError : null]}
                        placeholder="Nhập lại mật khẩu"
                        placeholderTextColor="#aaa"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                    />
                    {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

                    <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                        <Text style={styles.registerButtonText}>Đăng ký</Text>
                    </TouchableOpacity>

                    <View style={styles.signInContainer}>
                        <Text style={{ color: '#222' }}>Bạn đã có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.signInText}>Đăng nhập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    keyboardAvoidingContainer: {
        flex: 1,
        backgroundColor: '#E8F5E8',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#E8F5E8',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 8,
    },
    formContainer: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 18,
        padding: 24,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 2,
    },
    label: {
        fontSize: 15,
        marginBottom: 6,
        marginTop: 12,
        fontWeight: 'bold',
        color: '#222',
    },
    input: {
        borderWidth: 1,
        borderColor: '#81C784',
        padding: 12,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: '#F1F8E9',
        color: '#222',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginTop: 2,
        marginBottom: 6,
    },
    registerButton: {
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 10,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.13,
        shadowRadius: 6,
        elevation: 3,
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    signInText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default RegisterScreen;