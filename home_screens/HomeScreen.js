import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const HomeScreen = ({ navigation }) => {
    const products = [
        {
            id: '1',
            name: 'Cây abc',
            price: '120.000 VNĐ',
            image: 'https://cdn.f20beauty.com/22492/27936cde98c7666cc2539dc553f8f319.jpg',
        },
        {
            id: '2',
            name: 'Cây abc',
            price: '120.000 VNĐ',
            image: 'https://cdn.f20beauty.com/22492/27936cde98c7666cc2539dc553f8f319.jpg',
        },
        {
            id: '3',
            name: 'Cây abc',
            price: '120.000 VNĐ',
            image: 'https://cdn.f20beauty.com/22492/27936cde98c7666cc2539dc553f8f319.jpg',
        },
        {
            id: '4',
            name: 'Cây abc',
            price: '120.000 VNĐ',
            image: 'https://cdn.f20beauty.com/22492/27936cde98c7666cc2539dc553f8f319.jpg',
        },
    ];

    const renderProduct = ({ item }) => (
        <TouchableOpacity style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>{item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.topBar}>
                    <View>
                        <Text style={styles.greeting}>Xin chào!</Text>
                    </View>
                    <TouchableOpacity style={styles.profileButton}>
                        <Icon name="account-circle" size={40} color="#fff" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Cây Cảnh Nổi Bật </Text>
                    <FlatList
                        data={products}
                        renderItem={renderProduct}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                        scrollEnabled={false}
                        columnWrapperStyle={styles.row}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ScrollView>
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
        paddingTop: 50,
        paddingBottom: 20,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 18,
        color: '#fff',
        fontWeight: '600',
    },
    userName: {
        fontSize: 14,
        color: '#E8F5E8',
        marginTop: 2,
    },
    profileButton: {
        padding: 5,
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    section: {
        marginTop: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 15,
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 15,
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 12,
        width: '48%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    productName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#2E7D32',
        marginBottom: 4,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 12,
        color: '#4CAF50',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default HomeScreen;