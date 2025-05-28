import React, { useState, useMemo } from 'react';
import type { CartItem, CartFormData, User, Product } from '../../types';
import { Loading } from '../common/Loading';
import { ConfirmModal, Modal } from '../common/Modal';
import { AddToCart } from './AddToCart';
import { CartItemComponent } from './CartItem';

interface CartListProps {
  cartItems: CartItem[];
  users: User[];
  products: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (data: CartFormData) => Promise<void>;
  onUpdateCartItem: (id: number, data: CartFormData) => Promise<void>;
  onRemoveFromCart: (id: number) => Promise<void>;
}

export const CartList: React.FC<CartListProps> = ({
  cartItems,
  users,
  products,
  loading,
  error,
  onAddToCart,
  onUpdateCartItem,
  onRemoveFromCart
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);
  const [deletingItem, setDeletingItem] = useState<CartItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterUser, setFilterUser] = useState<number | 'all'>('all');

  // Filtrar items del carrito por usuario
  const filteredCartItems = useMemo(() => {
    if (filterUser === 'all') return cartItems;
    return cartItems.filter(item => item.idUsuario === filterUser);
  }, [cartItems, filterUser]);

  // Enriquecer items del carrito con información de usuarios y productos
  const enrichedCartItems = useMemo(() => {
    return filteredCartItems.map(item => {
      const user = users.find(u => u.idUsuario === item.idUsuario);
      const product = products.find(p => p.idProducto === item.idProducto);
      
      return {
        ...item,
        userName: user ? `${user.nombre} ${user.apellido}` : 'Usuario desconocido',
        userDocument: user?.documento || '',
        productName: product?.descripcion || 'Producto desconocido',
        productPrice: product?.precio || 0,
        productImage: product?.urlImagen || ''
      };
    });
  }, [filteredCartItems, users, products]);

  const handleAdd = async (data: CartFormData) => {
    setActionLoading(true);
    try {
      await onAddToCart(data);
      setShowAddModal(false);
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: CartFormData) => {
    if (!editingItem) return;
    
    setActionLoading(true);
    try {
      await onUpdateCartItem(editingItem.idCompra, data);
      setEditingItem(null);
    } catch (error) {
      console.error('Error al actualizar item del carrito:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingItem) return;
    
    setActionLoading(true);
    try {
      await onRemoveFromCart(deletingItem.idCompra);
      setDeletingItem(null);
    } catch (error) {
      console.error('Error al eliminar del carrito:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando carrito..." />;
  }

  return (
    <div className="cart-list">
      <div className="section-header">
        <h2>🛒 Carrito de Compras</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowAddModal(true)}
        >
          ➕ Agregar al Carrito
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Filtro por usuario */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="user-filter">👤 Filtrar por usuario:</label>
          <select
            id="user-filter"
            value={filterUser}
            onChange={(e) => setFilterUser(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="form-select"
          >
            <option value="all">Todos los usuarios</option>
            {users.map(user => (
              <option key={user.idUsuario} value={user.idUsuario}>
                {user.nombre} {user.apellido} - {user.documento}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de items del carrito */}
      <div className="cart-items-container">
        {enrichedCartItems.length === 0 ? (
          <div className="empty-state">
            <p>🛒 No hay items en el carrito {filterUser !== 'all' ? 'para este usuario' : ''}</p>
            <button 
              className="btn btn-primary"
              onClick={() => setShowAddModal(true)}
            >
              Agregar primer item
            </button>
          </div>
        ) : (
          <div className="cart-items-grid">
            {enrichedCartItems.map(item => (
              <CartItemComponent
                key={item.idCompra}
                item={item}
                onEdit={() => setEditingItem(item)}
                onDelete={() => setDeletingItem(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Resumen del carrito */}
      {enrichedCartItems.length > 0 && (
        <div className="cart-summary">
          <h3>📊 Resumen</h3>
          <div className="summary-stats">
            <div className="stat-item">
              <span className="stat-label">Total de items:</span>
              <span className="stat-value">{enrichedCartItems.length}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Valor total:</span>
              <span className="stat-value">
                {new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP'
                }).format(
                  enrichedCartItems.reduce((total, item) => total + item.productPrice, 0)
                )}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Modal para agregar al carrito */}
      <Modal
        isOpen={showAddModal}
        title="Agregar al Carrito"
        onClose={() => setShowAddModal(false)}
      >
        <AddToCart
          users={users}
          products={products}
          onSubmit={handleAdd}
          onCancel={() => setShowAddModal(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Modal para editar item del carrito */}
      <Modal
        isOpen={!!editingItem}
        title="Editar Item del Carrito"
        onClose={() => setEditingItem(null)}
      >
        <AddToCart
          users={users}
          products={products}
          initialData={editingItem || undefined}
          onSubmit={handleUpdate}
          onCancel={() => setEditingItem(null)}
          loading={actionLoading}
        />
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={!!deletingItem}
        title="Eliminar del Carrito"
        message={`¿Estás seguro de que deseas eliminar este item del carrito?`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingItem(null)}
        confirmText="Eliminar"
        danger={true}
      />
    </div>
  );
};