import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import AdminProductDetails from '../features/admin/components/AdminProductDetails';

const AdminProductDetailPage = () => {
  return (
    <div>
        <Navbar>
            <AdminProductDetails></AdminProductDetails>
        </Navbar>
    </div>
  )
}

export default AdminProductDetailPage