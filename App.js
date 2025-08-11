import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

// Import screens
import Login from './login_register/Login';
import RegisterScreen from './login_register/Register';
import HomeScreen from './home_screens/HomeScreen';
import SettingScreen from './settings/SettingScreen';
import CartScreen from './carts/CartScreen';
import NotificationScreen from './notifications/NotificationScreen';
import ProductManagement from './products/ProductManagement';
import AddProduct from './products/AddProduct';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Trang chủ') {
            iconName = focused ? 'home-filled' : 'home';
          } else if (route.name === 'Thông báo') {
            iconName = 'notifications';
          } else if (route.name === 'Giỏ hàng') {
            iconName = focused ? 'shopping-cart' : 'shopping-cart';
          } else if (route.name === 'Cài đặt') {
            iconName = 'settings';
          } 
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2E7D32',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: { fontWeight: 'bold' }
      })}
    >
      <Tab.Screen name="Trang chủ" component={HomeScreen} />
      <Tab.Screen name="Thông báo" component={NotificationScreen} />
      <Tab.Screen name="Giỏ hàng" component={CartScreen} />
      <Tab.Screen name="Cài đặt" component={SettingScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="ProductManagement" component={ProductManagement} />
        <Stack.Screen name="AddProduct" component={AddProduct} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}