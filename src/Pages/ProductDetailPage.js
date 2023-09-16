import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductDetails from '../features/product/components/ProductDetails';

const ProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <ProductDetails></ProductDetails>
        </Navbar>
    </div>
  )
}

export default ProductDetailPage