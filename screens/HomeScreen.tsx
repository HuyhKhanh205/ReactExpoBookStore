import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header';
import CategoryChips from '../components/CategoryChips';
import BookGrid from '../components/BookGrid';
import FloatingCartButton from '../components/FloatingCartButton';
import { BOOKS, Book } from '../data';

interface HomeScreenProps {
  cartCount?: number;
  onSelectBook?: (book: Book) => void;
  onCartPress?: () => void;
}

function HomeScreen({ cartCount = 0, onSelectBook, onCartPress }: HomeScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Header cố định: nằm ngoài ScrollView nên không cuộn */}
      <Header onCartPress={onCartPress} />

      {/* Vùng nội dung cuộn: flex 1 để chiếm hết phần còn lại sau header */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.chipsWrapper}>
          <CategoryChips />
        </View>

        <BookGrid books={BOOKS} onSelectBook={onSelectBook} />
      </ScrollView>

      {/* Nút nổi: con của SafeAreaView, cùng cấp với ScrollView nên không cuộn theo */}
      <FloatingCartButton count={cartCount} onPress={onCartPress} />
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
