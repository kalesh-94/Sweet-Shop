import { useState, useEffect } from 'react';
import { sweetsAPI } from '../api/sweets';
import SweetCard from '../components/SweetCard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';

const Dashboard = () => {
  const [sweets, setSweets] = useState([]);
  const [filteredSweets, setFilteredSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  useEffect(() => {
    fetchSweets();
  }, []);

  useEffect(() => {
    filterAndSortSweets();
  }, [sweets, searchTerm, selectedCategory, sortBy]);

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

  const filterAndSortSweets = () => {
    let filtered = [...sweets];

    if (searchTerm) {
      filtered = filtered.filter(sweet =>
        sweet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sweet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(sweet => sweet.category === selectedCategory);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'quantity':
          return b.quantity - a.quantity;
        default:
          return 0;
      }
    });

    setFilteredSweets(filtered);
  };

  const handlePurchase = async (id, quantity) => {
    try {
      await sweetsAPI.purchaseSweet(id, quantity);
      fetchSweets();
    } catch (error) {
      console.error('Error purchasing sweet:', error);
      alert('Purchase feature requires backend connection');
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sweet Shop Dashboard
          </h1>
          <p className="text-gray-600">Browse and purchase your favorite sweets</p>
        </div>

        <div className="mb-6 space-y-4">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <FilterBar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>

        {filteredSweets.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No sweets found matching your criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                sweet={sweet}
                onPurchase={handlePurchase}
              />
            ))}
          </div>
        )}
      </div>
    </div>
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
    image: 'https://images.pexels.com/photos/2638026/pexels-photo-2638026.jpeg?auto=compress&cs=tinysrgb&w=400',
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
  {
    id: 3,
    name: 'Mint Candy Canes',
    description: 'Classic peppermint candy canes',
    price: 1.99,
    quantity: 0,
    category: 'candy',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 4,
    name: 'Caramel Bonbons',
    description: 'Sweet caramel-filled bonbons',
    price: 3.99,
    quantity: 30,
    category: 'chocolate',
    image: 'https://images.pexels.com/photos/3631/summer-dessert-sweet-ice-cream.jpg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 5,
    name: 'Fruit Lollipops',
    description: 'Assorted fruit-flavored lollipops',
    price: 1.49,
    quantity: 75,
    category: 'candy',
    image: 'https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 6,
    name: 'Sour Worms',
    description: 'Tangy sour gummy worms',
    price: 2.49,
    quantity: 5,
    category: 'gummy',
    image: 'https://images.pexels.com/photos/3821385/pexels-photo-3821385.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 7,
    name: 'Milk Chocolate Bar',
    description: 'Smooth and creamy milk chocolate',
    price: 2.99,
    quantity: 60,
    category: 'chocolate',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: 8,
    name: 'Rainbow Hard Candy',
    description: 'Colorful assorted hard candies',
    price: 1.99,
    quantity: 40,
    category: 'candy',
    image: 'https://images.pexels.com/photos/3825517/pexels-photo-3825517.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export default Dashboard;
