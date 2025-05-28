import React, { useState, useMemo } from 'react';
import type  { Product, ProductFormData, Category } from '../../types';
import { Loading } from '../common/Loading';
import { ConfirmModal, Modal } from '../common/Modal';
import { ProductForm } from './ProductForm';
import { ProductCard } from './ProductCard'; // Volviendo a named import

interface ProductListProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
  error: string | null;
  onCreateProduct: (data: ProductFormData) => Promise<void>;
  onUpdateProduct: (id: number, data: ProductFormData) => Promise<void>;
  onDeleteProduct: (id: number) => Promise<void>;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  categories,
  loading,
  error,
  onCreateProduct,
  onUpdateProduct,
  onDeleteProduct
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<Product | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [filterCategory, setFilterCategory] = useState<number | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrar productos
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filtrar por categoría
    if (filterCategory !== 'all') {
      filtered = filtered.filter(product => product.idCategoria === filterCategory);
    }

    // Filtrar por término de búsqueda
    if (searchTerm.trim()) {
      filtered = filtered.filter(product =>
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [products, filterCategory, searchTerm]);

  const handleCreate = async (data: ProductFormData) => {
    setActionLoading(true);
    try {
      await onCreateProduct(data);
      setShowCreateModal(false);
    } catch (error) {
      console.error('Error al crear producto:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (data: ProductFormData) => {
    if (!editingProduct) return;
    
    setActionLoading(true);
    try {
      await onUpdateProduct(editingProduct.idProducto, data);
      setEditingProduct(null);
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deletingProduct) return;
    
    setActionLoading(true);
    try {
      await onDeleteProduct(deletingProduct.idProducto);
      setDeletingProduct(null);
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Cargando productos..." />;
  }

  return (
    <div className="product-list">
      <div className="section-header">
        <h2>📦 Gestión de Productos</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          ➕ Nuevo Producto
        </button>
      </div>

      {error && (
        <div className="error-message">
          <p>❌ {error}</p>
        </div>
      )}

      {/* Filtros */}
      <div className="filters-section">
        <div className="filter-group">
          <label htmlFor="search">🔍 Buscar producto:</label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por descripción..."
            className="form-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category-filter">📁 Filtrar por categoría:</label>
          <select
            id="category-filter"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value === 'all' ? 'all' : Number(e.target.value))}
            className="form-select"
          >
            <option value="all">Todas las categorías</option>
            {categories.map(category => (
              <option key={category.idCategoria} value={category.idCategoria}>
                {category.nombreCategoria}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de productos */}
      <div className="products-grid">
        {filteredProducts.length === 0 ? (
          <div className="empty-state">
            <p>📦 No hay productos {filterCategory !== 'all' || searchTerm ? 'que coincidan con los filtros' : 'registrados'}</p>
            {filterCategory === 'all' && !searchTerm && (
              <button 
                className="btn btn-primary"
                onClick={() => setShowCreateModal(true)}
              >
                Crear primer producto
              </button>
            )}
          </div>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.idProducto}
              product={product}
              categories={categories}
              onEdit={() => setEditingProduct(product)}
              onDelete={() => setDeletingProduct(product)}
            />
          ))
        )}
      </div>

      {/* Modal para crear producto */}
      <Modal
        isOpen={showCreateModal}
        title="Nuevo Producto"
        onClose={() => setShowCreateModal(false)}
        size="large"
      >
        <ProductForm
          categories={categories}
          onSubmit={handleCreate}
          onCancel={() => setShowCreateModal(false)}
          loading={actionLoading}
        />
      </Modal>

      {/* Modal para editar producto */}
      <Modal
        isOpen={!!editingProduct}
        title="Editar Producto"
        onClose={() => setEditingProduct(null)}
        size="large"
      >
        <ProductForm
          initialData={editingProduct || undefined}
          categories={categories}
          onSubmit={handleUpdate}
          onCancel={() => setEditingProduct(null)}
          loading={actionLoading}
        />
      </Modal>

      {/* Modal de confirmación para eliminar */}
      <ConfirmModal
        isOpen={!!deletingProduct}
        title="Eliminar Producto"
        message={`¿Estás seguro de que deseas eliminar el producto "${deletingProduct?.descripcion}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingProduct(null)}
        confirmText="Eliminar"
        danger={true}
      />
    </div>
  );
};