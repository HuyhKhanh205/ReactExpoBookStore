import React from 'react';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import TabBar, { TabKey } from '../components/TabBar';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CartScreen from '../screens/CartScreen';
import AccountScreen from '../screens/AccountScreen';
import { useCart } from '../context/CartContext';
import { MainTabParamList } from './types';

const Tab = createBottomTabNavigator<MainTabParamList>();

/** Bọc TabBar tự viết (không dùng tabBar mặc định) để giữ nguyên UI cũ. */
function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  const { count } = useCart();
  const active = state.routes[state.index].name as TabKey;

  return (
    <TabBar
      active={active}
      cartCount={count}
      onChange={(key) => navigation.navigate(key)}
    />
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Categories" component={CategoriesScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  );
}
