import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="title">Welcome to Our Platform</h1>
        <p className="subtitle">Discover amazing possibilities with us</p>
        <button className="cta-button">Get Started</button>
      </div>
      
      <div className="features-section">
        <div className="feature-card">
          <h3>Feature 1</h3>
          <p>Experience the best service</p>
        </div>
        <div className="feature-card">
          <h3>Feature 2</h3>
          <p>Innovative solutions</p>
        </div>
        <div className="feature-card">
          <h3>Feature 3</h3>
          <p>24/7 Support</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
