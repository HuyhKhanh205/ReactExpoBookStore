import React from 'react';
import { View, Text, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import BookCard from '../../components/BookCard';
import { BOOKS, Book, formatVnd } from '../../data';

const SCREEN_PADDING = 12;
const GAP = 8;
const COLUMNS = 3;

interface Grid3ColumnsScreenProps {
  onBack?: () => void;
}

function Card({ book }: { book: Book }) {
  return (
    <BookCard
      title={book.title}
      author={book.author}
      price={formatVnd(book.price)}
      coverImage={book.coverImage}
      discountPercent={book.discountPercent}
    />
  );
}

/** Thử thách Giờ 2: lưới 3 cột — so sánh cách dùng gap và cách dùng space-between + %. */
function Grid3ColumnsScreen({ onBack }: Grid3ColumnsScreenProps) {
  const { width } = useWindowDimensions();

  // width = (bề ngang khả dụng - tổng gap) / số cột
  const available = width - SCREEN_PADDING * 2;
  const itemWidth = (available - GAP * (COLUMNS - 1)) / COLUMNS;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Thử thách Giờ 2" onBack={onBack} showCart={false} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>Cách 1 — gap: {GAP}</Text>
        <Text style={styles.sectionHint}>
          width = (bề ngang − tổng gap) / {COLUMNS} = {itemWidth.toFixed(1)}px
        </Text>
        <View style={styles.gridGap}>
          {BOOKS.map((book) => (
            <View key={book.id} style={{ width: itemWidth }}>
              <Card book={book} />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Cách 2 — justifyContent: 'space-between' + width '31%'</Text>
        <Text style={styles.sectionHint}>
          Cố tình để 5 sách để thấy nhược điểm ở hàng cuối.
        </Text>
        <View style={styles.gridBetween}>
          {BOOKS.slice(0, 5).map((book) => (
            <View key={book.id} style={styles.betweenItem}>
              <Card book={book} />
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Ghi chú ưu / nhược</Text>
        <Text style={styles.note}>
          <Text style={styles.noteStrong}>gap</Text> — khoảng cách giữa các cột và các hàng luôn bằng
          nhau và bằng đúng con số mình đặt; hàng cuối thiếu phần tử vẫn xếp từ trái sang, không bị
          dàn ra. Nhược: phải tự tính width = (100% − tổng gap) / số cột; vì RN không có calc() nên
          hoặc chấp nhận % gần đúng, hoặc lấy bề ngang thật bằng useWindowDimensions như trên (bù lại
          được luôn tính lại khi xoay màn hình).{'\n\n'}
          <Text style={styles.noteStrong}>space-between + %</Text> — khỏi tính toán, chỉ cần width nhỏ
          hơn 100/số cột là đủ, khoảng cách tự sinh ra từ phần dư. Nhược: khoảng cách đó phụ thuộc bề
          ngang màn hình nên không kiểm soát được; và khi hàng cuối không đủ số cột thì các phần tử bị
          đẩy về hai mép (thấy rõ ở lưới 5 sách phía trên). Muốn chữa phải chèn phần tử rỗng hoặc đổi
          sang flex-start + margin — lúc đó đã phức tạp hơn gap.{'\n\n'}
          Kết luận: lưới cố định số cột thì dùng gap; space-between chỉ tiện khi số phần tử luôn chia
          hết cho số cột (như lưới 2 cột ở Trang chủ).
        </Text>
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
    padding: SCREEN_PADDING,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
  },
  sectionHint: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
    marginBottom: 10,
  },
  gridGap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: GAP,
  },
  gridBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  betweenItem: {
    width: '31%',
    marginBottom: GAP,
  },
  note: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 21,
    color: '#374151',
  },
  noteStrong: {
    fontWeight: '700',
    color: '#3730A3',
  },
});

export default Grid3ColumnsScreen;
