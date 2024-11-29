import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const UserMobileNavbar = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
       <div className="fixed top-4 right-4 z-50">
        <button
          id="menuButton"
          className="md:hidden text-white text-lg sm:text-xl p-2 rounded-md"
          onClick={toggleNavbar}
        >
          ☰
        </button>
      </div>
      <nav
        id="mobileNavbar"
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-800 transform transition-transform duration-300 ease-in-out md:hidden ${
          isNavbarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <ul className="flex flex-col space-y-4 p-6 text-white text-sm">
          <li><Link to="/user-home" className="hover:text-blue-300">Home</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300">My Profile</Link></li>
          <li><Link to="/user-onTasks" className="hover:text-blue-300">Onboarding Tasks</Link></li>
          <li><Link to="/user-trainTasks" className="hover:text-blue-300">Training Tasks</Link></li>
          <li><Link to="/user-track-progress" className="hover:text-blue-300">Progress</Link></li>
          <li><Link to="/user-resourses" className="hover:text-blue-300">Resourses</Link></li>
          <li><Link to="/user-notifications" className="hover:text-blue-300">Notifications</Link></li>
          <li><Link to="/user-support" className="hover:text-blue-300">Support</Link></li>
          <li><Link to="/" className="hover:text-blue-300">Logout</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default UserMobileNavbar;
