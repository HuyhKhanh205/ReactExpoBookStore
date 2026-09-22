import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TabBar, { TabKey } from './components/TabBar';
import HomeScreen from './screens/HomeScreen';
import CategoriesScreen from './screens/CategoriesScreen';
import CartScreen from './screens/CartScreen';
import AccountScreen from './screens/AccountScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import BookListScreen from './screens/exercises/BookListScreen';
import Grid3ColumnsScreen from './screens/exercises/Grid3ColumnsScreen';
import { Book, CartItem } from './data';

/**
 * Luồng màn hình chỉ bằng state cục bộ (chưa dùng thư viện navigation):
 * - 4 tab dùng chung một Tab Bar ở đáy.
 * - Màn Chi tiết mở đè lên trên, ẩn Tab Bar, quay lại bằng nút back.
 */
type Route =
  | { name: 'tab'; tab: TabKey }
  /** `from` để nút back trả về đúng tab đã mở chi tiết, không phải luôn về Trang chủ. */
  | { name: 'detail'; book: Book; from: TabKey }
  | { name: 'exerciseList' }
  | { name: 'exerciseGrid3' };

export default function App() {
  const [route, setRoute] = useState<Route>({ name: 'tab', tab: 'home' });
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const goToTab = (tab: TabKey) => setRoute({ name: 'tab', tab });
  const openDetail = (book: Book, from: TabKey) => setRoute({ name: 'detail', book, from });

  const addToCart = (book: Book) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.book.id === book.id);
      if (existing) {
        return items.map((item) =>
          item.book.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...items, { book, quantity: 1 }];
    });
    goToTab('cart');
  };

  const changeQuantity = (bookId: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.book.id === bookId ? { ...item, quantity: item.quantity + delta } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const renderTab = (tab: TabKey) => {
    switch (tab) {
      case 'home':
        return (
          <HomeScreen
            cartCount={cartCount}
            onSelectBook={(book) => openDetail(book, 'home')}
            onCartPress={() => goToTab('cart')}
          />
        );
      case 'categories':
        return (
          <CategoriesScreen
            onSelectBook={(book) => openDetail(book, 'categories')}
            onCartPress={() => goToTab('cart')}
          />
        );
      case 'cart':
        return (
          <CartScreen
            items={cartItems}
            onChangeQuantity={changeQuantity}
            onContinueShopping={() => goToTab('home')}
          />
        );
      case 'account':
        return (
          <AccountScreen
            onCartPress={() => goToTab('cart')}
            onOpenBookList={() => setRoute({ name: 'exerciseList' })}
            onOpenGrid3Columns={() => setRoute({ name: 'exerciseGrid3' })}
          />
        );
    }
  };

  const renderRoute = () => {
    switch (route.name) {
      case 'tab':
        return (
          <>
            {/* Nội dung tab chiếm phần trên, Tab Bar cố định phía dưới (không chồng lấp) */}
            {renderTab(route.tab)}
            <TabBar active={route.tab} onChange={goToTab} cartCount={cartCount} />
          </>
        );
      case 'detail':
        return (
          <BookDetailScreen
            book={route.book}
            onBack={() => goToTab(route.from)}
            onAddToCart={addToCart}
          />
        );
      case 'exerciseList':
        return <BookListScreen onBack={() => goToTab('account')} />;
      case 'exerciseGrid3':
        return <Grid3ColumnsScreen onBack={() => goToTab('account')} />;
    }
  };

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <View style={styles.root}>{renderRoute()}</View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
