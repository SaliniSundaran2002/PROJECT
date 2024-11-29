import React from 'react'
import Navbar from '../components/Navbar'
import MobileNavbar from '../components/MobileNavbar'
import BackgroundImage from '../components/BackgroundImage'
import Footer from '../components/Footer'

const AdminOnboardingTasks = () => {
  return (
    <>
    <BackgroundImage>
        <Navbar/>
        <MobileNavbar/>
        <Footer/>
    </BackgroundImage>
    </>
  )
}

export default AdminOnboardingTasks