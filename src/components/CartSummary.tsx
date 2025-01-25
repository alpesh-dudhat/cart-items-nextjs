import { CartSummaryProps } from "@/types/interfaces";
import React from "react";


const CartSummary: React.FC<CartSummaryProps> = ({ total, totalQty }) => {
  return (
    <div className="divide-y divide-neutral-300 text-sm">
      <div className="flex justify-between pb-4 text-gray-800">
        <span>Subtotal</span>
        <span className="font-semibold">${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between py-4 text-gray-800">
        <span>Total Quantity</span>
        <span className="font-semibold">{totalQty}</span>
      </div>
      <div className="flex justify-between py-4 text-gray-800">
        <span>Estimated taxes</span>
        <span className="font-semibold">Free</span>
      </div>
    </div>
  );
};

export default CartSummary;
