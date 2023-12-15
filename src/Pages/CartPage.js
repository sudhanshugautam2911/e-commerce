import React from "react";
import Cart from "../features/Cart/Cart";
import Footer from "../features/common/Footer";
import Navbar from "../features/Navbar/Navbar";

const CartPage = () => {
  return (
    <div>
      <Navbar>
        <Cart></Cart>
      </Navbar>
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
