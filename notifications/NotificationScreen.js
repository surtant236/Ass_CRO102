import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NotificationScreen = () => {
    const [notifications] = useState([
        {
            id: '1',
            title: 'Chào mừng bạn đến với Plant Shop!',
            message: 'Cảm ơn bạn đã tham gia cộng đồng yêu cây cảnh của chúng tôi. Hãy khám phá những loại cây tuyệt vời!',
            time: '2 giờ trước',
            type: 'welcome',
            isRead: false,
            icon: 'leaf'
        },
        {
            id: '2',
            title: 'Khuyến mãi đặc biệt!',
            message: 'Giảm giá 20% cho tất cả cây cảnh mini. Áp dụng từ hôm nay đến hết tuần!',
            time: '1 ngày trước',
            type: 'promotion',
            isRead: false,
            icon: 'percent'
        },
        {
            id: '3',
            title: 'Mẹo chăm sóc cây',
            message: 'Mùa đông đã đến, hãy giảm tần suất tưới nước cho cây cảnh của bạn để tránh úng rễ nhé!',
            time: '2 ngày trước',
            type: 'tip',
            isRead: true,
            icon: 'lightbulb-on'
        },
        {
            id: '4',
            title: 'Đơn hàng đã được xác nhận',
            message: 'Đơn hàng #001 của bạn đã được xác nhận và đang trong quá trình chuẩn bị.',
            time: '3 ngày trước',
            type: 'order',
            isRead: true,
            icon: 'package-variant'
        },
        {
            id: '5',
            title: 'Giao hàng thành công',
            message: 'Cây Phú Quý của bạn đã được giao thành công. Chúc bạn chăm sóc cây thật tốt!',
            time: '1 tuần trước',
            type: 'delivery',
            isRead: true,
            icon: 'truck-delivery'
        },
        {
            id: '6',
            title: 'Đánh giá sản phẩm',
            message: 'Bạn có thể chia sẻ trải nghiệm về sản phẩm đã mua để giúp người khác không?',
            time: '1 tuần trước',
            type: 'review',
            isRead: true,
            icon: 'star'
        }
    ]);

    const getNotificationColor = (type) => {
        switch (type) {
            case 'welcome': return '#4CAF50';
            case 'promotion': return '#FF9800';
            case 'tip': return '#2196F3';
            case 'order': return '#9C27B0';
            case 'delivery': return '#4CAF50';
            case 'review': return '#FFC107';
            default: return '#757575';
        }
    };

    const renderNotification = ({ item }) => (
        <TouchableOpacity style={[
            styles.notificationCard,
            !item.isRead && styles.unreadCard
        ]}>
            <View style={[styles.iconContainer, { backgroundColor: getNotificationColor(item.type) + '20' }]}>
                <Icon 
                    name={item.icon} 
                    size={24} 
                    color={getNotificationColor(item.type)} 
                />
            </View>
            <View style={styles.notificationContent}>
                <View style={styles.titleRow}>
                    <Text style={[styles.notificationTitle, !item.isRead && styles.unreadTitle]}>
                        {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                </View>
                <Text style={styles.notificationMessage} numberOfLines={2}>
                    {item.message}
                </Text>
                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Thông báo</Text>
                <View style={styles.badgeContainer}>
                    <Text style={styles.badgeText}>
                        {notifications.filter(n => !n.isRead).length}
                    </Text>
                </View>
            </View>

            <FlatList
                data={notifications}
                renderItem={renderNotification}
                keyExtractor={(item) => item.id}
                style={styles.notificationList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />
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
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 0.5,
    },
    badgeContainer: {
        backgroundColor: '#FF5722',
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    notificationList: {
        flex: 1,
    },
    listContainer: {
        padding: 15,
        paddingBottom: 100,
    },
    notificationCard: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        padding: 15,
        marginBottom: 12,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 3,
    },
    unreadCard: {
        borderLeftWidth: 4,
        borderLeftColor: '#4CAF50',
    },
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    notificationContent: {
        flex: 1,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    notificationTitle: {
        flex: 1,
        fontSize: 16,
        fontWeight: '600',
        color: '#2E7D32',
    },
    unreadTitle: {
        fontWeight: 'bold',
        color: '#1B5E20',
    },
    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#4CAF50',
        marginLeft: 8,
    },
    notificationMessage: {
        fontSize: 14,
        color: '#666',
        lineHeight: 20,
        marginBottom: 8,
    },
    notificationTime: {
        fontSize: 12,
        color: '#999',
        fontStyle: 'italic',
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

export default NotificationScreen;