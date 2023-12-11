import React, { useEffect, useState } from "react";
import Navbar from "../features/Navbar/Navbar";
import AdminOrders from "../features/admin/components/AdminOrders";
import { ArrowDownIcon } from "@heroicons/react/24/outline";
import Footer from "../features/common/Footer";

const AdminOrdersPage = () => {
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Navbar>
        {showPopup && (
          <div className="bg-white text-xs text-gray-700 p-2 absolute top-15 left-52 z-50 rounded shadow animate-bounce">
            <ArrowDownIcon className="w-5 inline" />
            You can sort by clicking on this
          </div>
        )}
        <AdminOrders></AdminOrders>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default AdminOrdersPage;
