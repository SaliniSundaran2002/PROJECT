import React from 'react';

// You can format the phone number or leave it as-is
const formatPhoneNumber = (phone) => {
    // Example format: (XXX) XXX-XXXX
    return phone ? phone.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3') : 'N/A';
};

const EmployeeCard = ({ employee }) => {
    const { name, role, email, phone } = employee;

    return (
        <div className="bg-white rounded-lg shadow-md p-4 max-w-sm border border-gray-200">
            <div className="flex items-center space-x-4">
                {/* <img
                    src={imageUrl || 'https://via.placeholder.com/150'}
                    alt={`${name || 'Employee'}'s profile`}
                    className="w-16 h-16 rounded-full object-cover"
                    aria-label="Employee profile picture"
                /> */}
                <div>
                    <h2 className="text-lg font-semibold">{name || 'N/A'}</h2>
                    <p className="text-sm text-gray-500">{role|| 'N/A'}</p>
                    {/* <p className="text-sm text-gray-400">{department || 'N/A'}</p> */}
                </div>
            </div>
            <div className="mt-4">
                <p className="text-sm"><strong>Email:</strong> {email || 'N/A'}</p>
                <p className="text-sm"><strong>Phone:</strong> {formatPhoneNumber(phone)}</p>
            </div>
        </div>
    );
};

export default EmployeeCard;
