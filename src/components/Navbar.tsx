"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMicrosoftLoopFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import CartSideBar from "./CartSideBar";
import { FaBagShopping } from "react-icons/fa6";

export default function Navbar() {
  const [cartOpen, setCartOpen] = useState(false);
  const cartItems = useSelector((state: any) => state?.cart.items);

  return (
    <header className="sticky inset-x-0 top-0 z-50 w-full border-b border-neutral-300 bg-white">
      <div className="container flex items-center justify-between py-4 px-2 lg-px-0 mx-auto">
        <div className="flex items-center gap-5 lg:basis-[60%]">
          <RiMicrosoftLoopFill className="text-3xl text-orange-600" />
          <div className="flex space-x-4 text-black">
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
        </div>


        <div className="flex flex-1 items-center justify-end gap-5">
          {/* <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="ml-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
          >
            <FaBagShopping className="text-2xl" />
            <span className="hidden text-sm lg:block">
              {cartItems.length} items
            </span>
          </button> */}
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="ml-5 flex items-center gap-1 rounded-full bg-neutral-100 p-2 text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 relative"
          >
            <FaBagShopping className="text-2xl" />
            <span className="hidden lg:block text-sm">
              {cartItems.length} items
            </span>
            {/* Badge for small screens */}
            <span className="absolute top-0 right-0 lg:hidden flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs">
              {cartItems.length}
            </span>
          </button>
        </div>
      </div>



      <CartSideBar isOpen={cartOpen} setIsOpen={setCartOpen} />
    </header>
  );
}
