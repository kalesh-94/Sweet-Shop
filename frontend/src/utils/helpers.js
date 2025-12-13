export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const getStockStatus = (quantity) => {
  if (quantity === 0) return { label: 'Out of Stock', color: 'red' };
  if (quantity < 10) return { label: 'Low Stock', color: 'yellow' };
  return { label: 'In Stock', color: 'green' };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
