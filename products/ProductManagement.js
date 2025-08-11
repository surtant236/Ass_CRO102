import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Alert, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { getListProducts, addProductAction, deleteProductAction, editProductAction } from '../redux/actions/productAction';

const ProductManagement = ({ navigation }) => {
    const dispatch = useDispatch();
    const { listProducts, loading } = useSelector(state => state.product);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');

    useEffect(() => {
        dispatch(getListProducts());
    }, [dispatch]);

    const resetForm = () => {
        setProductName('');
        setProductPrice('');
        setProductImage('');
        setProductDescription('');
        setIsEditMode(false);
        setEditingProduct(null);
    };

    const handleAddProduct = () => {
        if (!productName || !productPrice) {
            Alert.alert('Lỗi', 'Vui lòng nhập tên và giá sản phẩm');
            return;
        }

        const productData = {
            name: productName,
            price: productPrice + ' VNĐ',
            image: productImage || '',
            description: productDescription
        };

        if (isEditMode && editingProduct) {
            dispatch(editProductAction(editingProduct.id, productData));
            Alert.alert('Thành công', 'Đã cập nhật sản phẩm!');
        } else {
            dispatch(addProductAction(productData));
            Alert.alert('Thành công', 'Đã thêm sản phẩm mới!');
        }

        resetForm();
        setIsModalVisible(false);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductName(product.name);
        setProductPrice(product.price.replace(' VNĐ', ''));
        setProductImage(product.image);
        setProductDescription(product.description || '');
        setIsEditMode(true);
        setIsModalVisible(true);
    };

    const handleDeleteProduct = (productId) => {
        Alert.alert(
            'Xác nhận xóa',
            'Bạn có chắc chắn muốn xóa sản phẩm này?',
            [
                { text: 'Hủy', style: 'cancel' },
                { text: 'Xóa', onPress: () => dispatch(deleteProductAction(productId)) }
            ]
        );
    };

    const openAddModal = () => {
        resetForm();
        setIsModalVisible(true);
    };

    const renderProduct = ({ item }) => (
        <View style={styles.productCard}>
            <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/80x80/E0E0E0/666666?text=No+Image' }} 
                style={styles.productImage} 
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                {item.description && (
                    <Text style={styles.productDescription} numberOfLines={2}>
                        {item.description}
                    </Text>
                )}
            </View>
            <View style={styles.productActions}>
                <TouchableOpacity 
                    style={styles.editButton}
                    onPress={() => handleEditProduct(item)}
                >
                    <Icon name="pencil" size={20} color="#4CAF50" />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={styles.deleteButton}
                    onPress={() => handleDeleteProduct(item.id)}
                >
                    <Icon name="delete" size={20} color="#F44336" />
                </TouchableOpacity>
            </View>
        </View>
    );

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
                {listProducts.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Icon name="package-variant" size={80} color="#BDBDBD" />
                        <Text style={styles.emptyTitle}>Chưa có sản phẩm</Text>
                        <Text style={styles.emptyDescription}>
                            Thêm sản phẩm đầu tiên của bạn bằng cách nhấn nút + bên dưới
                        </Text>
                    </View>
                ) : (
                    <FlatList
                        data={listProducts}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id?.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.productList}
                    />
                )}
            </View>

            {/* Floating Action Button */}
            <TouchableOpacity 
                style={styles.fab}
                onPress={openAddModal}
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
                            <Text style={styles.modalTitle}>
                                {isEditMode ? 'Sửa sản phẩm' : 'Thêm sản phẩm mới'}
                            </Text>
                            <TouchableOpacity 
                                onPress={() => {
                                    resetForm();
                                    setIsModalVisible(false);
                                }}
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

                            <Text style={styles.label}>Link hình ảnh</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Nhập URL hình ảnh sản phẩm"
                                placeholderTextColor="#999"
                                value={productImage}
                                onChangeText={setProductImage}
                            />

                            <Text style={styles.label}>Mô tả sản phẩm</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Nhập mô tả chi tiết sản phẩm..."
                                placeholderTextColor="#999"
                                multiline
                                numberOfLines={2}
                                value={productDescription}
                                onChangeText={setProductDescription}
                            />

                            <View style={styles.modalButtons}>
                                <TouchableOpacity 
                                    style={styles.cancelButton}
                                    onPress={() => {
                                        resetForm();
                                        setIsModalVisible(false);
                                    }}
                                >
                                    <Text style={styles.cancelButtonText}>Hủy</Text>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.addButton}
                                    onPress={handleAddProduct}
                                >
                                    <Text style={styles.addButtonText}>
                                        {isEditMode ? 'Cập nhật' : 'Thêm'}
                                    </Text>
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
        padding: 15,
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginTop: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 16,
        color: '#66BB6A',
        textAlign: 'center',
        lineHeight: 24,
    },
    productList: {
        paddingBottom: 100,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    productImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        marginRight: 15,
    },
    productInfo: {
        flex: 1,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 12,
        color: '#666',
        lineHeight: 16,
    },
    productActions: {
        flexDirection: 'row',
    },
    editButton: {
        padding: 8,
        marginRight: 5,
        backgroundColor: '#E8F5E8',
        borderRadius: 8,
    },
    deleteButton: {
        padding: 8,
        backgroundColor: '#FFEBEE',
        borderRadius: 8,
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
        borderRadius: 15,
        width: '90%',
        maxHeight: '75%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    closeButton: {
        padding: 3,
    },
    modalForm: {
        paddingHorizontal: 15,
        paddingVertical: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 4,
        marginTop: 6,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: '#333',
        marginBottom: 8,
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
        minHeight: 50,
        maxHeight: 70,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 12,
        borderRadius: 8,
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#666',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    addButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 12,
        borderRadius: 8,
        marginLeft: 8,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default ProductManagement;
