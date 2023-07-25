import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails';

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductDetails></ProductDetails>
        </Navbar>
    </div>
  )
}

export default Home