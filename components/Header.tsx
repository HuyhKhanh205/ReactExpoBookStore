import React from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BookStore</Text>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="search" size={22} color="#ffffff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Feather name="shopping-cart" size={22} color="#ffffff" />
        </TouchableOpacity>
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal: 16,
    backgroundColor: '#3730A3',
  },
  logo: {
    fontSize: 20,
    fontWeight: '700',
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
