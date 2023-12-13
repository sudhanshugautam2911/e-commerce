import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import ProductList from '../features/product/components/ProductList';
import Footer from '../features/common/Footer'
import LandingBanner from './LandingBanner';
import ShopByFandomPage from './ShopByFandomPage';

const Home = () => {
  return (
    <div>
        <Navbar>
            <LandingBanner></LandingBanner>
            <ShopByFandomPage></ShopByFandomPage>
            <ProductList></ProductList>
        </Navbar>
        <Footer/>
    </div>
  )
}

export default Home