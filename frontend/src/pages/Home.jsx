import { Link } from "react-router-dom";
import {
  FaCandyCane,
  FaShoppingCart,
  FaChartLine,
  FaUsers,
  FaStar,
  FaLeaf,
} from "react-icons/fa";
import { GiChocolateBar, GiCupcake } from "react-icons/gi";

const Home = () => {
  const features = [
    {
      icon: <FaShoppingCart className="text-3xl" />,
      title: "Easy Shopping",
      description: "Browse and purchase sweets with just a few clicks",
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: <FaChartLine className="text-3xl" />,
      title: "Real-time Inventory",
      description: "Track stock levels and get notified when items are low",
      color: "from-purple-500 to-indigo-500",
    },
    {
      icon: <GiChocolateBar className="text-3xl" />,
      title: "Premium Quality",
      description: "Only the finest ingredients in our delicious sweets",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <FaUsers className="text-3xl" />,
      title: "Admin Control",
      description: "Comprehensive management tools for shop owners",
      color: "from-emerald-500 to-teal-500",
    },
  ];

  const popularSweets = [
    {
      name: "Laddu",
      price: `₹30`,
      image:
        "https://www.murarisweets.com/cdn/shop/files/MotichoorLaddu4.png?v=1709528857",
      category: "Mithai(Sweets)",
    },
    {
      name: "Rainbow Lollipop",
      price: "₹41",
      image:
        "https://i.etsystatic.com/15676527/r/il/f14ec4/5083067288/il_fullxfull.5083067288_qrs2.jpg",
      category: "Candy",
    },
    {
      name: "Vanilla Cupcake",
      price: "₹45",
      image:
        "https://images.pexels.com/photos/1055270/pexels-photo-1055270.jpeg",
      category: "Pastry",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src="https://t3.ftcdn.net/jpg/08/55/67/26/360_F_855672614_mZg0kZI3HEw8Ozlba3xbPEN8M6c9UNyo.jpg"
          alt="Sweet Shop Background"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute top-10 left-10 z-20 opacity-40 animate-bounce">
          <GiCupcake className="text-5xl text-white" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-24 md:py-32 text-white">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Welcome to Sweet Shop
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Your one-stop destination for managing and enjoying the finest
              sweets
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-semibold hover:scale-105 transition"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="bg-white/20 backdrop-blur-sm px-8 py-3 rounded-full text-lg font-semibold border border-white hover:bg-white/30 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-sweet">
              Why Choose Sweet ?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the perfect blend of delicious sweets and modern
              management tools
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="card p-6 text-center group hover:shadow-2xl transition-all duration-300"
              >
                <div
                  className={`inline-flex p-4 rounded-full bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Sweets Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4 font-sweet">
              Popular Sweets
            </h2>
            <p className="text-gray-600 text-lg">
              A taste of what you can manage and enjoy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {popularSweets.map((sweet, index) => (
              <div
                key={index}
                className="card overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={sweet.image}
                    alt={sweet.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1 rounded-full text-sm font-semibold">
                      {sweet.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {sweet.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink-600">
                      {sweet.price}
                    </span>
                    <div className="flex text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar className="text-gray-300" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">500+</div>
              <div className="text-gray-600">Sweet Varieties</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">
                10K+
              </div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">50+</div>
              <div className="text-gray-600">Shop Partners</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-2xl text-pink-600 font-bold">🍬</span>
                </div>
                <span className="text-2xl font-sweet font-bold">
                  Sweet Shop
                </span>
              </div>
              <p className="text-gray-400">
                The ultimate sweet shop management solution
              </p>
            </div>
            <div className="flex space-x-6">
              <Link
                to="/login"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Register
              </Link>
              <Link
                to="/dashboard"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Dashboard
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              © {new Date().getFullYear()} Sweet Management System. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
