import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import Footer from '../features/common/Footer'
import Checkout from './Checkout';

const CheckoutPage = () => {
  return (
    <div>
        <Navbar>
            <Checkout></Checkout>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default CheckoutPage