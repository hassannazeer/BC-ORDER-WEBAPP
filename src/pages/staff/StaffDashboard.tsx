import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Boxes, ClipboardList, Users, BarChart } from 'lucide-react';
import InventoryManagement from './InventoryManagement';
import OrderManagement from './OrderManagement';
import CustomerManagement from './CustomerManagement';
import Reports from './Reports';

const StaffDashboard: React.FC = () => {
  return (
    <div className="flex flex-col space-y-6">
      <h1 className="text-3xl font-bold">Staff Dashboard</h1>
      <nav className="flex space-x-4">
        <Link to="/staff" className="flex items-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          <Boxes className="mr-2" />
          Inventory
        </Link>
        <Link to="/staff/orders" className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          <ClipboardList className="mr-2" />
          Orders
        </Link>
        <Link to="/staff/customers" className="flex items-center px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
          <Users className="mr-2" />
          Customers
        </Link>
        <Link to="/staff/reports" className="flex items-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
          <BarChart className="mr-2" />
          Reports
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<InventoryManagement />} />
        <Route path="/orders" element={<OrderManagement />} />
        <Route path="/customers" element={<CustomerManagement />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
};

export default StaffDashboard;