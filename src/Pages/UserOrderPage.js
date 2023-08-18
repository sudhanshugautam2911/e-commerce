import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserOrders from '../features/user/components/UserOrders';

const UserOrderPage = () => {
  return (
    <div>
        <Navbar>
            <UserOrders></UserOrders>
        </Navbar>
    </div>
  )
}

export default UserOrderPage;