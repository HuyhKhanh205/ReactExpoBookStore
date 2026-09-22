import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from '@expo/vector-icons/Feather';
import Header from '../components/Header';
import { CartItem, formatVnd } from '../data';

interface CartScreenProps {
  items: CartItem[];
  onChangeQuantity?: (bookId: string, delta: number) => void;
  onContinueShopping?: () => void;
}

function CartScreen({ items, onChangeQuantity, onContinueShopping }: CartScreenProps) {
  const total = items.reduce((sum, item) => sum + item.book.price * item.quantity, 0);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      {/* Vùng 1 — header cố định */}
      <Header title="Giỏ hàng" showCart={false} />

      {/* Vùng 2 — danh sách cuộn, flex 1 */}
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {items.length === 0 ? (
          <View style={styles.empty}>
            <Feather name="shopping-cart" size={48} color="#C7D2FE" />
            <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
            <Pressable style={styles.emptyButton} onPress={onContinueShopping}>
              <Text style={styles.emptyButtonText}>Mua sắm ngay</Text>
            </Pressable>
          </View>
        ) : (
          items.map(({ book, quantity }) => (
            <View key={book.id} style={styles.row}>
              {/* Ảnh: kích thước cố định */}
              <Image source={{ uri: book.coverImage }} style={styles.thumb} resizeMode="cover" />

              {/* Tên + đơn giá: flex 1 để nuốt hết phần dư */}
              <View style={styles.info}>
                <Text style={styles.name} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.unitPrice}>{formatVnd(book.price)}</Text>
              </View>

              {/* Số lượng + thành tiền: width cố định để các dòng thẳng cột */}
              <View style={styles.qtyColumn}>
                <View style={styles.stepper}>
                  <Pressable
                    style={styles.stepperButton}
                    onPress={() => onChangeQuantity?.(book.id, -1)}
                  >
                    <Feather name="minus" size={14} color="#3730A3" />
                  </Pressable>
                  <Text style={styles.qtyText}>{quantity}</Text>
                  <Pressable
                    style={styles.stepperButton}
                    onPress={() => onChangeQuantity?.(book.id, 1)}
                  >
                    <Feather name="plus" size={14} color="#3730A3" />
                  </Pressable>
                </View>
                <Text style={styles.lineTotal} numberOfLines={1}>
                  {formatVnd(book.price * quantity)}
                </Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      {/* Vùng 3 — tổng tiền + thanh toán: cố định, ngoài ScrollView, ngay trên Tab Bar */}
      <View style={styles.summary}>
        <View style={styles.totalBlock}>
          <Text style={styles.totalLabel}>Tổng tiền ({items.length} sản phẩm)</Text>
          <Text style={styles.totalValue}>{formatVnd(total)}</Text>
        </View>
        <Pressable style={[styles.checkout, items.length === 0 && styles.checkoutDisabled]}>
          <Text style={styles.checkoutText}>Thanh toán</Text>
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
  scroll: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  thumb: {
    width: 56,
    height: 76,
    borderRadius: 6,
    backgroundColor: '#E5E7EB',
  },
  info: {
    flex: 1,
    marginHorizontal: 12,
  },
  name: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  unitPrice: {
    fontSize: 12,
    color: 'gray',
    marginTop: 4,
  },
  qtyColumn: {
    width: 96,
    alignItems: 'flex-end',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#C7D2FE',
    borderRadius: 14,
    overflow: 'hidden',
  },
  stepperButton: {
    width: 26,
    height: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyText: {
    minWidth: 20,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  lineTotal: {
    marginTop: 6,
    fontSize: 14,
    fontWeight: '700',
    color: '#DC2626',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyText: {
    fontSize: 15,
    color: 'gray',
  },
  emptyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: '#3730A3',
  },
  emptyButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#ffffff',
  },
  totalBlock: {
    flexShrink: 1,
  },
  totalLabel: {
    fontSize: 12,
    color: 'gray',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#DC2626',
  },
  checkout: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#3730A3',
  },
  checkoutDisabled: {
    backgroundColor: '#A5B4FC',
  },
  checkoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default CartScreen;
