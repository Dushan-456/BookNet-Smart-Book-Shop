import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../Context/AuthContext';

const Header = () => {
    // 2. Get the auth state and logout function from the context
    const { isAuthenticated, user, logout } = useAuth(); 
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the logout function from the context
        navigate('/login'); // Redirect to login page
    };

    return (
        <header className="bg-blue-600 text-white p-4 shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold">BookNet</Link>
                <div>
                    {/* 3. Use the isAuthenticated flag for conditional rendering */}
                    {isAuthenticated ? (
                        <>
                            {/* Show this if the user IS logged in */}
                            <span className="mr-4">Welcome, {user.firstName}!</span>
                            <Link to="/profile" className="mr-4 hover:underline">Profile</Link>
                            <Button onClick={handleLogout} variant="contained" color="secondary">
                                Logout
                            </Button>
                        </>
                    ) : (
                        <>
                            {/* Show this if the user IS NOT logged in */}
                            <Link to="/login" className="mr-4 hover:underline">Login</Link>
                            <Link to="/register" className="hover:underline">Register</Link>
                        </>
                    )}
                    <Link to="/cart" className="ml-6 font-semibold">Cart</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;