import axios from './axios';

export const sweetsAPI = {
  // ✅ GET ALL SWEETS
  getAllSweets: async () => {
    const response = await axios.get('/sweets/');
    return response.data.map((sweet) => ({
      ...sweet,
      id: sweet._id, // normalize MongoDB _id
    }));
  },

  // ✅ GET SWEET BY ID
  getSweetById: async (id) => {
    const response = await axios.get(`/sweets/${id}`);
    return response.data;
  },

  // ✅ CREATE SWEET (ADMIN ONLY)
  createSweet: async (sweetData) => {
    const payload = {
      name: sweetData.name,
      description: sweetData.description,
      category: sweetData.category,
      price: sweetData.price,
      quantity: sweetData.quantity,
      imgurl: sweetData.imgurl,
    };

    const response = await axios.post('/sweets/', payload);
    return response.data;
  },

  // ✅ UPDATE SWEET (ADMIN ONLY)
  updateSweet: async (id, sweetData) => {
    const payload = {
      name: sweetData.name,
      description: sweetData.description,
      category: sweetData.category,
      price: sweetData.price,
      quantity: sweetData.quantity,
      imgurl: sweetData.imgurl || '',
    };

    const response = await axios.put(`/sweets/${id}`, payload);
    return response.data;
  },

  // ✅ DELETE SWEET (ADMIN ONLY)
  deleteSweet: async (id) => {
    const response = await axios.delete(`/sweets/${id}`);
    return response.data;
  },

  // ✅ RESTOCK SWEET (QUERY PARAM, ADMIN ONLY)
  restockSweet: async (id, quantity) => {
    const response = await axios.post(
      `/sweets/${id}/restock?quantity=${quantity}`
    );
    return response.data;
  },

  // ✅ PURCHASE SWEET (QUERY PARAM)
  purchaseSweet: async (id, quantity) => {
    const response = await axios.post(
      `/sweets/${id}/purchase?quantity=${quantity}`
    );
    return response.data;
  },
};
