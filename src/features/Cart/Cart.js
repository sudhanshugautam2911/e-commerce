import React, { useState, Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCartItemAsync,
  selectCartLoaded,
  selectCartStatus,
  selectItems,
  updateCartAsync,
} from "./cartSlice";
import { discountPrice } from "../../app/constants";
import HashLoader from "react-spinners/HashLoader";
import Modal from "../common/Modal";

// My latest code
export default function Cart() {
  const [openModal, setOpenModal] = useState(null);
  const disptach = useDispatch();
  const items = useSelector(selectItems);
  const cartLoaded = useSelector(selectCartLoaded);
  const status = useSelector(selectCartStatus);
  const navigate = useNavigate();

  // calculate using reducer - new to me
  const totalAmount = items.reduce(
    (amount, item) => discountPrice(item.product) * item.quantity + amount,
    0
  );
  const totalItems = items.reduce((total, item) => item.quantity + total, 0);
  console.log("total items ", totalItems);

  const handleQuantity = (e, item) => {
    // + mark used because value string mei ayega so usko integer mei convert kr rhe hai
    disptach(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };
  const handleSize = (e, item) => {
    console.log("size changed to : ", e.target.value);
    disptach(updateCartAsync({ id: item.id, size: e.target.value }));
  };
  const handleDelete = (e, id) => {
    disptach(deleteCartItemAsync(id));
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {/* {!items.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )} */}

      {/* max-w-7xl , bg-white */}
      { (items.length > 0) ? (
        <div className="mx-auto bg-white py-2 px-4 sm:px-6 lg:px-8 max-w-screen-md">
          <h1 className="text-xs my-10 flex justify-center font-bold  text-TextColor">
            <span className="text-[#4F46E5] mr-2">MY BAG</span> - - - - - - - -
            - - - - - <span className="mx-2">ADDRESS</span> - - - - - - - - - -
            - - - <span className="ml-2">PAYMENT</span>
          </h1>
          <div className="border-b border-gray-200 px-4 py-6 sm:px-6 ">
            <div className="flow-root ">
              {/* spinner */}
              {status === "loading" && (
                <div className="flex items-center justify-center w-full h-full m-4">
                  <HashLoader color="#4F46E5" />
                </div>
              )}
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-44 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                            <Link to={`/product-detail/${item.product.id}`}>
                              {item.product.title}
                            </Link>
                          </h3>
                          <p className="ml-4">₹{discountPrice(item.product)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.product.brand}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.color}
                        </p>
                        {/* {
                        item.color && (
                          <div className="mt-6">
                            <label htmlFor="color" className="inline leading-6 mr-1 text-gray-500">Color :</label>
                            <h1 className="inline leading-6 mr-1 text-gray-500">{item.color}</h1>
                          </div>
                        )
                      } */}
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        {item.size && (
                          <div>
                            <p
                              htmlFor="size"
                              className="inline leading-6 mr-1 text-gray-500"
                            >
                              Size : {item.size}
                            </p>
                          </div>
                        )}
                        <div className="text-gray-500">
                          <label
                            htmlFor="Quantity"
                            className="inline leading-6 mr-1 text-gray-500"
                          >
                            Qty
                            {/* {item.quantity} */}
                          </label>

                          <select
                            className="rounded-md text-xs"
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
                          <Modal
                            title={`Delete ${item.product.title}`}
                            message="Are you sure you want to delete this cart item?"
                            dangertOption="Delete"
                            cancelOption="Cancel"
                            dangerAction={(e) => handleDelete(e, item.id)}
                            cancelAction={() => setOpenModal(null)}
                            showModal={openModal === item.id}
                          ></Modal>
                          <button
                            onClick={(e) => {
                              setOpenModal(item.id);
                            }}
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
            <div className="flex justify-between text-base font-normal text-TextColor">
              <p>Total Items in cart</p>
              <p>{totalItems} items</p>
            </div>
            <div className="flex justify-between text-TextColor font-bold">
              <p>Total Amount</p>
              <p>₹{totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-TextColor">
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
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[85vh] bg-white">
          <div className="text-center">
            <img
              src="https://tss-static-images.gumlet.io/emptyCart.png" // Replace with your actual image URL
              alt="Empty Cart"
              className="mx-auto mb-4 w-40 object-cover block"
            />
            <h2 className="text-2xl font-semibold mb-2">Your Cart is Empty</h2>
            <p className="text-gray-500 mb-4">
              Looks like you haven't added any items to your cart.
            </p>
            <button
              className="bg-PrimaryColor text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-800"
              onClick={() => {
                navigate('/')
              }}
            >
              Explore Products
            </button>
          </div>
        </div>
      )}
    </>
  );
}
