import React, { useState } from 'react';
import API from '../api';
import '../styles/Register.css'; // Import the CSS file

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        rePassword: '',
        secretQuestion: '',
        postalCode: '',
        city: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.rePassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await API.post('/users/register', formData);
            alert('✅ Registration successful!');
        } catch (error) {
            console.error('❌ Registration failed:', error.response?.data?.message || error.message);
        }
    };

    return (
        <div className="register-container">
            <div className="register-box">
                <h2 className="register-title">SIGN UP</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="username" placeholder="USERNAME" className="register-input" onChange={handleChange} required />
                    <input type="email" name="email" placeholder="UNIVERSITY / COLLEGE EMAIL" className="register-input" onChange={handleChange} required />
                    <input type="password" name="password" placeholder="PASSWORD" className="register-input" onChange={handleChange} required />
                    <input type="password" name="rePassword" placeholder="RE-PASSWORD" className="register-input" onChange={handleChange} required />
                    <input type="text" name="secretQuestion" placeholder="SECRET QUESTION" className="register-input" onChange={handleChange} required />
                    <input type="text" name="postalCode" placeholder="POSTAL CODE" className="register-input" onChange={handleChange} required />
                    <input type="text" name="city" placeholder="CITY" className="register-input" onChange={handleChange} required />
                    <button type="submit" className="register-btn">CONFIRM</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
