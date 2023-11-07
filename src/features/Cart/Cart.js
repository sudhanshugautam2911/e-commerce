import React, { useState, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, Navigate } from "react-router-dom";
import { deleteCartItemAsync, selectItems, updateCartAsync } from "./cartSlice";
import { discountPrice } from "../../app/constants";

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.",
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.",
  },
  // More products...
];

// My latest code
export default function Cart() {
  const [open, setOpen] = useState(true);
  const disptach = useDispatch();
  const items = useSelector(selectItems);

  // calculate using reducer - new to me
  const totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce(
    (total, item) => item.quantity + total,
     0
  );
  console.log("total items ", totalItems);

  const handleQuantity = (e, item) => {
    // + mark used because value string mei ayega so usko integer mei convert kr rhe hai
    disptach(updateCartAsync({ id:item.id, quantity: +e.target.value }));
  };
  const handleDelete = (e, id) => {
    disptach(deleteCartItemAsync(id));
  };

  return (
    <>
      {!items.length && <Navigate to="/" replace={true}></Navigate>}

      {/* max-w-7xl , bg-white */}
      <div className="mx-auto bg-white py-2 px-4 sm:px-6 lg:px-8 max-w-screen-md">
        <h1 className="text-4xl my-10 flex justify-center font-bold  text-gray-900">
          Shopping Cart
        </h1>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6 ">
          <div className="flow-root ">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
              {items.map((item) => (
                <li key={item.id} className="flex py-6">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img 
                      src={item.product.thumbnail}
                      alt={item.product.title}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                          <a href={item.product.id}>{item.product.title}</a>
                        </h3>
                        <p className="ml-4">${discountPrice(item.product)}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.product.brand}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="text-gray-500">
                        <label
                          htmlFor="Quantity"
                          className="inline leading-6 mr-1 text-gray-500"
                        >
                          Qty
                          {/* {item.quantity} */}
                        </label>

                        <select
                          onChange={(e) => handleQuantity(e, item)}
                          value={item.quantity}
                        >
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>

                      <div className="flex">
                        <button
                          onClick={(e) => handleDelete(e, item.id)}
                          type="button"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Total Items in cart</p>
            <p>{totalItems} items</p>
          </div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalAmount}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Link
              to="/checkout"
              className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </Link>
          </div>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={() => setOpen(false)}
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
