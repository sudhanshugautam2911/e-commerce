import React from 'react'
import Navbar from '../features/Product-list/Navbar'
import ProductList from '../features/Product-list/ProductList';

const Home = () => {
  return (
    <div>
        <Navbar>
            <ProductList></ProductList>
        </Navbar>
    </div>
  )
}

export default Home