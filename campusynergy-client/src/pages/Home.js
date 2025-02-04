import React from 'react';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-content">
                <h1 className="home-title">CampuSynergy</h1>
                <h2 className="home-subtitle">SAFE DEALS FOR STUDENTS!</h2>
                <p className="home-text">
                    Welcome to <strong>CampuSynergy</strong>, the ultimate safe marketplace designed exclusively for students. Here, you can buy, sell, and exchange items within a trusted community where every user is verified through their student ID. Our platform ensures secure transactions, fostering a space where students can connect and trade with confidence.
                </p>
                <p className="home-text">
                    Whether you're looking for textbooks, dorm essentials, or unique finds, <strong>CampuSynergy</strong> is your one-stop shop for all your campus needs. Join today and experience a marketplace built for students, by students.
                </p>
                <div className="home-buttons">
                    <button className="register-btn">REGISTER NOW!</button>
                    <button className="login-btn">Login</button>
                </div>
            </div>
            <div className="home-image">
                <img src="/placeholder-image.png" alt="Marketplace Preview" />
            </div>
        </div>
    );
};

export default Home;
