import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Platform, KeyboardAvoidingView, ScrollView,Alert,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('hatde236@gmail.com');
    const [password, setPassword] = useState('zxcvbnm');
    const [isPasswordShown, setIsPasswordShown] = useState(true);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

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

    const handleLogin = () => {
        const isEmailValid = validateEmail(email);
        let isPasswordValid = true;

        if (password.length < 6) {
            setPasswordError('Mật khẩu phải có ít nhất 6 ký tự');
            isPasswordValid = false;
        } else if (password === "sai") {
            setPasswordError('Mật khẩu không đúng, thử lại');
            isPasswordValid = false;
        } else {
            setPasswordError('');
        }

        if (isEmailValid && isPasswordValid) {
            navigation.navigate('HomeTabs');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardAvoidingContainer}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.header}>
                    <Image
                        source={require('../Logo/logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.formContainer}>
                    <Text style={styles.label}>Địa chỉ Email</Text>
                    <View style={styles.inputWrapper}>
                        <Icon name="email-outline" size={22} color="#4CAF50" style={styles.inputIcon} />
                        <TextInput
                            style={[styles.input, emailError ? styles.inputError : null]}
                            placeholder="Nhập địa chỉ email"
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
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

                    <Text style={styles.label}>Mật khẩu</Text>
                    <View style={[styles.inputWrapper, passwordError ? styles.inputError : null]}>
                        <Icon name="lock-outline" size={22} color="#4CAF50" style={styles.inputIcon} />
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu"
                            placeholderTextColor="#aaa"
                            secureTextEntry={isPasswordShown}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            style={styles.togglePasswordButton}
                            onPress={() => setIsPasswordShown(!isPasswordShown)}
                        >
                            <Icon name={isPasswordShown ? 'eye-off' : 'eye'} size={20} color="#666" />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={styles.loginButtonText}>Đăng nhập</Text>
                    </TouchableOpacity>

                    <Text style={styles.orLoginWith}>Hoặc đăng nhập với</Text>

                    <View style={styles.socialButtonsContainer}>
                        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#4267B2' }]}>
                            <Icon name="facebook" size={20} color="#fff" />
                            <Text style={styles.socialButtonText}>Facebook</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.socialButton, { backgroundColor: '#DB4437' }]}>
                            <Icon name="google" size={20} color="#fff" />
                            <Text style={styles.socialButtonText}>Google</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.signUpContainer}>
                        <Text style={{ color: '#222' }}>Bạn chưa có tài khoản? </Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                            <Text style={styles.registerText}>Đăng ký</Text>
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
        backgroundColor: '#F1F8E9',
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#F1F8E9',
    },
    header: {
        marginBottom: 30,
        alignItems: 'center',
    },
    logo: {
        width: 110,
        height: 110,
        resizeMode: 'contain',
        marginBottom: 10,
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
        marginTop: 10,
        fontWeight: 'bold',
        color: '#222',
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#81C784',
        borderRadius: 10,
        backgroundColor: '#F1F8E9',
        marginBottom: 8,
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 12,
        fontSize: 16,
        color: '#222',
    },
    inputIcon: {
        marginRight: 8,
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
    togglePasswordButton: {
        padding: 6,
    },
    loginButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 18,
        marginBottom: 10,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.18,
        shadowRadius: 6,
        elevation: 3,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    orLoginWith: {
        textAlign: 'center',
        marginVertical: 18,
        color: '#aaa',
        fontSize: 15,
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 18,
        marginHorizontal: 6,
    },
    socialButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 15,
    },
    signUpContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 18,
    },
    registerText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
});

export default Login;