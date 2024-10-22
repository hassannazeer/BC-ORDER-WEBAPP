import axios from 'axios';

const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Authentication
export const login = async (email: string, password: string) => {
  // Demo login logic
  if (email === 'customer@example.com' && password === 'customerpass') {
    return {
      id: 'cust1',
      name: 'Demo Customer',
      email: 'customer@example.com',
      role: 'customer'
    };
  } else if (email === 'staff@example.com' && password === 'staffpass') {
    return {
      id: 'staff1',
      name: 'Demo Staff',
      email: 'staff@example.com',
      role: 'staff'
    };
  }
  throw new Error('Invalid credentials');
};

// Customer-facing API calls
export const fetchProducts = async () => {
  // Demo product data
  return [
    { id: '1', name: 'Product 1', price: 19.99, inventory: 100 },
    { id: '2', name: 'Product 2', price: 29.99, inventory: 50 },
    { id: '3', name: 'Product 3', price: 39.99, inventory: 75 },
  ];
};

export const addToCart = async (productId: string) => {
  // Demo add to cart
  console.log(`Added product ${productId} to cart`);
  return { success: true };
};

export const fetchCart = async () => {
  // Demo cart data
  return [
    { id: '1', productId: '1', name: 'Product 1', price: 19.99, quantity: 2 },
    { id: '2', productId: '2', name: 'Product 2', price: 29.99, quantity: 1 },
  ];
};

export const removeFromCart = async (itemId: string) => {
  // Demo remove from cart
  console.log(`Removed item ${itemId} from cart`);
  return { success: true };
};

export const checkout = async () => {
  // Demo checkout
  console.log('Checkout completed');
  return { success: true, orderId: 'ORD123' };
};

export const fetchOrderHistory = async () => {
  // Demo order history
  return [
    {
      id: 'ORD123',
      date: '2023-04-01',
      status: 'Delivered',
      total: 69.97,
      items: [
        { name: 'Product 1', quantity: 2, price: 19.99 },
        { name: 'Product 2', quantity: 1, price: 29.99 },
      ],
    },
    {
      id: 'ORD124',
      date: '2023-04-15',
      status: 'Processing',
      total: 39.99,
      items: [
        { name: 'Product 3', quantity: 1, price: 39.99 },
      ],
    },
  ];
};

// Staff-facing API calls
export const fetchInventory = async () => {
  // Demo inventory data
  return [
    { id: '1', name: 'Product 1', sku: 'SKU001', quantity: 100, price: 19.99 },
    { id: '2', name: 'Product 2', sku: 'SKU002', quantity: 50, price: 29.99 },
    { id: '3', name: 'Product 3', sku: 'SKU003', quantity: 75, price: 39.99 },
  ];
};

export const updateInventory = async (item: any) => {
  // Demo update inventory
  console.log(`Updated inventory item: ${JSON.stringify(item)}`);
  return { success: true };
};

export const syncWithBusinessCentral = async () => {
  // Demo sync with Business Central
  console.log('Synced with Business Central');
  return { success: true };
};

export const fetchOrders = async () => {
  // Demo orders data
  return [
    { id: 'ORD123', customerName: 'John Doe', date: '2023-04-01', status: 'Delivered', total: 69.97 },
    { id: 'ORD124', customerName: 'Jane Smith', date: '2023-04-15', status: 'Processing', total: 39.99 },
  ];
};

export const updateOrderStatus = async (orderId: string, status: string) => {
  // Demo update order status
  console.log(`Updated order ${orderId} status to ${status}`);
  return { success: true };
};

export const fetchCustomers = async () => {
  // Demo customers data
  return [
    { id: 'CUST1', name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', totalOrders: 5 },
    { id: 'CUST2', name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321', totalOrders: 3 },
  ];
};

export const updateCustomer = async (customer: any) => {
  // Demo update customer
  console.log(`Updated customer: ${JSON.stringify(customer)}`);
  return { success: true };
};

export const deleteCustomer = async (customerId: string) => {
  // Demo delete customer
  console.log(`Deleted customer ${customerId}`);
  return { success: true };
};

export const fetchSalesReport = async () => {
  // Demo sales report data
  return [
    { date: '2023-04-01', sales: 1000 },
    { date: '2023-04-02', sales: 1200 },
    { date: '2023-04-03', sales: 800 },
    { date: '2023-04-04', sales: 1500 },
    { date: '2023-04-05', sales: 2000 },
  ];
};

export default api;