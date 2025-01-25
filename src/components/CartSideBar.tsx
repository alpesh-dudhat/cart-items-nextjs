"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import Link from "next/link";
import CartItem from "./CartItem";
import { CartSideBarProps } from "@/types/interfaces";

export default function CartSideBar({ isOpen, setIsOpen }: CartSideBarProps) {
    const cartItems = useSelector((state: any) => state?.cart.items);
    const dispatch = useDispatch();

    const handleRemove = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleQuantityChange = (id: number, qty: number) => {
        if (qty > 0) {
            dispatch(updateQuantity({ id, qty }));
        }
    };

    const handleClose = () => {
        setIsOpen(false);
        document.documentElement.style.overflow = "";
    };
    const total = cartItems.reduce((sum: number, item: any) => sum + item.qty * item.price, 0)

    React.useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden"; // Prevent scrolling
        } else {
            document.documentElement.style.overflow = ""; // Restore scrolling
        }
        return () => {
            document.documentElement.style.overflow = ""; // Clean up
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed top-0 right-0 z-50 w-80 h-screen bg-white shadow-lg flex flex-col p-4"
                    >
                        <div className="flex justify-between items-center border-b pb-4">
                            <h2 className="text-lg font-bold text-gray-800">My Shopping Cart</h2>
                            <button
                                type="button"
                                onClick={handleClose}
                                className="text-gray-600 hover:text-gray-800"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto mt-3" style={{ marginBottom: "calc(100% - 55%)" }}>
                            {cartItems.length === 0 ? (
                                <p className="text-gray-500">Your cart is empty</p>
                            ) : (
                                <div>
                                    {cartItems.map((item:any) => (
                                        <CartItem
                                            key={item.id}
                                            item={item}
                                            onQuantityChange={handleQuantityChange}
                                            onRemove={handleRemove}
                                        />
                                    ))}
                                   
                                </div>
                            )}
                        </div>

                        <div className="absolute bottom-0 left-0 w-full bg-neutral-50 p-5">
                            <p className="flex justify-between text-black">
                                <span>
                                    <span className="font-medium">Subtotal</span>

                                </span>
                                <span className="text-xl font-medium">${total.toFixed(2)}</span>
                            </p>
                            <div className="mt-5 flex items-center gap-5">
                                <Link
                                    href="/"
                                    onClick={handleClose}
                                    className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-2 px-4 sm:py-3.5 sm:px-6 bg-orange-600 text-white hover:bg-primary/80 disabled:bg-opacity-70 w-full flex-1"
                                >
                                    Checkout
                                </Link>
                                <Link
                                    onClick={handleClose}
                                    href="/cart"
                                    className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-2 px-4 sm:py-3.5 sm:px-6  w-full flex-1 border-2 border-orange-600 text-orange-600"
                                >
                                    View cart
                                </Link>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black z-40"
                    ></motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
