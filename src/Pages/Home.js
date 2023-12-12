import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product/components/ProductList';
import Footer from '../features/common/Footer'
import LandingBanner from './LandingBanner';

const Home = () => {
  return (
    <div>
        <Navbar>
            <LandingBanner></LandingBanner>
            <ProductList></ProductList>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default Home