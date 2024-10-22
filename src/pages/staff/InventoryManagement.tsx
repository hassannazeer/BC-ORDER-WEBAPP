import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, RefreshCw } from 'lucide-react';
import { fetchInventory, updateInventory, syncWithBusinessCentral } from '../../services/api';

interface InventoryItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
}

const InventoryManagement: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    setIsLoading(true);
    try {
      const data = await fetchInventory();
      setInventory(data);
    } catch (error) {
      console.error('Failed to load inventory', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateItem = async (item: InventoryItem) => {
    try {
      await updateInventory(item);
      loadInventory(); // Reload to get updated data
    } catch (error) {
      console.error('Failed to update inventory item', error);
    }
  };

  const handleSyncWithBC = async () => {
    setIsLoading(true);
    try {
      await syncWithBusinessCentral();
      loadInventory(); // Reload after sync
    } catch (error) {
      console.error('Failed to sync with Business Central', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Inventory Management</h2>
        <button
          onClick={handleSyncWithBC}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
          disabled={isLoading}
        >
          <RefreshCw className="mr-2" />
          Sync with Business Central
        </button>
      </div>
      {isLoading ? (
        <p>Loading inventory...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">Name</th>
              <th className="py-2 px-4 text-left">SKU</th>
              <th className="py-2 px-4 text-left">Quantity</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {inventory.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.name}</td>
                <td className="py-2 px-4">{item.sku}</td>
                <td className="py-2 px-4">{item.quantity}</td>
                <td className="py-2 px-4">${item.price.toFixed(2)}</td>
                <td className="py-2 px-4 flex space-x-2">
                  <button className="text-blue-500 hover:text-blue-700">
                    <Edit size={18} />
                  </button>
                  <button className="text-red-500 hover:text-red-700">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center">
        <Plus className="mr-2" />
        Add New Item
      </button>
    </div>
  );
};

export default InventoryManagement;