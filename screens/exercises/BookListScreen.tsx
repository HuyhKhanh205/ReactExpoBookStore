import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlexAlignType } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import BookCardRow from '../../components/BookCardRow';
import { BOOKS } from '../../data';

interface BookListScreenProps {
  onBack?: () => void;
}

/** Thử thách Giờ 1: Header cố định + danh sách Book Card xếp chồng theo cột. */
function BookListScreen({ onBack }: BookListScreenProps) {
  const [align, setAlign] = useState<FlexAlignType>('flex-start');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Thử thách Giờ 1" onBack={onBack} showCart={false} />

      {/* flex: 1 để vùng nội dung chiếm hết phần còn lại của màn hình sau header */}
      <View style={styles.content}>
        <View style={styles.toolbar}>
          <Text style={styles.toolbarLabel}>alignItems của card:</Text>
          <View style={styles.switchGroup}>
            {(['flex-start', 'center'] as FlexAlignType[]).map((value) => (
              <Pressable
                key={String(value)}
                style={[styles.switchButton, align === value && styles.switchButtonActive]}
                onPress={() => setAlign(value)}
              >
                <Text style={[styles.switchText, align === value && styles.switchTextActive]}>
                  {String(value)}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {BOOKS.slice(0, 5).map((book) => (
            <View key={book.id} style={styles.item}>
              <BookCardRow book={book} align={align} />
            </View>
          ))}

          <Text style={styles.note}>
            'flex-start': ảnh bìa và cột thông tin cùng bắt đầu từ mép trên — các card cao thấp khác
            nhau vẫn thẳng hàng phía trên.{'\n\n'}
            'center': ảnh bìa và cột thông tin canh giữa theo trục dọc — đẹp khi hai bên cao gần bằng
            nhau, nhưng lệch trông thấy nếu tên sách dài 2 dòng.
          </Text>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#3730A3',
  },
  content: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  toolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  toolbarLabel: {
    fontSize: 13,
    color: 'gray',
  },
  switchGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  switchButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  switchButtonActive: {
    backgroundColor: '#3730A3',
    borderColor: '#3730A3',
  },
  switchText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#3730A3',
  },
  switchTextActive: {
    color: '#ffffff',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 12,
  },
  item: {
    marginBottom: 12,
  },
  note: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    color: '#374151',
  },
});

export default BookListScreen;
