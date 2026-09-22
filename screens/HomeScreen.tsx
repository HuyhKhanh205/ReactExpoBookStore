import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import FloatingCartButton from '../components/FloatingCartButton';
import { BOOKS, Book } from '../data';
import { useCart } from '../context/CartContext';

function HomeScreen() {
  const navigation = useNavigation();
  const { count } = useCart();

  const goToCart = () => navigation.navigate('MainTabs', { screen: 'Cart' });
  const openBook = (book: Book) => navigation.navigate('BookDetail', { bookId: book.id });

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header cố định: nằm ngoài ScrollView nên không cuộn */}
      <Header onCartPress={goToCart} />

      {/* Vùng nội dung cuộn: flex 1 để chiếm hết phần còn lại sau header */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chipsWrapper}>
          <CategoryChips />
        </View>

        <BookGrid books={BOOKS} onSelectBook={openBook} />
      </ScrollView>

      {/* Nút nổi: con của SafeAreaView, cùng cấp với ScrollView nên không cuộn theo */}
      <FloatingCartButton count={count} onPress={goToCart} />
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
    paddingBottom: 100,
  },
  chipsWrapper: {
    marginBottom: 16,
  },
});

export default HomeScreen;
