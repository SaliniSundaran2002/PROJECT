import React from 'react'

const DashboardCard = () => {
  return (
    <>
    <div className="dashboard-cards grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4 sm:mb-8">
            <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
                <h3 className="text-base sm:text-lg font-semibold">Total Employees</h3>
                <p className="text-lg sm:text-2xl font-bold">120</p>
            </div>
            <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
                <h3 className="text-base sm:text-lg font-semibold">Onboarding Completed</h3>
                <p className="text-lg sm:text-2xl font-bold">80%</p>
            </div>
            <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
                <h3 className="text-base sm:text-lg font-semibold">Training Completed</h3>
                <p className="text-lg sm:text-2xl font-bold">60%</p>
            </div>
            <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center text-black">
                <h3 className="text-base sm:text-lg font-semibold">Pending Tasks</h3>
                <p className="text-lg sm:text-2xl font-bold">40 Tasks</p>
            </div>
            <div className="card bg-white shadow-md rounded-lg p-3 sm:p-4 text-center sm:col-span-1 md:col-span-2 lg:col-span-1 text-black">
                <h3 className="text-base sm:text-lg font-semibold">New Employees This Month</h3>
                <p className="text-lg sm:text-2xl font-bold">10</p>
            </div>
        </div>
    
    
    </>
  )
}

export default DashboardCard