
"use client"
import CartItem from "@/components/CartItem";
import CartSummary from "@/components/CartSummary";
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CartItems } from "@/types/interfaces";

export default function CartPage() {
  const cartItems: CartItems[] = useSelector((state: RootState) => state.cart.items);
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
        <h2 className="text-black block text-xl font-medium sm:text-3xl lg:text-4xl">Your Cart</h2>
        <hr className="my-5 border-neutral-300 xl:my-12"></hr>
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>Your cart is empty.</p>
            </div>
          ) : (cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onQuantityChange={handleQtyChange}
              onRemove={handleRemove}
            />
          )))}


        </div>
      </div>

      <div className="pt-4 border-0 border-t lg:border-t-0 lg:border-l lg:pl-4">
        <div className="flex-1">
          <div className="sticky top-28">
            <h3 className="text:lg md:text-2xl font-semibold text-black mb-5">Summary</h3>
            <CartSummary
              total={cartItems.reduce((sum, item) => sum + item.qty * item.price, 0)}
              totalQty={cartItems.reduce((sum, item) => sum + item.qty, 0)}
            />
          </div>
        </div>


        <button
          className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
