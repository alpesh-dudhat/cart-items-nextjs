"use client";
import { useState } from "react";
import Link from "next/link";
import { RiMicrosoftLoopFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import CartSideBar from "./CartSideBar";
import CartButton from "./CartButton";

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
        <CartButton onClick={() => setCartOpen(true)} cartCount={cartItems.length} />;
        </div>
      </div>
      <CartSideBar isOpen={cartOpen} setIsOpen={setCartOpen} />
    </header>
  );
}
