import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CATEGORIES } from '../data';

function CategoryChips() {
  return (
    <View style={styles.container}>
      {CATEGORIES.map((label) => (
        <View key={label} style={styles.chip}>
          <Text style={styles.chipText}>{label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    gap: 8,
  },
  chip: {
    width: 'auto',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#3730A3',
    backgroundColor: '#ffffff',
  },
  chipText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3730A3',
  },
});

export default CategoryChips;
