import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../redux/actions/cartAction';

const CartScreen = () => {
    const dispatch = useDispatch();
    const { cartItems, totalAmount, totalQuantity } = useSelector(state => state.cart);

    const handleRemoveItem = (productId) => {
        Alert.alert(
            "Xóa sản phẩm",
            "Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa", onPress: () => dispatch(removeFromCart(productId)) }
            ]
        );
    };

    const handleUpdateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) {
            handleRemoveItem(productId);
        } else {
            dispatch(updateQuantity({ productId, quantity: newQuantity }));
        }
    };

    const handleClearCart = () => {
        Alert.alert(
            "Xóa toàn bộ giỏ hàng",
            "Bạn có chắc chắn muốn xóa tất cả sản phẩm trong giỏ hàng?",
            [
                { text: "Hủy", style: "cancel" },
                { text: "Xóa tất cả", onPress: () => dispatch(clearCart()) }
            ]
        );
    };

    const renderCartItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image 
                source={{ uri: item.image || 'https://via.placeholder.com/80x80/E0E0E0/666666?text=No+Image' }} 
                style={styles.productImage} 
            />
            <View style={styles.productInfo}>
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price}</Text>
                <View style={styles.quantityContainer}>
                    <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    >
                        <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantity}>{item.quantity}</Text>
                    <TouchableOpacity 
                        style={styles.quantityButton}
                        onPress={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    >
                        <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity 
                style={styles.removeButton}
                onPress={() => handleRemoveItem(item.id)}
            >
                <Icon name="delete" size={24} color="#F44336" />
            </TouchableOpacity>
        </View>
    );

    if (cartItems.length === 0) {
        return (
            <View style={styles.container}>
                <View style={styles.headerEmpty}>
                    <Text style={styles.headerTitle}>Giỏ hàng</Text>
                </View>
                <View style={styles.emptyState}>
                    <Icon name="shopping-cart-outline" size={80} color="#BDBDBD" />
                    <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
                    <Text style={styles.emptyDescription}>
                        Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Giỏ hàng</Text>
                <TouchableOpacity onPress={handleClearCart} style={styles.clearButton}>
                    <Text style={styles.clearButtonText}>Xóa tất cả</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                style={styles.cartList}
                showsVerticalScrollIndicator={false}
            />

            <View style={styles.totalContainer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Tổng cộng:</Text>
                    <Text style={styles.totalAmount}>{totalAmount} VNĐ</Text>
                </View>
                <TouchableOpacity style={styles.checkoutButton}>
                    <Text style={styles.checkoutButtonText}>Thanh toán</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerEmpty: {
        backgroundColor: '#81C784',
        padding: 20,
        paddingTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4CAF50',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
    },
    clearButton: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 15,
    },
    clearButtonText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    cartList: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    cartItem: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 15,
        marginVertical: 5,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
        alignItems: 'center',
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
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        color: '#4CAF50',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    quantityButton: {
        backgroundColor: '#E8F5E8',
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    quantity: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginHorizontal: 15,
        minWidth: 20,
        textAlign: 'center',
    },
    removeButton: {
        padding: 10,
    },
    totalContainer: {
        backgroundColor: '#fff',
        padding: 20,
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
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '600',
        color: '#2E7D32',
    },
    totalAmount: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
    checkoutButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginTop: 20,
        marginBottom: 12,
        textAlign: 'center',
    },
    emptyDescription: {
        fontSize: 16,
        color: '#66BB6A',
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
    },
});

export default CartScreen;