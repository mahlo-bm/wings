import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = ({ onRegister, users, setLoggedInUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); 

    
    useEffect(() => {
        setErrorMessage('');
        setSuccessMessage('');
    }, [isSignUp]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignUp) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            if (users.some(user => user.username === username)) {
                setErrorMessage('Username already exists.');
            } else {
                
                const newUser = { username, password };
                onRegister(newUser);
                localStorage.setItem('users', JSON.stringify([...users, newUser])); 
                setSuccessMessage('Registration successful! You can now log in.');
                setUsername('');
                setPassword('');
                setTimeout(() => {
                    setIsSignUp(false);
                }, 2000);
            }
        } else {
            const user = users.find(user => user.username === username);
            if (!user) {
                setErrorMessage('User not found. Please check your username or register first.');
                return;
            }
            setLoggedInUser(user);
            setErrorMessage('');
            setUsername('');
        }
    };

    return (
        <div>
            <marquee><img src="mm.png" alt="Cafe Logo" /><img src="mm.png" alt="Cafe Logo" /></marquee>
            <h3>WELCOME TO WINGS CAFE INVENTORY MANAGEMENT</h3>
            <h2>{isSignUp ? 'Sign Up' : 'Login'}</h2>
            {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
            {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isSignUp ? 'Register' : 'Login'}</button>
            </form>
           
            <button onClick={() => setIsSignUp(!isSignUp)}>
                {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
        </div>
    );
};

export default Registration;