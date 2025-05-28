import React from 'react';

interface HomeProps {
  onNavigate: (section: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const features = [
    {
      id: 'categories',
      title: 'Gestión de Categorías',
      description: 'Administra las categorías de productos de tu tienda',
      icon: '📁',
      color: 'blue'
    },
    {
      id: 'products',
      title: 'Gestión de Productos', 
      description: 'Administra tu inventario de productos con imágenes',
      icon: '📦',
      color: 'green'
    },
    {
      id: 'users',
      title: 'Gestión de Usuarios',
      description: 'Administra los usuarios registrados en tu sistema',
      icon: '👥',
      color: 'purple'
    },
    {
      id: 'cart',
      title: 'Carrito de Compras',
      description: 'Visualiza y gestiona las compras de los usuarios',
      icon: '🛒',
      color: 'orange'
    }
  ];

  const stats = [
    { label: 'Funcionalidades', value: '4', icon: '⚡' },
    { label: 'CRUD Completo', value: '✓', icon: '✅' },
    { label: 'Subida de Archivos', value: '✓', icon: '📤' },
    { label: 'API REST', value: '✓', icon: '🔗' }
  ];

  return (
    <div className="home-page">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">🏪 ADSO Tienda</h1>
          <p className="hero-subtitle">
            Sistema completo de gestión de tienda desarrollado con React y Deno
          </p>
          <div className="hero-description">
            <p>
              Una aplicación moderna que te permite administrar categorías, productos, 
              usuarios y carritos de compra de forma sencilla e intuitiva.
            </p>
          </div>
        </div>
      </div>

      <div className="stats-section">
        <h2>Características destacadas</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="features-section">
        <h2>Funcionalidades disponibles</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className={`feature-card feature-${feature.color}`}
              onClick={() => onNavigate(feature.id)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <div className="feature-content">
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <button className="feature-button">
                  Ir a {feature.title.split(' ')[1]} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tech-section">
        <h2>Tecnologías utilizadas</h2>
        <div className="tech-grid">
          <div className="tech-category">
            <h3>Frontend</h3>
            <ul>
              <li>⚛️ React 19</li>
              <li>📘 TypeScript</li>
              <li>🎨 CSS3 (Sin frameworks)</li>
              <li>⚡ Vite</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Backend</h3>
            <ul>
              <li>🦕 Deno</li>
              <li>🌳 Oak Framework</li>
              <li>🗄️ MySQL</li>
              <li>📡 REST API</li>
            </ul>
          </div>
          <div className="tech-category">
            <h3>Características</h3>
            <ul>
              <li>📱 Diseño Responsivo</li>
              <li>🖼️ Subida de Imágenes</li>
              <li>🔍 Filtros y Búsqueda</li>
              <li>✅ Validación de Forms</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>¿Listo para comenzar?</h2>
        <p>Explora las diferentes secciones y administra tu tienda de forma eficiente</p>
        <div className="cta-buttons">
          <button 
            className="btn btn-primary btn-large"
            onClick={() => onNavigate('products')}
          >
            📦 Ver Productos
          </button>
          <button 
            className="btn btn-secondary btn-large"
            onClick={() => onNavigate('categories')}
          >
            📁 Ver Categorías
          </button>
        </div>
      </div>
    </div>
  );
};