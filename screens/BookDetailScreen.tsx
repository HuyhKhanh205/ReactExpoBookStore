import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../components/Header';
import { BOOKS, Book, formatVnd } from '../data';

interface BookDetailScreenProps {
  book?: Book;
  onBack?: () => void;
  onAddToCart?: (book: Book) => void;
}

function BookDetailScreen({ book = BOOKS[0], onBack, onAddToCart }: BookDetailScreenProps) {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header cố định: nút back quay lại trang chủ */}
      <Header title={book.title} onBack={onBack} />

      {/* Vùng cố định phía trên: ảnh bìa lớn căn giữa */}
      <View style={styles.coverSection}>
        <View style={styles.coverWrapper}>
          <Image source={{ uri: book.coverImage }} style={styles.cover} resizeMode="cover" />
          {book.discountPercent ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>-{book.discountPercent}%</Text>
            </View>
          ) : null}
        </View>
      </View>

      {/* Vùng cuộn ở giữa: flex 1 nên không đẩy tràn thanh cố định phía dưới */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{book.title}</Text>
        <Text style={styles.author}>{book.author}</Text>

        <View style={styles.priceRow}>
          <Text style={styles.price}>{formatVnd(book.price)}</Text>
          {book.discountPercent ? (
            <Text style={styles.discountNote}>Giảm {book.discountPercent}% hôm nay</Text>
          ) : null}
        </View>

        <Text style={styles.sectionTitle}>Mô tả sách</Text>
        <Text style={styles.description}>{book.description}</Text>
      </ScrollView>

      {/* Vùng cố định phía dưới: nằm ngoài ScrollView */}
      <View style={[styles.bottomBar, { paddingBottom: 12 + insets.bottom }]}>
        <View style={styles.bottomPrice}>
          <Text style={styles.bottomPriceLabel}>Tạm tính</Text>
          <Text style={styles.bottomPriceValue}>{formatVnd(book.price)}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={() => onAddToCart?.(book)}>
          <Text style={styles.addButtonText}>Thêm vào giỏ</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3730A3',
  },
  coverSection: {
    paddingTop: 16,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
  },
  coverWrapper: {
    alignSelf: 'center',
    width: '55%',
    position: 'relative',
    borderRadius: 10,
    backgroundColor: '#ffffff',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  cover: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 10,
  },
  badge: {
    position: 'absolute',
    top: 8,
    left: 8,
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    backgroundColor: '#DC2626',
  },
  badgeText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  author: {
    fontSize: 14,
    color: 'gray',
    marginTop: 4,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
  },
  price: {
    fontSize: 22,
    fontWeight: '700',
    color: '#DC2626',
  },
  discountNote: {
    fontSize: 12,
    color: '#3730A3',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginTop: 20,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#374151',
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  bottomPrice: {
    flexShrink: 1,
  },
  bottomPriceLabel: {
    fontSize: 12,
    color: 'gray',
  },
  bottomPriceValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },
  addButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#3730A3',
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default BookDetailScreen;
