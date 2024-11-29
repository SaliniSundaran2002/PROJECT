import React from 'react'
import EmployeeCard from '../components/EmployeeCard'
import BackgroundImage from '../components/BackgroundImage'
import Navbar from '../components/Navbar'
import MobileNavbar from '../components/MobileNavbar'
const ViewEmployee = () => {
    return (
        <>
            <BackgroundImage>
                <Navbar />
                <MobileNavbar />
                <EmployeeCard />
            </BackgroundImage>

        </>
    )
}

export default ViewEmployee