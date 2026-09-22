import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import BookCard from './BookCard';
import { Book, formatVnd } from '../data';

interface BookGridProps {
  books: Book[];
  onSelectBook?: (book: Book) => void;
}

function BookGrid({ books, onSelectBook }: BookGridProps) {
  return (
    <View style={styles.grid}>
      {books.map((book) => (
        <Pressable key={book.id} style={styles.item} onPress={() => onSelectBook?.(book)}>
          <BookCard
            title={book.title}
            author={book.author}
            price={formatVnd(book.price)}
            coverImage={book.coverImage}
            discountPercent={book.discountPercent}
          />
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '48%',
    marginBottom: 16,
  },
});

export default BookGrid;
