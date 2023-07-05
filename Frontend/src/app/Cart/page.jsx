"use client";

import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import BackEndUrl from "@/utils/BacnkendUrl";

const Cart = () => {
  const date = new Date();
  date.setDate(date.getDate() + 6);
  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const [CartItems, setCartItems] = useState(null);
  const [Total, setTotal] = useState(0);
  const [SubTotal, setSubTotal] = useState(0);

  useEffect(() => {
    const LocalCartItems = localStorage.getItem("CartItems")
      ? JSON.parse(localStorage.getItem("CartItems"))
      : [];
    setCartItems(LocalCartItems);
    const subTotal = LocalCartItems.reduce((acc, item) => acc + item.price, 0);
    setSubTotal(subTotal);
    const total = subTotal + 20;
    setTotal(total);
  }, []);

  const handleRemoveItem = (id) => {
    console.log(id);
    const newCartItems = CartItems.filter((item) => item.id !== id);
    localStorage.setItem("CartItems", JSON.stringify(newCartItems));
    setCartItems(newCartItems);
    toast.error("Item removed from bag");
  };

  const handleCheckout = async () => {
    console.log("checkout");

    const items = CartItems.map((item) => {
      return { productId: item.id, quantity: 1 };
    });

    try {
      const { data } = await axios.post(
        `${BackEndUrl}/api/payment/create-checkout-session`,
        { products: items }
      );
      console.log(data);
      window.location.replace(data.url);
    } catch (error) {
      console.log(error);
    }
  };

  if (!CartItems) {
    return <h1>Laoding</h1>;
  }

  if (CartItems.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-2xl">Your Bag is Empty</h1>
      </div>
    );
  }

  return (
    <>
      <div className=" md:m-20 m-10 grid grid-cols-1  md:grid-cols-12 gap-10 ">
        <div className="md:col-span-8 col-span-1 ">
          <h1 className="text-2xl">Bag</h1>
          {CartItems.map((item) => (
            <div key={item.id} className="flex justify-between flex-row">
              <div className="mt-5 flex md:gap-10 gap-5 ">
                <img
                  className="object-cover md:w-48 md:h-48 w-24 h-24 "
                  src={item.url}
                />
                <div className="flex flex-col gap-2">
                  <h1 className="font-bold text-xl">{item.name}</h1>
                  <h1>White</h1>
                  <h1>Size: 9</h1>
                  <h1>Quantity: 1</h1>
                  <div className="flex mt-4 gap-5">
                    <div className="hover:bg-slate-500 p-1 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                        />
                      </svg>
                    </div>
                    <div
                      onClick={() => {
                        handleRemoveItem(item.id);
                      }}
                      className="hover:bg-slate-500 p-1 rounded-full"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-5">${item.price}</div>
            </div>
          ))}
        </div>
        <div className="md:col-span-4 col-span-1">
          <div className="flex flex-col gap-3 text-black w-full">
            <h1 className="mb-5 text-2xl">Summary</h1>
            <div className="flex justify-between w-full">
              <h2>SubTotal </h2>
              <h2>${SubTotal}</h2>
            </div>
            <div className="flex justify-between">
              <h2>Estimated Shipping </h2>
              <h2>${20}</h2>
            </div>
            <div className="border-y flex justify-between border-gray-300 py-5">
              <h1>Total </h1>
              <h1>${Total}</h1>
            </div>
          </div>
        </div>
        <div className="col mb-16 md:mb-0 md:col-span-8 col-span-1 ">
          <div className="">Shipping</div>
          <div className="">Arrives by {formattedDate}</div>
        </div>
        <div className=" fixed bottom-0 z-10 left-1/2  -translate-x-1/2 w-full md:translate-x-0  md:static md:w-auto md:col-span-4">
          <button
            onClick={handleCheckout}
            className="bg-black px-8 py-5 w-full  text-white rounded-full font-bold hover:bg-gray-600"
          >
            Proceed To Checkout
          </button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Cart;
