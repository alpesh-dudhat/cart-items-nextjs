"use client"
import { removeFromCart } from "@/store/cartSlice";
import Link from "next/link";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: any) => state?.cart.items);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();


  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-400">
            Home
          </Link>
          <Link href="/items" className="hover:text-gray-400">
            Items
          </Link>
          <Link href="/cart" className="hover:text-gray-400">
            Cart
          </Link>
        </div>

        <div className="relative">
          <Link href="/cart">
            <div
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
              className="relative focus:outline-none"
            >
              <FiShoppingCart className="w-6 h-6" />

              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-2" suppressHydrationWarning={true}>
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          {/* Dropdown  */}
          {cartOpen && typeof window !== "undefined" && (
            <div
              onMouseEnter={() => setCartOpen(true)}
              onMouseLeave={() => setCartOpen(false)}
              className="absolute right-0 -mt-2 w-64 bg-white text-black rounded shadow-lg"
            >
              <div className="p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Your cart is empty</p>
                ) : (
                  <ul>
                    {cartItems.map((item: any) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center mb-2 border-b pb-2"
                      >
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.qty}</p>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-700 text-sm"
                          onClick={() => handleRemove(item.id)}
                        >
                          Delete
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
