import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const SIZE = 60;

interface FloatingCartButtonProps {
  count?: number;
  onPress?: () => void;
}

function FloatingCartButton({ count = 0, onPress }: FloatingCartButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Feather name="shopping-cart" size={26} color="#ffffff" />
      {count > 0 ? (
        <View style={styles.countBadge}>
          <Text style={styles.countText} numberOfLines={1}>
            {count > 99 ? '99+' : count}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    bottom: 24,
    right: 20,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3730A3',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  countBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#DC2626',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  countText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#ffffff',
  },
});

export default FloatingCartButton;
