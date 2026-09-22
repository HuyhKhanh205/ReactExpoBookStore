import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import { BOOKS, Book } from '../data';

function CategoriesScreen() {
  const navigation = useNavigation();

  const goToCart = () => navigation.navigate('MainTabs', { screen: 'Cart' });
  const openBook = (book: Book) => navigation.navigate('BookDetail', { bookId: book.id });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Danh mục" onCartPress={goToCart} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={[styles.sectionTitle, styles.firstSectionTitle]}>Chủ đề</Text>
        <CategoryChips />

        <Text style={styles.sectionTitle}>Sách nổi bật</Text>
        <BookGrid books={BOOKS} onSelectBook={openBook} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3730A3',
  },
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
    marginTop: 24,
  },
  firstSectionTitle: {
    marginTop: 4,
  },
});

export default CategoriesScreen;
