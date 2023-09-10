import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectLoggedInUser } from "../../auth/authSlice";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrder } from "../userSlice";

export default function UserOrders() {
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrder);

  useEffect(() => {
    console.log("user id is " + user.id);
    dispatch(fetchLoggedInUserOrdersAsync(user.id));
  }, []);

  return (
    <div className="mx-auto sm:px-6 lg:px-8 max-w-screen-xl ">
      <h1 className="text-4xl mt-5 mb-8 flex justify-center font-bold  text-gray-900">
        My Orders
      </h1>
      {orders.map((order) => (
        // <div>
        <div className="bg-white px-4 py-3 my-6 rounded-md">
          <h1 className="text-3xl  flex font-bold  text-gray-900">
            Order #{order.id}
          </h1>
          <h3 className="text-lg mt-2 mb-4 flex font-semibold  text-red-900">
            Order Status : {order.status}
          </h3>
          <div className="px-4 py-6 sm:px-6 ">
            <div className="flow-root ">
              <ul role="list" className="-my-6 divide divide-gray-200">
                {order.items.map((item) => (
                  <li key={item.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={item.href}>{item.title}</a>
                          </h3>
                          <p className="ml-4">${item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {item.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="Quantity"
                            className="inline leading-6 mr-1 text-gray-500"
                          >
                            Qty : {item.quantity}
                          </label>
                        </div>

                        <div className="flex"></div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Total Items</p>
              <p>{order.totalItems} items</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              {/* in our orders we have given totalAmount */}
              <p>${order.totalAmount}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping Address
            </p>
            <div
              className="flex justify-between gap-x-6 py-3 px-5 shadow-sm ring-1 ring-inset ring-gray-300 rounded-md my-2"
            >
              <div className="flex gap-x-4 items-center">
               
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddresses.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddresses.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddresses.pinCode}
                  </p>
                </div>
              </div>
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone : {order.selectedAddresses.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddresses.city}
                </p>
              </div>  
            </div>
          </div>
        </div>
        // </div>
      ))}
    </div>
  );
}
