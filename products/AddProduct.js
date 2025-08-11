import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const AddProduct = ({ navigation }) => {
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');

    const handleAddProduct = () => {
        if (!productName || !productPrice) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên và giá sản phẩm');
            return;
        }

        Alert.alert(
            'Thành công', 
            'Đã thêm sản phẩm mới!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        setProductName('');
                        setProductPrice('');
                        setProductDescription('');
                    }
                }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Thêm sản phẩm</Text>
            </View>

            <View style={styles.formContainer}>
                <Text style={styles.label}>Tên sản phẩm *</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="package-variant" size={20} color="#4CAF50" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập tên sản phẩm"
                        placeholderTextColor="#aaa"
                        value={productName}
                        onChangeText={setProductName}
                    />
                </View>

                <Text style={styles.label}>Giá sản phẩm *</Text>
                <View style={styles.inputWrapper}>
                    <Icon name="currency-usd" size={20} color="#4CAF50" style={styles.inputIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Nhập giá sản phẩm"
                        placeholderTextColor="#aaa"
                        keyboardType="numeric"
                        value={productPrice}
                        onChangeText={setProductPrice}
                    />
                </View>

                <Text style={styles.label}>Mô tả sản phẩm</Text>
                <View style={styles.textAreaWrapper}>
                    <Icon name="text" size={20} color="#4CAF50" style={styles.inputIcon} />
                    <TextInput
                        style={[styles.input, styles.textArea]}
                        placeholder="Nhập mô tả sản phẩm"
                        placeholderTextColor="#aaa"
                        multiline
                        numberOfLines={4}
                        value={productDescription}
                        onChangeText={setProductDescription}
                    />
                </View>

                <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
                    <Icon name="plus" size={20} color="#fff" style={styles.buttonIcon} />
                    <Text style={styles.addButtonText}>Thêm sản phẩm</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8F5E8',
    },
    header: {
        backgroundColor: '#4CAF50',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        marginRight: 15,
        padding: 5,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    formContainer: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
        marginTop: 15,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#81C784',
        paddingHorizontal: 15,
        marginBottom: 10,
    },
    textAreaWrapper: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#81C784',
        paddingHorizontal: 15,
        paddingTop: 15,
        marginBottom: 10,
    },
    inputIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        paddingVertical: 15,
        fontSize: 16,
        color: '#333',
    },
    textArea: {
        paddingVertical: 0,
        textAlignVertical: 'top',
        minHeight: 100,
    },
    addButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 3,
    },
    buttonIcon: {
        marginRight: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default AddProduct;