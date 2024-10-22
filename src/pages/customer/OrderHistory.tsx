import React, { useState, useEffect } from 'react';
import { Clock, Package } from 'lucide-react';
import { fetchOrderHistory } from '../../services/api';

interface Order {
  id: string;
  date: string;
  status: string;
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const loadOrderHistory = async () => {
      const fetchedOrders = await fetchOrderHistory();
      setOrders(fetchedOrders);
    };
    loadOrderHistory();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-4">Order History</h2>
      {orders.length === 0 ? (
        <p>You haven't placed any orders yet.</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Order #{order.id}</h3>
              <span className="text-gray-600 flex items-center">
                <Clock className="mr-2" />
                {new Date(order.date).toLocaleDateString()}
              </span>
            </div>
            <p className="text-lg font-medium mb-2">Status: {order.status}</p>
            <ul className="divide-y divide-gray-200 mb-4">
              {order.items.map((item, index) => (
                <li key={index} className="py-2 flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total: ${order.total.toFixed(2)}</span>
              <span className="text-green-500 flex items-center">
                <Package className="mr-2" />
                Track Order
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;