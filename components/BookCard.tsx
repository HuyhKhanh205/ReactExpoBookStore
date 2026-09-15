import React from 'react';
import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface BookCardProps {
  title: string;
  author: string;
  price: string;
  coverImage?: ImageSourcePropType | string;
  discountPercent?: number;
}

function BookCard({ title, author, price, coverImage, discountPercent }: BookCardProps) {
  const coverSource = typeof coverImage === 'string' ? { uri: coverImage } : coverImage;
  return (
    <View style={styles.card}>
      <View style={styles.coverWrapper}>
        {coverSource ? (
          <Image source={coverSource} style={styles.cover} resizeMode="cover" />
        ) : (
          <View style={styles.coverPlaceholder} />
        )}
        {discountPercent ? (
          <View style={[styles.badge, styles.badgeDiscount]}>
            <Text style={styles.badgeText}>-{discountPercent}%</Text>
          </View>
        ) : null}
      </View>
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
  coverWrapper: {
    position: 'relative',
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
  badge: {
    position: 'absolute',
    top: 6,
    left: 6,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeDiscount: {
    backgroundColor: '#DC2626',
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  info: {
    marginTop: 8,
    alignItems: "center"
  },
  title: {
    fontSize: 14,
    lineHeight: 18,
    height: 36,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
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
