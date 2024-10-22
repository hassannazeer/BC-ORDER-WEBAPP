import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { fetchSalesReport } from '../../services/api';

interface SalesData {
  date: string;
  sales: number;
}

const Reports: React.FC = () => {
  const [salesData, setSalesData] = useState<SalesData[]>([]);

  useEffect(() => {
    loadSalesReport();
  }, []);

  const loadSalesReport = async () => {
    try {
      const data = await fetchSalesReport();
      setSalesData(data);
    } catch (error) {
      console.error('Failed to load sales report', error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sales Report</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;