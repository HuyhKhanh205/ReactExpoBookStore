import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface BookCardProps {
  title: string;
  author: string;
  price: string;
  coverImage?: ImageSourcePropType | string;
}

function BookCard({ title, author, price, coverImage }: BookCardProps) {
  const coverSource = typeof coverImage === 'string' ? { uri: coverImage } : coverImage;
  return (
    <View style={styles.card}>
      {coverSource ? (
        <Image source={coverSource} style={styles.cover} resizeMode="cover" />
      ) : (
        <View style={styles.coverPlaceholder} />
      )}
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>{title}</Text>
        <Text style={styles.author} numberOfLines={1}>{author}</Text>
        <Text style={styles.price}>{price}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 8,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 6,
  },
  coverPlaceholder: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
  },
  info: {
    marginTop: 8,
    alignItems: "center"
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  author: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '700',
    color: 'red',
    marginTop: 4,
  },
});

export default BookCard;
