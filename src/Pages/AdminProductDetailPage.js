import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/admin/components/AdminProductDetails';
import Footer from '../features/common/Footer';

const AdminProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <AdminProductDetails></AdminProductDetails>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default AdminProductDetailPage