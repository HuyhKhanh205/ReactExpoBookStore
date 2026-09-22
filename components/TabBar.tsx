import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';

export type TabKey = 'home' | 'categories' | 'cart' | 'account';

const TABS: { key: TabKey; label: string; icon: React.ComponentProps<typeof Feather>['name'] }[] = [
  { key: 'home', label: 'Trang chủ', icon: 'home' },
  { key: 'categories', label: 'Danh mục', icon: 'grid' },
  { key: 'cart', label: 'Giỏ hàng', icon: 'shopping-cart' },
  { key: 'account', label: 'Tài khoản', icon: 'user' },
];

const ACTIVE = '#3730A3';
const INACTIVE = '#9CA3AF';

interface TabBarProps {
  active: TabKey;
  onChange: (key: TabKey) => void;
  cartCount?: number;
}

function TabBar({ active, onChange, cartCount = 0 }: TabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: 8 + insets.bottom }]}>
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        const color = isActive ? ACTIVE : INACTIVE;

        return (
          <Pressable key={tab.key} style={styles.item} onPress={() => onChange(tab.key)}>
            <View style={styles.iconWrapper}>
              <Feather name={tab.icon} size={22} color={color} />
              {tab.key === 'cart' && cartCount > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{cartCount > 99 ? '99+' : cartCount}</Text>
                </View>
              ) : null}
            </View>
            <Text style={[styles.label, { color }]} numberOfLines={1}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  item: {
    // flex: 1 => 4 mục chia đều bề ngang, không phụ thuộc độ dài nhãn
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#ffffff',
  },
  label: {
    fontSize: 11,
    fontWeight: '500',
  },
});

export default TabBar;
