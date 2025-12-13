import { useState } from "react";
import { formatCurrency, getStockStatus } from "../utils/helpers";

const AdminSweetCard = ({ sweet, onEdit, onDelete, onRestock }) => {
  const [restockAmount, setRestockAmount] = useState(10);
  const [isRestocking, setIsRestocking] = useState(false);

  const stockStatus = getStockStatus(sweet.quantity);

  const handleRestock = async () => {
    if (restockAmount > 0) {
      setIsRestocking(true);
      await onRestock(sweet.id, restockAmount);
      setIsRestocking(false);
      setRestockAmount(10);
    }
  };

  return (
    <div className="card overflow-hidden flex flex-col h-full">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        <img
          src={sweet.imgurl}
          alt={sweet.name}
          className="w-full h-full object-cover"
        />
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${
            stockStatus.color === "green"
              ? "bg-green-100 text-green-800"
              : stockStatus.color === "yellow"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {stockStatus.label}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {sweet.name}
        </h3>

        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
          {sweet.description}
        </p>

        {/* Meta Info */}
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price</span>
            <span className="text-lg font-semibold text-pink-600">
              {formatCurrency(sweet.price)}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Stock</span>
            <span className="text-sm font-medium">{sweet.quantity} units</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Category</span>
            <span className="text-sm font-medium capitalize">
              {sweet.category}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t pt-5 space-y-4">
          {/* Restock */}
          <div className="flex gap-3">
            <input
              type="number"
              value={restockAmount}
              onChange={(e) =>
                setRestockAmount(Math.max(1, parseInt(e.target.value) || 1))
              }
              min="1"
              className="flex-1 min-w-[90px] h-10 px-3 border border-gray-300 rounded-lg"
            />

            <button
              onClick={handleRestock}
              disabled={isRestocking}
              className="h-10 px-6 shrink-0 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isRestocking ? "..." : "Restock"}
            </button>
          </div>

          {/* Edit / Delete */}
          <div className="flex gap-3">
            <button
              onClick={() => onEdit(sweet)}
              className="flex-1 h-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(sweet.id)}
              className="flex-1 h-10 btn-danger"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSweetCard;
