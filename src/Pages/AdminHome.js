import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductList from '../features/admin/components/AdminProductList';
import Footer from '../features/common/Footer';

const AdminHome = () => {
  return (
    <div>
        <Navbar>
            <AdminProductList></AdminProductList>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default AdminHome