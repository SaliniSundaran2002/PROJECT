import React from 'react'
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import MainLayout from './layouts/MainLayout';
import UserLayout from './layouts/UserLayout';
import BackgroundImage from './components/BackgroundImage';
import Footer from './components/Footer';
import Signup from "./pages/Signup"
import Login from './pages/Login';
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import ViewEmployee from './pages/ViewEmployee';
import AdminOnboardingTasks from './pages/AdminOnboardingTasks';
import AdminTrainingTask from './pages/AdminTrainingTask';
import AdminTrackProgress from './pages/AdminTrackProgress';
import AdminNotifications from './pages/AdminNotifications';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route element={<BackgroundImage />} />
        <Route path='/' element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Route */}

        <Route element={<MainLayout />} >
          <Route element={<UserLayout />} >

            <Route path='/user-home' element={<UserHome />} />
            <Route path='/admin-home' element={< AdminHome />} />
            <Route path='/view-employee' element={<ViewEmployee />} />
            <Route path='/admin-onTasks' element={<AdminOnboardingTasks />} />
            <Route path='/admin-trainTasks' element={<AdminTrainingTask />} />
            <Route path='/track-progress' element={<AdminTrackProgress />} />
            <Route path='/admin-notifications' element={<AdminNotifications />} />

            <Route element={<Footer />} />

          </Route>
        </Route>
        {/* Not found route*/}
        <Route path="*" element ={<NotFound />} />
        </>
      )
    );
  return (
    <RouterProvider router={router} />
  )
}

        export default App