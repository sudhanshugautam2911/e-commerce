import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { useEffect, useState } from "react";
import { ITEM_PER_PAGE, discountPrice } from "../../../app/constants";
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({_order:'asc'});
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOderId, setEditableOderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOderId(order.id);
  };
  const handleShow = () => {
    console.log("handle to show");
  };

  const handleUpdateOrder = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOderId(-1);
  };
  const handlePage = (page) => {
    setPage(page);
  };
  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    console.log({ sort });
    setSort(sort);
  };
  useEffect(() => {
    const pagination = { _page: page, _limit: ITEM_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

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
      {/* component */}
      <div className="overflow-x-auto">
        <div className="min-w-screen bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
          <div className="w-full ">
            <div className="bg-white  shadow-md rounded my-6">
              <table className="min-w-max w-full table-auto">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th
                      className="py-3 px-6 text-left cursor-pointer select-none"
                      onClick={(e) =>
                        handleSort({
                          sort: "id",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Order#
                      {" "}
                      {sort._sort === 'id' && (sort._order == "asc" ? (
                        <ArrowUpIcon className="w-4 h-4 inline "></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                    </th>
                    <th className="py-3 px-6 text-left cursor-pointer select-none">
                      Items
                    </th>
                    <th
                      className="py-3 px-6 text-left cursor-pointer select-none"
                      onClick={(e) =>
                        handleSort({
                          sort: "totalAmount",
                          order: sort?._order === "asc" ? "desc" : "asc",
                        })
                      }
                    >
                      Total Amount
                      {" "}
                      {sort._sort === 'totalAmount' && (sort._order == "asc" ? (

                        <ArrowUpIcon className="w-4 h-4 inline "></ArrowUpIcon>
                      ) : (
                        <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                      ))}
                    </th>
                    <th className="py-3 px-6 text-center cursor-pointer select-none">
                      Shipping Address
                    </th>
                    <th className="py-3 px-6 text-center cursor-pointer select-none">
                      Status
                    </th>
                    <th className="py-3 px-6 text-center cursor-pointer select-none">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {orders.map((order) => (
                    <tr className="border-b border-gray-200 hover:bg-gray-100">
                      <td className="py-3 px-6 text-left whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="mr-2"></div>
                          <span className="font-medium">{order.id}</span>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-left">
                        {order.items.map((item) => (
                          <div className="flex items-center">
                            <div className="mr-2">
                              <img
                                className="w-6 h-6 rounded-full"
                                src={item.thumbnail}
                              />
                            </div>
                            <span className="">
                              {item.title} - #{item.quantity} - $
                              {discountPrice(item)}
                            </span>
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex items-center justify-center text-sm font-medium">
                          ${order.totalAmount}
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="">
                          <div>
                            <strong>{order.selectedAddresses.name},</strong>
                          </div>
                          <div>{order.selectedAddresses.street},</div>
                          <div>{order.selectedAddresses.city},</div>
                          <div>{order.selectedAddresses.state},</div>
                          <div>{order.selectedAddresses.phone},</div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-center text-sm font-medium">
                        {order.id === editableOderId ? (
                          <select onChange={(e) => handleUpdateOrder(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-xs`}
                          >
                            {order.status}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-6 text-center">
                        <div className="flex item-center justify-center">
                          <div className="w-5 cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110">
                            <EyeIcon onClick={(e) => handleShow(order)}>
                              {" "}
                            </EyeIcon>
                          </div>
                          <div className="w-5 cursor-pointer mr-2 transform hover:text-purple-500 hover:scale-110">
                            <PencilIcon
                              onClick={(e) => handleEdit(order)}
                            ></PencilIcon>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Pagination
          page={page}
          setPage={setPage}
          handlePage={handlePage}
          totalItems={totalOrders}
        ></Pagination>
      </div>
    </>
  );
}

export default AdminOrders;
