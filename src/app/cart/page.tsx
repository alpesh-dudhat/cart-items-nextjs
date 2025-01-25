
"use client"
import { removeFromCart, updateQuantity } from "@/store/cartSlice";
import { RootState } from "@/store/reducer";
import { AiOutlineDelete } from "react-icons/ai";
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
        <div className="mb-5"><h2 className="text-black block text-xl font-medium sm:text-3xl lg:text-4xl">Your Cart</h2></div>
        <hr className="my-5 border-neutral-300 xl:my-12"></hr>
        <div className="space-y-4">
          {cartItems.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              <p>Your cart is empty.</p>
            </div>
          ) : (cartItems.map((item) => (
            <div
              key={item.id}
              className="border hover:shadow-lg transition flex flex-col justify-between  rounded-2xl p-3 shadow-md border-neutral-300"
            >
              <p className="text-md md:text-2xl font-semibold mb-2 text-black">{item.name}</p>

              <div className="flex  space-x-2 items-center justify-between">
                <p className="text-sm md:text-lg text-gray-600">Price: ${item.price}</p>
                <div className="flex items-center ">
                  <button
                    onClick={() => handleQtyChange(item.id, Math.max(1, item.qty - 1))}
                    className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
                  >
                    -
                  </button>
                  <span className="text-lg font-semibold px-2 text-black">{item.qty}</span>
                  <button
                    onClick={() => handleQtyChange(item.id, item.qty + 1)}
                    className="flex h-5 w-5 md:h-6 md:w-6 items-center justify-center rounded-full border border-neutral-500 bg-white text-xl hover:border-neutral-700 focus:outline-none disabled:cursor-default disabled:opacity-50 disabled:hover:border-neutral-400 text-black"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 transition ml-4"
                  >
                    <AiOutlineDelete className="text-2xl" />
                  </button>
                </div>

              </div>
            </div>
          )))}


        </div>
      </div>

      <div className="pt-4 border-0 border-t lg:border-t-0 lg:border-l lg:pl-4">
        <div className="flex-1">
          <div className="sticky top-28">
            <h3 className="text:lg md:text-2xl font-semibold text-black">Summary</h3>
            <div className="mt-7 divide-y divide-neutral-300 text-sm">
              <div className="flex justify-between pb-4 text-gray-800">
                <span>Subtotal</span>
                <span className="font-semibold">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-4 text-gray-800">
                <span>Total Quantity</span>
                <span className="font-semibold">{cartItems.reduce((sum, item) => sum + item.qty, 0)}</span>
              </div>
              <div className="flex justify-between py-4 text-gray-800">
                <span>Estimated taxes</span>
                <span className="font-semibold">Free</span>
              </div>
            </div>

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
