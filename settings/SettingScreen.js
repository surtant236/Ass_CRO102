import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const SettingScreen = ({ navigation }) => {

    const settingItems = [
        {
            id: 1,
            title: 'Thông tin cá nhân',
            icon: 'account',
            onPress: () => console.log('Thông tin cá nhân'),
        },
        {
            id: 2,
            title: 'Quản lý sản phẩm',
            icon: 'package-variant',
            onPress: () => navigation.navigate('ProductManagement'),
        },
        {
            id: 3,
            title: 'Về ứng dụng',
            icon: 'information',
            onPress: () => console.log('Về ứng dụng'),
        },
    ];

    const renderSettingItem = (item) => (
        <TouchableOpacity key={item.id} style={styles.settingItem} onPress={item.onPress}>
            <Icon name={item.icon} size={24} color="#4CAF50" style={styles.settingIcon} />
            <Text style={styles.settingText}>{item.title}</Text>
            <Icon name="chevron-right" size={24} color="#ccc" />
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Icon name="account-circle" size={80} color="#fff" />
                <Text style={styles.userName}>Đức Lợi</Text>
                <Text style={styles.userEmail}>Thành viên</Text>
            </View>

            <View style={styles.settingsContainer}>
                <Text style={styles.sectionTitle}>Cài đặt</Text>
                {settingItems.map(renderSettingItem)}
            </View>

            <TouchableOpacity 
                style={styles.logoutButton} 
                onPress={() => navigation.navigate('Login')}
            >
                <Icon name="logout" size={20} color="#fff" style={styles.logoutIcon} />
                <Text style={styles.logoutText}>Đăng xuất</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F1F8E9',
    },
    header: {
        backgroundColor: '#81C784',
        padding: 30,
        paddingTop: 60,
        alignItems: 'center',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.15,
        shadowRadius: 5,
        elevation: 5,
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 10,
    },
    userEmail: {
        fontSize: 16,
        color: '#E8F5E8',
        marginTop: 5,
    },
    settingsContainer: {
        padding: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 15,
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 10,
        borderRadius: 12,
        shadowColor: '#4CAF50',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#E8F5E8',
    },
    settingIcon: {
        marginRight: 15,
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#2E7D32',
        fontWeight: '500',
    },
    logoutButton: {
        flexDirection: 'row',
        backgroundColor: '#E57373',
        margin: 20,
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#E57373',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
    },
    logoutIcon: {
        marginRight: 10,
    },
    logoutText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default SettingScreen;