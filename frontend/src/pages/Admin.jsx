import { useState, useEffect } from 'react';
import { sweetsAPI } from '../api/sweets';
import AdminSweetCard from '../components/AdminSweetCard';
import SweetModal from '../components/SweetModal';
import Navbar from '../components/Navbar';

const Admin = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

  useEffect(() => {
    fetchSweets();
  }, []);

  const fetchSweets = async () => {
    try {
      const data = await sweetsAPI.getAllSweets();
      setSweets(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching sweets:', error);
      setSweets(getMockSweets());
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingSweet(null);
    setIsModalOpen(true);
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) return;

    try {
      await sweetsAPI.deleteSweet(id);
      fetchSweets();
    } catch (error) {
      console.error('Error deleting sweet:', error);
      alert('Delete feature requires backend connection');
    }
  };

  const handleRestock = async (id, quantity) => {
    try {
      await sweetsAPI.restockSweet(id, quantity);
      fetchSweets();
    } catch (error) {
      console.error('Error restocking sweet:', error);
      alert('Restock feature requires backend connection');
    }
  };

  const handleSave = async (sweetData) => {
    try {
      if (editingSweet) {
        console.log(true);
        
        await sweetsAPI.updateSweet(editingSweet.id, sweetData);
      } else {
        await sweetsAPI.createSweet(sweetData);
      }
      console.log(editingSweet);
      
      setIsModalOpen(false);
      fetchSweets();
    } catch (error) {
      console.error('Error saving sweet:', error);
      alert('Save feature requires backend connection');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Admin Panel
            </h1>
            <p className="text-gray-600">Manage your sweet inventory</p>
          </div>
          <button onClick={handleAdd} className="btn-primary">
            Add New Sweet
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sweets.map((sweet) => (
            <AdminSweetCard
              key={sweet.id}
              sweet={sweet}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onRestock={handleRestock}
            />
          ))}
        </div>

        {sweets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg mb-4">No sweets in inventory</p>
            <button onClick={handleAdd} className="btn-primary">
              Add Your First Sweet
            </button>
          </div>
        )}
      </div>

      {isModalOpen && (
        <SweetModal
          sweet={editingSweet}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
    </>
  );
};

const getMockSweets = () => [
  {
    id: 1,
    name: 'Chocolate Truffle',
    description: 'Rich dark chocolate truffle with a creamy center',
    price: 4.99,
    quantity: 50,
    category: 'chocolate',
    imgurl: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 2,
    name: 'Strawberry Gummy Bears',
    description: 'Delicious strawberry-flavored gummy bears',
    price: 2.99,
    quantity: 100,
    category: 'gummy',
    imgurl: 'https://images.pexels.com/photos/3738388/pexels-photo-3738388.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default Admin;
