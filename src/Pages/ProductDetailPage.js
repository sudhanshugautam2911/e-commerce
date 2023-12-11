import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails';
import Footer from '../features/common/Footer';

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetails></ProductDetails>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default ProductDetailPage