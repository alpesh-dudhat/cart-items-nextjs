// src/components/CartButton.tsx
import React from "react";
import { FaBagShopping } from "react-icons/fa6";

interface CartButtonProps {
  onClick: () => void;
  cartCount: number;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick, cartCount }) => (
  <button
    type="button"
    onClick={onClick}
    className="ml-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
  >
    <FaBagShopping className="text-2xl" />
    <span className="hidden lg:block text-sm">{cartCount} items</span>
    <span className="absolute top-0 right-0 lg:hidden flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
      {cartCount}
    </span>
  </button>
);

export default CartButton;
