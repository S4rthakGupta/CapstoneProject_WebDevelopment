import React, { useState } from 'react';
import API from '../api';
import '../styles/Login.css'; // Import the CSS file

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/users/login', formData);
            alert('✅ Login successful!');
            localStorage.setItem('token', data.token);
        } catch (error) {
            console.error('❌ Login failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="login-title">LOGIN</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="USERNAME" className="login-input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="PASSWORD" className="login-input" onChange={handleChange} required />
                    <div className="login-buttons">
                        <button className="register-btn">REGISTER NOW!</button>
                        <button type="submit" className="login-btn">Login</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
