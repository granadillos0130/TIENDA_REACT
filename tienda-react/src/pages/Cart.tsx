import React from 'react';
import { CartList } from '../components/cart/CartList';
import { useCart } from '../hooks/useCart';
import { useUsers } from '../hooks/useUsers';
import { useProducts } from '../hooks/useProducts';
import type { CartFormData } from '../types';

export const Cart: React.FC = () => {
  const {
    cartItems,
    loading: cartLoading,
    error: cartError,
    addToCart,
    updateCartItem,
    removeFromCart
  } = useCart();

  const {
    users,
    loading: usersLoading
  } = useUsers();

  const {
    products,
    loading: productsLoading
  } = useProducts();

  const handleAddToCart = async (data: CartFormData) => {
    await addToCart(data);
  };

  const handleUpdateCartItem = async (id: number, data: CartFormData) => {
    await updateCartItem(id, data);
  };

  const handleRemoveFromCart = async (id: number) => {
    await removeFromCart(id);
  };

  return (
    <div className="cart-page">
      <CartList
        cartItems={cartItems}
        users={users}
        products={products}
        loading={cartLoading || usersLoading || productsLoading}
        error={cartError}
        onAddToCart={handleAddToCart}
        onUpdateCartItem={handleUpdateCartItem}
        onRemoveFromCart={handleRemoveFromCart}
      />
    </div>
  );
};