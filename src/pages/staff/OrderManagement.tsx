import React, { useState, useEffect } from 'react';
import { Eye, Truck, CheckCircle } from 'lucide-react';
import { fetchOrders, updateOrderStatus } from '../../services/api';

interface Order {
  id: string;
  customerName: string;
  date: string;
  status: string;
  total: number;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const data = await fetchOrders();
      setOrders(data);
    } catch (error) {
      console.error('Failed to load orders', error);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      loadOrders(); // Reload to get updated data
    } catch (error) {
      console.error('Failed to update order status', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Management</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Order ID</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Date</th>
            <th className="py-2 px-4 text-left">Status</th>
            <th className="py-2 px-4 text-left">Total</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="border-b">
              <td className="py-2 px-4">{order.id}</td>
              <td className="py-2 px-4">{order.customerName}</td>
              <td className="py-2 px-4">{new Date(order.date).toLocaleDateString()}</td>
              <td className="py-2 px-4">{order.status}</td>
              <td className="py-2 px-4">${order.total.toFixed(2)}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700" title="View Details">
                  <Eye size={18} />
                </button>
                <button
                  className="text-green-500 hover:text-green-700"
                  title="Mark as Shipped"
                  onClick={() => handleUpdateStatus(order.id, 'Shipped')}
                >
                  <Truck size={18} />
                </button>
                <button
                  className="text-purple-500 hover:text-purple-700"
                  title="Mark as Completed"
                  onClick={() => handleUpdateStatus(order.id, 'Completed')}
                >
                  <CheckCircle size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;