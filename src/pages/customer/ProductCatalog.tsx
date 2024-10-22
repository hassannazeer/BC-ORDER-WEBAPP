import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { fetchProducts, addToCart } from '../../services/api';

interface Product {
  id: string;
  name: string;
  price: number;
  inventory: number;
}

const ProductCatalog: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    loadProducts();
  }, []);

  const handleAddToCart = async (productId: string) => {
    try {
      await addToCart(productId);
      // Update local state or show a success message
    } catch (error) {
      console.error('Failed to add product to cart', error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mb-4">In stock: {product.inventory}</p>
          <button
            onClick={() => handleAddToCart(product.id)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          >
            <Plus className="mr-2" />
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCatalog;