import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile';
import Footer from '../features/common/Footer';

const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
            <UserProfile></UserProfile>
        </Navbar>
        <Footer></Footer>
    </div>
  )
}

export default UserProfilePage;