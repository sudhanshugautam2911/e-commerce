import React from 'react'
import Navbar from '../features/Navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile';

const UserProfilePage = () => {
  return (
    <div>
        <Navbar>
            <h1 className='mx-auto flex justify-center items-center text-3xl font-bold'>My Profile</h1>
            <UserProfile></UserProfile>
        </Navbar>
    </div>
  )
}

export default UserProfilePage;