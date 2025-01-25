import { CartItemProps } from "@/types/interfaces";
import React from "react";
import { AiOutlineDelete } from "react-icons/ai";

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  return (
    <div className="border hover:shadow-lg transition flex flex-col justify-between rounded-2xl p-3 shadow-md border-neutral-300 mb-3">
      <p className="text-sm md:text-md font-semibold mb-2 text-black">{item.name}</p>

      <div className="flex space-x-2 items-center justify-between">
        <p className="text-sm md:text-md text-gray-600">Price: ${item.price}</p>
        <div className="flex items-center">
          <button
            onClick={() => onQuantityChange(item.id, Math.max(1, item.qty - 1))}
            className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
          >
            -
          </button>
          <span className="text-lg font-semibold px-2 text-black">{item.qty}</span>
          <button
            onClick={() => onQuantityChange(item.id, item.qty + 1)}
            className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
          >
            +
          </button>
          <button
            onClick={() => onRemove(item.id)}
            className="text-red-500 hover:text-red-700 transition ml-4"
          >
            <AiOutlineDelete className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
