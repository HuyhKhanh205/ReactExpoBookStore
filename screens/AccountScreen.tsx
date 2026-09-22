import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Feather from '@expo/vector-icons/Feather';
import Header from '../components/Header';

const MENU: { key: string; label: string; icon: React.ComponentProps<typeof Feather>['name'] }[] = [
  { key: 'orders', label: 'Đơn hàng của tôi', icon: 'package' },
  { key: 'address', label: 'Sổ địa chỉ', icon: 'map-pin' },
  { key: 'favorite', label: 'Sách yêu thích', icon: 'heart' },
  { key: 'voucher', label: 'Mã giảm giá', icon: 'tag' },
  { key: 'settings', label: 'Cài đặt', icon: 'settings' },
];

function AccountScreen() {
  const navigation = useNavigation();

  const goToCart = () => navigation.navigate('MainTabs', { screen: 'Cart' });
  const openBookList = () => navigation.navigate('ExerciseList');
  const openGrid3Columns = () => navigation.navigate('ExerciseGrid3');

  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <Header title="Tài khoản" onCartPress={goToCart} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Khối hồ sơ: avatar tròn bên trái, thông tin flex 1 bên phải */}
        <View style={styles.profile}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>KH</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName} numberOfLines={1}>Khánh Huỳnh</Text>
            <Text style={styles.profileEmail} numberOfLines={1}>khanhhuynh@example.com</Text>
          </View>
          <Pressable style={styles.editButton}>
            <Feather name="edit-2" size={16} color="#3730A3" />
          </Pressable>
        </View>

        {/* Hàng thống kê: 3 ô chia đều bằng flex 1 */}
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Đơn hàng</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>8</Text>
            <Text style={styles.statLabel}>Yêu thích</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Mã giảm</Text>
          </View>
        </View>

        <View style={styles.menu}>
          {MENU.map((item) => (
            <Pressable key={item.key} style={styles.menuRow}>
              <Feather name={item.icon} size={18} color="#3730A3" />
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Feather name="chevron-right" size={18} color="#9CA3AF" />
            </Pressable>
          ))}
        </View>

        {/* Lối vào 2 màn thử thách layout (Giờ 1 và Giờ 2) */}
        <Text style={styles.groupTitle}>Bài tập layout</Text>
        <View style={styles.menu}>
          <Pressable style={styles.menuRow} onPress={openBookList}>
            <Feather name="list" size={18} color="#3730A3" />
            <Text style={styles.menuLabel}>Thử thách Giờ 1 — danh sách card row</Text>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </Pressable>
          <Pressable style={styles.menuRow} onPress={openGrid3Columns}>
            <Feather name="columns" size={18} color="#3730A3" />
            <Text style={styles.menuLabel}>Thử thách Giờ 2 — lưới 3 cột</Text>
            <Feather name="chevron-right" size={18} color="#9CA3AF" />
          </Pressable>
        </View>

        <Pressable style={styles.logout}>
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </Pressable>
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
    padding: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#EEF2FF',
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3730A3',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
  },
  profileInfo: {
    flex: 1,
    marginHorizontal: 12,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  profileEmail: {
    fontSize: 13,
    color: 'gray',
    marginTop: 2,
  },
  editButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  stats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    width: 1,
    alignSelf: 'stretch',
    backgroundColor: '#E5E7EB',
  },
  statValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#3730A3',
  },
  statLabel: {
    fontSize: 12,
    color: 'gray',
    marginTop: 2,
  },
  groupTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: 'gray',
    marginTop: 20,
    marginBottom: -4,
  },
  menu: {
    marginTop: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#1a1a1a',
  },
  logout: {
    marginTop: 24,
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#DC2626',
  },
});

export default AccountScreen;
