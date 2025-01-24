"use client";

import { addToCart } from "@/store/cartSlice";
import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';

export default function ItemsPage() {


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
    
    const handleAddToCart = (item:any) => {
        dispatch(addToCart(item));
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6">Item List</h1>
            {items.length === 0 ? (
                <p>Loading items...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 border rounded shadow hover:shadow-lg transition flex flex-col justify-between"
                        >
                            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-gray-400">Price: ${item.price}</p>
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => handleQtyChange(item.id, -1)}
                                        className=" px-2 py-1 rounded hover:bg-gray-700 transition"
                                    >
                                        -
                                    </button>
                                    <span className="text-lg font-semibold px-2">{item.qty}</span>
                                    <button
                                        onClick={() => handleQtyChange(item.id, 1)}
                                        className=" px-2 py-1 rounded hover:bg-gray-700 transition"
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <button
                                onClick={() => handleAddToCart(item)}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
          
            )}
        </div>
    );
}
