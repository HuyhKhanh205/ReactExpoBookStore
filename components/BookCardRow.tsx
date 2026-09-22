import React from 'react';
import { View, Text, Image, StyleSheet, FlexAlignType } from 'react-native';
import { Book, formatVnd } from '../data';

const COVER_WIDTH = 80;
const COVER_HEIGHT = 110;

interface BookCardRowProps {
  book: Book;
  /** 'flex-start' (mặc định) hay 'center' — để so sánh 2 cách canh của Giờ 1. */
  align?: FlexAlignType;
}

function BookCardRow({ book, align = 'flex-start' }: BookCardRowProps) {
  return (
    <View style={[styles.card, { alignItems: align }]}>
      {/* Ảnh bìa: kích thước cố định */}
      <Image source={{ uri: book.coverImage }} style={styles.cover} resizeMode="cover" />

      {/* Cột thông tin: flex 1 chiếm hết phần còn lại, giá bị space-between đẩy xuống đáy */}
      <View style={styles.info}>
        <View>
          <Text style={styles.title} numberOfLines={2}>{book.title}</Text>
          <Text style={styles.author} numberOfLines={1}>{book.author}</Text>
        </View>
        <Text style={styles.price}>{formatVnd(book.price)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  cover: {
    width: COVER_WIDTH,
    height: COVER_HEIGHT,
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // Cao bằng ảnh bìa thì space-between mới có khoảng trống để đẩy giá xuống đáy
    height: COVER_HEIGHT,
    marginLeft: 12,
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  author: {
    fontSize: 13,
    color: 'gray',
    marginTop: 4,
  },
  price: {
    fontSize: 15,
    fontWeight: '700',
    color: '#DC2626',
  },
});

export default BookCardRow;
