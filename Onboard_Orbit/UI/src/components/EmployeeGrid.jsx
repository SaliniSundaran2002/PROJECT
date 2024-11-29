import React ,{ useState, useEffect } from 'react';
import EmployeeCard from './EmployeeCard';

const EmployeeGrid = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('/api/getUsersDetails', {
                    method: 'GET',
                    credentials: 'include',  // Include cookies if needed for authentication
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }

                const data = await response.json();
                setUsers(data.users);  // Assuming your API sends the users array
                setLoading(false);
            } catch (err) {
                setError('Failed to load users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);  // Empty dependency array ensures it runs once when the component mounts

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="p-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {users.map((employee, index) => (
                <EmployeeCard key={index} employee={employee} />
            ))}
        </div>
    );
};

export default EmployeeGrid