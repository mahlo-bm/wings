import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Registration from './Registration';
import ProductManagement from './ProductManagement';
import UserManagement from './UserManagement';
import SalesHistory from './SalesHistory';
import Dashboard from './Dashboard'; 
import './App.css';

const App = () => {
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [salesHistory, setSalesHistory] = useState([]);

    const handleLogout = () => {
        setLoggedInUser(null);
        // Navigate to the registration/login section
        window.location.href = '/'; // Use window.location to navigate
    };

    const handleNewSale = (product) => {
        const saleTime = new Date().toLocaleString();
        setSalesHistory(prev => [
            ...prev,
            {
                productName: product.name,
                quantitySold: 1,
                timeSold: saleTime,
                price: product.price,
            }
        ]);
    };

    const handleRegister = (newUser) => {
        setUsers(prevUsers => [...prevUsers, newUser]);
    };

    return (
        <Router>
            <div className="app">
                {/* Show NavBar only when logged in */}
                {loggedInUser && (
                    <nav>
                        <Link to="/">Dashboard</Link>
                        <Link to="/product-management">Product Management</Link>
                        <Link to="/user-management">User Management</Link>
                        <Link to="/sales-history">Sales History</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                )}
                <Routes>
                    {/* Show Registration only when not logged in */}
                    {!loggedInUser ? (
                        <>
                            <Route 
                                path="/" 
                                element={
                                    <Registration 
                                        onRegister={handleRegister} 
                                        users={users} 
                                        setLoggedInUser={setLoggedInUser} 
                                    />
                                } 
                            />
                            <Route 
                                path="/registration" 
                                element={
                                    <Registration 
                                        onRegister={handleRegister} 
                                        users={users} 
                                        setLoggedInUser={setLoggedInUser} 
                                    />
                                } 
                            />
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Dashboard />} /> {/* Updated to use Dashboard */}
                            <Route path="/product-management" element={<ProductManagement handleNewSale={handleNewSale} />} />
                            <Route path="/user-management" element={<UserManagement users={users} setUsers={setUsers} />} />
                            <Route path="/sales-history" element={<SalesHistory salesHistory={salesHistory} />} />
                        </>
                    )}
                </Routes>
            </div>
        </Router>
    );
};

export default App;