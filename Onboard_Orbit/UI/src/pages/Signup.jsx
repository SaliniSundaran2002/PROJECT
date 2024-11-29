import React, { useState } from 'react';
import whiteLogo from "../assets/Images/white-logo.png";
import DarkWallpaper from "../assets/Images/DarkWallpaper.png";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const signupSubmit = async (userDetails) => {
        const res = await fetch('/api/signup', { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                FirstName: userDetails.firstName, 
                LastName: userDetails.lastName,
                Email: userDetails.email,
                Address: userDetails.address,
                PhoneNo: userDetails.phoneNo,
                Username: userDetails.username,
                Password: userDetails.password,
                Role: userDetails.role,
            }),
            credentials: 'include',
        });
    
        const data = await res.json();
        console.log("Response Data:", data);
        console.log("status",res.status);

        if(res.status === 201){
            toast.success("Successfully Signed in")
            navigate("/")
        } else{
            toast.error("Error occured")
        }

        
        
    };
    


    const submitForm = (e) => {
        e.preventDefault();
        const userDetails = {
            firstName,
            lastName,
            address,
            phoneNo,
            username,
            password,
            email,
            role,
        };

        signupSubmit(userDetails);
    }

    return (
        <>
            <div className="bg-cover bg-center bg-no-repeat flex items-center justify-center" style={{ backgroundImage: `url(${DarkWallpaper})` }}>
                <div className="bg-white bg-opacity-10 backdrop-blur-lg w-full max-w-md md:max-w-lg p-8 rounded-2xl shadow-lg border border-white/20">
                    <div className="flex justify-center mb-6">
                        <img src={whiteLogo} alt="Company Logo" className="w-[150px] h-[150px] object-cover" />
                    </div>
                    <h2 className="text-2xl font-semibold text-center text-white mb-6">Sign Up</h2>
                    <form onSubmit={submitForm}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="first-name" className="text-white text-lg">First Name:</label>
                            <input type="text" id="first-name" name="firstName" placeholder="Enter your first name" className="h-12 rounded-lg px-4 mt-1" required value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="last-name" className="text-white text-lg">Last Name:</label>
                            <input type="text" id="last-name" name="lastName" placeholder="Enter your last name" className="h-12 rounded-lg px-4 mt-1" required value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="text-white text-lg">Email:</label>
                            <input type="email" id="email" name="email" placeholder="Enter your email" className="h-12 rounded-lg px-4 mt-1" required value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="address" className="text-white text-lg">Address:</label>
                            <textarea id="address" name="address" placeholder="Enter your address" className="h-24 rounded-lg px-4 mt-1" required value={address} onChange={(e) => setAddress(e.target.value)}></textarea>
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="phone" className="text-white text-lg">Phone Number:</label>
                            <input type="tel" id="phone" name="phoneNo" placeholder="Enter your phone number" className="h-12 rounded-lg px-4 mt-1" required value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="username" className="text-white text-lg">Username:</label>
                            <input type="text" id="username" name="username" placeholder="Enter your username" className="h-12 rounded-lg px-4 mt-1" required value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="text-white text-lg">Password:</label>
                            <input type="password" id="password" name="password" placeholder="Enter your password" className="h-12 rounded-lg px-4 mt-1" required value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {/* <div className="flex flex-col mb-4">
                            <label htmlFor="profilePicUpload" className="block mb-1 text-white">Upload Profile Picture:</label>
                            <input type="file" id="profilePicUpload" name="profilePic" accept="image/jpeg, image/png" className="border border-gray-300 rounded p-2 w-[18rem] text-white" onChange={(e) => setProfilePic(e.target.files[0])} />
                        </div> */}

                        <div className="flex flex-col mb-6">
                            <label htmlFor="role" className="text-white text-lg">Role:</label>
                            <select id="role" name="role" className="h-12 rounded-lg px-4 mt-1" required value={role} onChange={(e) => setRole(e.target.value)}>
                                <option value="">Select your role</option>
                                <option value="developer">Frontend Developer</option>
                                <option value="uidesigner">UI/Ux Designer</option>
                            </select>
                        </div>

                        <button type="submit" className="w-full bg-sky-600 text-white font-semibold py-2 rounded-lg transition duration-200 hover:bg-sky-700">
                            Sign Up
                        </button>
                    </form>

                    <p className="text-center text-white mt-4">Already have an account? <Link to="/" className="text-sky-400 underline hover:text-sky-900">Login here</Link>.</p>
                </div>
            </div>
        </>
    );
}

export default Signup;
