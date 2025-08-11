import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductManagement = ({ navigation }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
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
                        setIsModalVisible(false);
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Icon name="arrow-left" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Quản lý sản phẩm</Text>
            </View>

            <View style={styles.content}>
                <Text style={styles.welcomeText}>Quản lý sản phẩm</Text>
                <Text style={styles.descriptionText}>
                    Thêm và quản lý sản phẩm
                </Text>
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity 
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
            >
                <Icon name="plus" size={28} color="#fff" />
            </TouchableOpacity>

            {/* Modal thêm sản phẩm */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Thêm sản phẩm mới</Text>
                            <TouchableOpacity 
                                onPress={() => setIsModalVisible(false)}
                                style={styles.closeButton}
                            >
                                <Icon name="close" size={24} color="#666" />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.modalForm}>
                            <Text style={styles.label}>Tên sản phẩm *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập tên sản phẩm"
                                placeholderTextColor="#999"
                                value={productName}
                                onChangeText={setProductName}
                            />

                            <Text style={styles.label}>Giá sản phẩm *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập giá sản phẩm (VND)"
                                placeholderTextColor="#999"
                                keyboardType="numeric"
                                value={productPrice}
                                onChangeText={setProductPrice}
                            />

                            <Text style={styles.label}>Mô tả sản phẩm</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Nhập mô tả chi tiết sản phẩm..."
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={4}
                                value={productDescription}
                                onChangeText={setProductDescription}
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => setIsModalVisible(false)}
                                >
                                    <Text style={styles.cancelButtonText}>Hủy</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.addButton}
                                    onPress={handleAddProduct}
                                >
                                    <Text style={styles.addButtonText}>Thêm</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F8E9',
    },
    header: {
        backgroundColor: '#81C784',
        padding: 20,
        paddingTop: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
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
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        textAlign: 'center',
        marginBottom: 15,
    },
    descriptionText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 20,
        width: '90%',
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 5,
    },
    modalForm: {
        padding: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 8,
        marginTop: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#E0E0E0',
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        color: '#333',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    textArea: {
        textAlignVertical: 'top',
        minHeight: 100,
        maxHeight: 120,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 10,
        marginRight: 10,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 15,
        borderRadius: 10,
        marginLeft: 10,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductManagement;
