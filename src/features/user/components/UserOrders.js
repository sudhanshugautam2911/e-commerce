import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserInfo,
  selectUserOrder,
} from "../userSlice";
import { discountPrice } from "../../../app/constants";
import { Link, useNavigate } from "react-router-dom";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrder);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, [dispatch]);
 console.log("ordders " , orders);
  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  return (
    <>
      {orders && orders.length > 0 ? (
        <div className="mx-auto sm:px-6 lg:px-8 max-w-screen-xl ">
          <h1 className="text-xl mt-5 mb-5 flex justify-center font-bold  uppercase text-gray-700">
            My Orders
          </h1>
          {orders &&
            orders.map((order) => (
              // <div>
              <div className="bg-white px-4 py-3 my-6 rounded-md">
                <div className=" py-6 ">
                  <div className="flow-root ">
                    <ul role="list" className="-my-6 divide divide-gray-200">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex py-6">
                          <div className="h-48 w-44 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
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
                                  <Link
                                    to={`/product-detail/${item.product.id}`}
                                  >
                                    {item.product.title}
                                  </Link>
                                </h3>
                                <p className="ml-4">
                                  ₹{discountPrice(item.product)}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              {item.size && (
                                <label
                                  htmlFor="Quantity"
                                  className="inline leading-6 mr-1 text-gray-500"
                                >
                                  Size : {item.size}
                                </label>
                              )}
                              {item.color && (
                                <label
                                  htmlFor="Quantity"
                                  className="inline leading-6 mr-1 text-gray-500"
                                >
                                  Color : {item.color}
                                </label>
                              )}
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
                <h1 className="text-sm  sm:hidden font-Roboto  text-gray-600">
                  Order #{order.id.substring(0, 12) + "..."}
                </h1>
                <h1 className="text-sm  max-sm:hidden font-Roboto  text-gray-600">
                  Order #{order.id}
                </h1>
                {/* <h3 className="text-lg mt-2 mb-4 flex font-RobotoCond  text-red-900">
              Order Status : {order.status}
            </h3> */}
                <div className="my-2 mb-5">
                  <span className="text-base font-RobotoCond text-gray-500">
                    Order Status :{" "}
                  </span>
                  <span
                    className={`${chooseColor(
                      order.status
                    )} py-1 px-3 rounded-full text-xs`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="border-t border-gray-200  py-6">
                  <div className="flex justify-between text-base font-normal text-gray-600">
                    <p>Total Items</p>
                    <p>{order.totalItems} items</p>
                  </div>
                  <div className="flex justify-between text-base font-medium text-TextColor">
                    <p>Total Amount</p>
                    {/* in our orders we have given totalAmount */}
                    <p>₹{order.totalAmount}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping Address
                  </p>
                  <div className="flex justify-between gap-x-6 py-3 px-5 shadow-sm ring-1 ring-inset ring-gray-300 rounded-md my-2">
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
      ) : (
        <div className="flex items-center justify-center h-[85vh] bg-white">
          <div className="text-center">
            <img
              src="https://img.freepik.com/free-vector/empty-concept-illustration_114360-7416.jpg?w=740&t=st=1702658585~exp=1702659185~hmac=157dc6cf0701c6b9455dd5024e2377101ca69320bf47856c4d2011230f86f2c0" // Replace with your actual image URL
              alt="No orders"
              className="mx-auto mb-4 w-60 object-cover block"
            />
            <h2 className="text-2xl font-semibold mb-2">No Orders Yet</h2>
            <p className="text-gray-500 mb-4">
              You haven't placed any orders. Explore our products and start
              shopping!
            </p>
            <button
              className="bg-PrimaryColor text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-800"
              onClick={() => {
                navigate("/");
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
