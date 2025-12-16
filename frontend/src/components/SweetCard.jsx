import { useState } from 'react';
import { formatCurrency, getStockStatus } from '../utils/helpers';

const SweetCard = ({ sweet, onPurchase }) => {
  const [quantity, setQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);

  const stockStatus = getStockStatus(sweet.quantity);
  const maxQuantity = Math.min(sweet.quantity, 10);

  const handlePurchase = async () => {
    if (quantity > 0 && quantity <= sweet.quantity) {
      setIsPurchasing(true);
      await onPurchase(sweet.id, quantity);
      setIsPurchasing(false);
      setQuantity(1);
    }
  };

  return (
    <div className="card overflow-hidden flex flex-col h-full">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={sweet.imgurl || '/placeholder.png'}
          alt={sweet.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = '/placeholder.png';
          }}
        />
        <div
          className={`absolute top-2 right-2 px-3 py-1 rounded-full text-xs font-medium ${
            stockStatus.color === 'green'
              ? 'bg-green-100 text-green-800'
              : stockStatus.color === 'yellow'
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {stockStatus.label}
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{sweet.name}</h3>
        <p className="text-sm text-gray-600 mb-3 flex-grow">
          {sweet.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-pink-600">
            {formatCurrency(sweet.price)}
          </span>
          <span className="text-sm text-gray-500">
            Stock: {sweet.quantity}
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={sweet.quantity === 0}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(
                  Math.max(
                    1,
                    Math.min(maxQuantity, parseInt(e.target.value) || 1)
                  )
                )
              }
              className="w-16 text-center border-x border-gray-300 py-2 focus:outline-none"
              min="1"
              max={maxQuantity}
              disabled={sweet.quantity === 0}
            />
            <button
              onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
              disabled={sweet.quantity === 0}
              className="px-3 py-2 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              +
            </button>
          </div>
          <button
            onClick={handlePurchase}
            disabled={sweet.quantity === 0 || isPurchasing}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPurchasing ? 'Buying...' : 'Purchase'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SweetCard;
