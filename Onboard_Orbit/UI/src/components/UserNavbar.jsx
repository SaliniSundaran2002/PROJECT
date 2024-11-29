import React from 'react';
import whiteLogo from "../assets/Images/white-logo.png";
import { Link } from 'react-router-dom';

const UserNavbar = () => {
    return (
        <>
            <div className="text-white p-4 flex items-center justify-between">
                <div className="logo-home">
                    <img src={whiteLogo} alt="Logo" className="sm:h-16 md:h-32 lg:h-48 xl:h-56" />
                </div>

                <div className="hidden md:flex space-x-6">
                    <Link to="/user-home" className="hover:text-blue-300">Home</Link>
                    <Link to="/profile" className="hover:text-blue-300">My Profile</Link>
                    
                    <div className="relative group">
                        <button className="hover:text-blue-300 text-sm sm:text-base">Tasks</button>
                        <div className="absolute hidden group-hover:block bg-gray-700 mt-2 rounded shadow-lg p-2 space-y-2">
                            <Link to="/user-onTasks" className="hover:text-blue-300 block">Onboarding Tasks</Link>
                            <Link to="/user-trainTasks" className="hover:text-blue-300 block">Training Tasks</Link>
                            <Link to="/user-track-progress" className="hover:text-blue-300 block">Progress</Link>
                        </div>
                    </div>

                    <Link to="/user-resourses" className="hover:text-blue-300">Resources</Link>
                    <Link to="/user-notifications" className="hover:text-blue-300">Notifications</Link>
                    <Link to="/user-support" className="hover:text-blue-300">Support</Link>
                    <Link to="/" className="hover:text-blue-300">Logout</Link>
                </div>
            </div>
        </>
    );
};

export default UserNavbar;
