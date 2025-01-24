
"use client"
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/reducer";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();


  const handleQtyChange = (id: number, qty: number) => {
    dispatch(updateQuantity({ id, qty }));
  };

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.qty * item.price, 0);


  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li
              key={item.id}
              className="p-4 border rounded shadow hover:shadow-lg transition flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold mb-2">{item.name}</p>
                <p className="text-gray-400">Price: ${item.price}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQtyChange(item.id, Math.max(1, item.qty - 1))}
                  className="px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  -
                </button>
                <span className="text-lg font-semibold px-2">{item.qty}</span>
                <button
                  onClick={() => handleQtyChange(item.id, item.qty + 1)}
                  className="px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  +
                </button>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-red-500 hover:text-red-700 transition ml-4"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="flex justify-between mb-4">
          <p className="text-gray-500">Total Items:</p>
          <p className="font-semibold">{cartItems.reduce((sum, item) => sum + item.qty, 0)}</p>
        </div>
        <div className="flex justify-between mb-4">
          <p className="text-gray-500">Total Price:</p>
          <p className="font-semibold">${total.toFixed(2)}</p>
        </div>
        <button
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
