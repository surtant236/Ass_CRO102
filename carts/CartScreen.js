import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Giỏ hàng</Text>
            </View>

            <View style={styles.emptyState}>
                <Text style={styles.emptyTitle}>Giỏ hàng trống</Text>
                <Text style={styles.emptyDescription}>
                    Thêm sản phẩm vào giỏ hàng để bắt đầu mua sắm
                </Text>
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
        padding: 25,
        paddingTop: 55,
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
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
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