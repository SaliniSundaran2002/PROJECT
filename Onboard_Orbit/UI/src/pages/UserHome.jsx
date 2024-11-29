import React from 'react';
import Footer from '../components/Footer';
import WelcomeSection from '../components/WelcomeSection';
import CompanyOverview from '../components/CompanyOverview';
import BackgroundImage from '../components/BackgroundImage';
import UserLayout from '../layouts/UserLayout';
const UserHome = () => {
    return (
        <>
            <BackgroundImage>
                <UserLayout />
                <WelcomeSection />
                <CompanyOverview />
            </BackgroundImage>
            <Footer />

        </>
    );
};

export default UserHome;
