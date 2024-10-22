import React, { useState, useEffect } from 'react';
import { Mail, Phone, Edit, Trash2 } from 'lucide-react';
import { fetchCustomers, updateCustomer, deleteCustomer } from '../../services/api';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
}

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const data = await fetchCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Failed to load customers', error);
    }
  };

  const handleUpdateCustomer = async (customer: Customer) => {
    try {
      await updateCustomer(customer);
      loadCustomers(); // Reload to get updated data
    } catch (error) {
      console.error('Failed to update customer', error);
    }
  };

  const handleDeleteCustomer = async (customerId: string) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(customerId);
        loadCustomers(); // Reload to get updated data
      } catch (error) {
        console.error('Failed to delete customer', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Customer Management</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Phone</th>
            <th className="py-2 px-4 text-left">Total Orders</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id} className="border-b">
              <td className="py-2 px-4">{customer.name}</td>
              <td className="py-2 px-4 flex items-center">
                <Mail size={16} className="mr-2" />
                {customer.email}
              </td>
              <td className="py-2 px-4 flex items-center">
                <Phone size={16} className="mr-2" />
                {customer.phone}
              </td>
              <td className="py-2 px-4">{customer.totalOrders}</td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  className="text-blue-500 hover:text-blue-700"
                  onClick={() => handleUpdateCustomer(customer)}
                >
                  <Edit size={18} />
                </button>
                <button
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerManagement;