import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions/cartAction';

const DetailProduct = ({ route, navigation }) => {
    const { product } = route.params;
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
        navigation.goBack();
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
                <Text style={styles.headerTitle}>Chi tiết sản phẩm</Text>
            </View>

            <ScrollView style={styles.content}>
                <Image 
                    source={{ uri: product.image || 'https://via.placeholder.com/300x300/E0E0E0/666666?text=No+Image' }} 
                    style={styles.productImage} 
                />
                
                <View style={styles.productInfo}>
                    <Text style={styles.productName}>{product.name}</Text>
                    <Text style={styles.productPrice}>{product.price}</Text>
                    
                    {product.description && (
                        <View style={styles.descriptionSection}>
                            <Text style={styles.sectionTitle}>Mô tả sản phẩm</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View style={styles.bottomActions}>
                <TouchableOpacity 
                    style={styles.addToCartButton}
                    onPress={handleAddToCart}
                >
                    <Icon name="cart-plus" size={24} color="#fff" />
                    <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    content: {
        flex: 1,
    },
    productImage: {
        width: '100%',
        height: 300,
        resizeMode: 'cover',
    },
    productInfo: {
        padding: 20,
        backgroundColor: '#fff',
        margin: 15,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    productName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 10,
    },
    productPrice: {
        fontSize: 20,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    descriptionSection: {
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
        paddingTop: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 10,
    },
    productDescription: {
        fontSize: 15,
        color: '#666',
        lineHeight: 22,
    },
    bottomActions: {
        padding: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
    },
    addToCartButton: {
        backgroundColor: '#4CAF50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        borderRadius: 12,
    },
    addToCartText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default DetailProduct;