import React, { useState } from 'react';
import whiteLogo from "../assets/Images/white-logo.png";
import DarkWallpaper from "../assets/Images/DarkWallpaper.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Login = () => {
    const [username, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const loginSubmit = async (e) => {
        e.preventDefault();
        const loginDetails = {
            Username: username, Password: password
        };
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginDetails),
            credentials: 'include',
        });
        console.log("login response:", res.status);

        if (res.ok) {
            const data = await res.json();
            console.log("Response data:", data); 
            const role = data.role
            // console.log("role", role)

            if (role === 'admin') {
                toast.success('Logged in as Admin');
                navigate('/admin-home');
            } else {
                toast.success(`Logged in as: ${role}'}`);
                navigate('/admin-home');
            }
        } else {
            toast.error('Please check your credentials.');
        }
    }


    return (
        <div className="bg-cover bg-center bg-no-repeat flex h-screen items-center justify-center" style={{ backgroundImage: `url(${DarkWallpaper})` }}>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full max-w-md md:max-w-lg p-8 rounded-2xl shadow-lg border border-white/20 text-white">
                <div className="flex justify-center mb-6">
                    <img src={whiteLogo} alt="Company Logo" className="w-32 h-32 object-cover" />
                </div>
                <h2 className="text-3xl font-semibold text-center mb-6">Login</h2>
                <form onSubmit={loginSubmit}>
                    <div className="flex flex-col mb-4">
                        <label for="username" className="text-lg">Username:</label>
                        <input type="text" id="username" placeholder="Enter your username" className="h-12 rounded-lg px-4 mt-1 text-gray-800" required value={username} onChange={(e) => setUserName(e.target.value)} />
                    </div>

                    <div className="flex flex-col mb-4">
                        <label for="password" className="text-lg">Password:</label>
                        <input type="password" id="password" placeholder="Enter your password" className="h-12 rounded-lg px-4 mt-1 text-gray-800" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className="flex items-center mb-4">
                        <input type="checkbox" id="rememberMe" className="mr-2" />
                        <label for="rememberMe" className="text-lg">Remember Me</label>
                    </div>

                    <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg transition duration-200 hover:bg-sky-700">
                        Login
                    </button>

                    <p className="text-center mt-4">
                        Forgot your password? <a href="#" className="text-teal-300 underline hover:text-teal-400">Click here</a>
                    </p>

                    <p className="text-center mt-2">
                        Don't have an account? {' '} <Link to="signup" className="text-teal-300 underline hover:text-teal-400">Sign Up</Link>
                    </p>
                </form>
            </div>

        </div>
    )
}

export default Login