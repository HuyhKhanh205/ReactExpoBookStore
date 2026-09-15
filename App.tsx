import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import Header from './components/Header';
import BookCard from './components/BookCard';
import CategoryChips from './components/CategoryChips';

const BOOKS = [
  { id: '1', title: 'Đắc Nhân Tâm', author: 'Dale Carnegie', price: '86.000đ', coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600", discountPercent: 20 },
  { id: '2', title: 'Nhà Giả Kim', author: 'Paulo Coelho', price: '79.000đ',coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600" },
  { id: '3', title: 'Tuổi Trẻ Đáng Giá Bao Nhiêu', author: 'Rosie Nguyễn', price: '68.000đ',coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?auto=format&fit=crop&q=80&w=600", discountPercent:10 },
  
];

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <ScrollView style={styles.content} contentContainerStyle={styles.list}>
        <View style={styles.chipsWrapper}>
          <CategoryChips />
        </View>
        <View style={styles.grid}>
          {BOOKS.map((book) => (
            <View key={book.id} style={[styles.cardWrapper]}>
              <BookCard
                title={book.title}
                author={book.author}
                price={book.price}
                coverImage={{ uri: book.coverImage }}
                discountPercent={book.discountPercent}
              />
            </View>
          ))}
        </View>
      </ScrollView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  list: {
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cardWrapper: {
    width: '48%',
  },
  chipsWrapper: {
    marginBottom: 10,
  },
});
