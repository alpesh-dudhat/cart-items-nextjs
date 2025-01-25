"use client";

import { useNotification } from "@/notifications/NotificationContext";
import { addToCart } from "@/store/cartSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function ItemsPage() {

    const { showNotification } = useNotification();
    const [items, setItems] = useState<{ id: number; name: string; price: number; qty: number; }[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch("https://dummyjson.com/products?limit=5");
                const data = await response.json();
                // Extract only id, title, and price
                const formattedItems = data.products.map((product: { id: number; title: string; price: number; }) => ({
                    id: product.id,
                    name: product.title,
                    price: product.price,
                    qty: 1,
                }));
                setItems(formattedItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);

    const handleQtyChange = (id: number, increment: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? { ...item, qty: Math.max(1, item.qty + increment) }
                    : item
            )
        );
    };

    const handleAddToCart = (item: any) => {
        dispatch(addToCart(item));
        // showNotification("Item added to cart!", "success");
    };

    return (
        <div className="p-2 md:p-0">
            <h1 className="text-lg md:text-2xl font-bold mb-3 md:mb-6 text-black">Product List</h1>
            {items.length === 0 ? (
                <p>Loading items...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="border hover:shadow-lg transition flex flex-col justify-between  rounded-2xl p-3 shadow-md border-neutral-300"
                        >
                            <h2 className="text-sm md:text-lg font-semibold mb-2 text-black">{item.name}</h2>
                            <p className="text-gray-600 mb-0 md:mb-3 text-sm md:text-lg">Price: ${item.price}</p>

                            <div className="flex justify-between items-center ">
                                <div className="flex items-center ">
                                    <button
                                        onClick={() => handleQtyChange(item.id, -1)}
                                        className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
                                    >
                                        -
                                    </button>
                                    <span className="text-md md:text-lg font-semibold px-2 text-black">{item.qty}</span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, 1)}
                                        className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
                                    >
                                        +
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className="bg-orange-500 text-white text-sm md:text-md p-2 md:px-4 md:py-2 rounded-full hover:bg-orange-600 transition"
                                >
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    ))}
                </div>

            )}
        </div>
    );
}
