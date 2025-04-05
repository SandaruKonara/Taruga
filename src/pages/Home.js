import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../images/Scene-1.json";
import serviceAnimation from "../images/Animation - 1743772306215.json";
import HostingAnimation from "../images/hosting.json";
import turuku from "../images/turuku.json";
import aboutAnimation from "../images/about.json";

import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(false);

  // Update the navigation handler
  const handleServiceLearnMore = (service) => {
    navigate('/services', { 
      state: { selectedService: service },
      search: `?section=${service}`  // Add query parameter
    });
    // Scroll to top on navigation
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Animation style for Lottie
  const style = {
    width: "100%",
    maxWidth: "1200px", // Increased from 600px
    margin: "0 auto",
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    height: "100%",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)"
  };

  // Animation for stars background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Star configuration
    const stars = [];
    const starCount = 250; // Decreased from 300
    const maxSize = 2; // Decreased from 2.5
    const mouseRadius = 100; // Decreased from 120
    const mouseForce = 0.5; // Decreased from 0.6
    
    // Initialize stars with velocity
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 0.3 + Math.random() * maxSize, // Decreased minimum size from 0.5
        velocityX: (Math.random() - 0.5) * 0.5, // Decreased velocity range from 0.7
        velocityY: (Math.random() - 0.5) * 0.5,
        originalX: Math.random() * width,
        originalY: Math.random() * height,
        angle: Math.random() * Math.PI * 2,
        opacity: 0.4 + Math.random() * 0.4 // Decreased opacity range from 0.6-1.0 to 0.4-0.8
      });
    }
    
    // Handle mouse movement
    function handleMouseMove(event) {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    }

    // Animate stars
    function animate() {
      ctx.clearRect(0, 0, width, height);
      
      // Add torch glow effect
      const gradient = ctx.createRadialGradient(
        mouseRef.current.x, mouseRef.current.y, 0,
        mouseRef.current.x, mouseRef.current.y, 100
      );
      gradient.addColorStop(0, 'rgba(255, 200, 100, 0.2)'); // Warm light color
      gradient.addColorStop(0.4, 'rgba(255, 150, 50, 0.1)');
      gradient.addColorStop(1, 'rgba(255, 150, 50, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(mouseRef.current.x, mouseRef.current.y, 100, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw each star
      stars.forEach(star => {
        // Natural motion
        star.angle += 0.02;
        star.x += star.velocityX + Math.sin(star.angle) * 0.5;
        star.y += star.velocityY + Math.cos(star.angle) * 0.5;
        
        // Keep stars within bounds
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        
        // Mouse interaction
        const dx = mouseRef.current.x - star.x;
        const dy = mouseRef.current.y - star.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouseRadius) {
          const force = (mouseRadius - distance) / mouseRadius * mouseForce;
          star.x -= dx * force;
          star.y -= dy * force;
        }
        
        // Draw star
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`; // Using dynamic opacity
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      requestAnimationFrame(animate);
    }
    
    // Handle window resize
    function handleResize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      
      // Reset star positions
      stars.forEach(star => {
        star.originalX = Math.random() * width;
        star.originalY = Math.random() * height;
        star.x = star.originalX;
        star.y = star.originalY;
      });
    }
    
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    animate();
    
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Add this new effect for handling splash animation
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.overflow = 'auto';
      }, 1000);
    }
  }, [isLoading]);

  // Add this effect to handle scroll to top
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location]);

  // Update the handleReload function
  const handleReload = () => {
    setIsLoading(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  return (
    <>
      {isLoading && (
        <div className="splash-screen">
          <div className="splash-circle"></div>
        </div>
      )}
      <div className="home-container">
        {/* Hero Section with Stars Animation */}
        <div className="hero-section">
          <canvas ref={canvasRef} className="stars-canvas"></canvas>
          <div className="hero-content">
            <Lottie 
              animationData={animationData}
              style={style}
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
        
        {/* Services Section */}
        <div className="services-section1" id="services">
          <div className="section-header">
            <h2>Our Services</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-icon"></span>
              <span className="divider-line"></span>
            </div>
            <p>Comprehensive web solutions for your business</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <Lottie 
                  animationData={serviceAnimation}
                  style={{
                      width: "250px",
                      height: "250px",
                  }}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <h3>Website Development</h3>
              <p>At Taruga, we specialize in creating professional, high-performance websites that serve as the cornerstone of your digital presence. With our expertise, we help businesses of all sizes realize their vision through cutting-edge design and seamless functionality.</p>
              
              <button 
                className="service-button" 
                onClick={() => handleServiceLearnMore('website-development')}
              >
                Learn More
              </button>
            </div>
            
            <div className="service-card">
            <div className="service-icon">
                <Lottie 
                  animationData={HostingAnimation}
                  style={{
                      width: "250px",
                      height: "250px",
                  }}
                  loop={true}
                  autoplay={true}
                />
              </div>
              <h3>Hosting and Management</h3>
              <p>At Taruga, we ensure your website runs smoothly, securely, and efficiently with our comprehensive hosting and management services. Our services are designed to give you peace of mind – we take care of all the technical details so you can focus on growing your business.</p>
            
              <button 
                className="service-button" 
                onClick={() => handleServiceLearnMore('host-management')}
              >
                Learn More
              </button>
            </div>
           
          </div>

          
          {/* Partners in success */}

          <div className="section-partner">
            <h2>Partners in success</h2>
            <div className="section-pdivider">
              <span className="divider-line"></span>
              <span className="divider-icon"></span>
              <span className="divider-line"></span>
            </div>
          </div>
          

         
            <div className="service-card1">
              <div className="service-icon">
                <Lottie 
                  animationData={turuku}
                  style={{
                      width: "550px",
                      height: "250px",
                  }}
                  loop={true}
                  autoplay={true}
                />
              </div>
            </div>

            <div className="about-section" id="about">
          <div className="section-header">
            <h2>About Us</h2>
            <div className="section-divider">
              <span className="divider-line"></span>
              <span className="divider-icon"></span>
              <span className="divider-line"></span>
            </div>
            <p>Discover our story and mission</p>
          </div>
          
          <div className="about-content">
            <div className="about-text">

              <p>
              Our team is small, but our passion and dedication are huge. Taruga is a one-person startup committed to delivering exceptional WordPress websites. Every project is executed with care, expertise, and a focus on our clients’ digital success. When you choose Taruga, you work directly with the person behind the vision, ensuring a personal and tailored approach to your needs.
              </p>
              
              
              <button 
                className="about-button" 
                onClick={() => navigate('/contact')}
              >
                Get Start today!
              </button>
            </div>
            
            
              {/* You can use an animation here or a static image */}
              {/* Replace this with your animation when you have the file */}
              <div className="about-placeholder-image">
                <Lottie 
                  animationData={aboutAnimation}
                  style={{
                    width: "500px",
                    height: "auto",
                  }}
                  loop={true}
                  autoplay={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
