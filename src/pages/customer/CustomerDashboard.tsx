import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, Package, Clock } from 'lucide-react';
import ProductCatalog from './ProductCatalog';
import Cart from './Cart';
import OrderHistory from './OrderHistory';

const CustomerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Customer Dashboard</h1>
      <nav className="flex space-x-4">
        <Link to="/customer" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Package className="mr-2" />
          Product Catalog
        </Link>
        <Link to="/customer/cart" className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <ShoppingCart className="mr-2" />
          Cart
        </Link>
        <Link to="/customer/orders" className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          <Clock className="mr-2" />
          Order History
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<ProductCatalog />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
    </div>
  );
};

export default CustomerDashboard;