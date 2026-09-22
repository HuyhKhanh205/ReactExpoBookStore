import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

interface HeaderProps {
  /** Có title + onBack => header dạng màn chi tiết; không có => header trang chủ. */
  title?: string;
  onBack?: () => void;
  onSearchPress?: () => void;
  onCartPress?: () => void;
  showSearch?: boolean;
  showCart?: boolean;
}

function Header({
  title,
  onBack,
  onSearchPress,
  onCartPress,
  showSearch = !onBack,
  showCart = true,
}: HeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {onBack ? (
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Feather name="arrow-left" size={22} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
        <Text style={title ? styles.title : styles.logo} numberOfLines={1}>
          {title ?? 'BookStore'}
        </Text>
      </View>
      <View style={styles.actions}>
        {showSearch ? (
          <TouchableOpacity style={styles.iconButton} onPress={onSearchPress}>
            <Feather name="search" size={22} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
        {showCart ? (
          <TouchableOpacity style={styles.iconButton} onPress={onCartPress}>
            <Feather name="shopping-cart" size={22} color="#ffffff" />
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    paddingHorizontal: 16,
    backgroundColor: '#3730A3',
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 12,
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
    color: '#ffffff',
  },
  title: {
    flexShrink: 1,
    fontSize: 17,
    fontWeight: '600',
    color: '#ffffff',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    marginLeft: 16,
  },
});

export default Header;
