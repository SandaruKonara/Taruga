import React, { useEffect, useRef } from "react";
import "./Home.css";

const Home = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  
  // Animation for stars background
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    
    // Star configuration
    const stars = [];
    const starCount = 200;
    const maxSize = 2;
    const mouseRadius = 100; // Radius of mouse influence
    const mouseForce = 0.5; // Strength of mouse influence
    
    // Initialize stars with velocity
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * maxSize,
        velocityX: (Math.random() - 0.5) * 0.5, // Random X velocity
        velocityY: (Math.random() - 0.5) * 0.5, // Random Y velocity
        originalX: Math.random() * width,
        originalY: Math.random() * height,
        angle: Math.random() * Math.PI * 2 // Random angle for circular motion
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
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
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

  // Array of phrases for the rotating text
  const rotatingTexts = [
    "Modern Web Solutions",
    "Fast & Reliable Hosting",
    "Responsive Designs",
    "24/7 Technical Support",
    "Custom Development"
  ];

  return (
    <div className="home-container">
      {/* Hero Section with Stars Animation */}
      <div className="hero-section">
        <canvas ref={canvasRef} className="stars-canvas"></canvas>
        <div className="hero-content">
          <h1 className="title">Web Development & Hosting Excellence</h1>
          <div className="rotating-text-container">
            <span>We Provide </span>
            <span className="rotating-text">
              {rotatingTexts.map((text, index) => (
                <span key={index} style={{ animationDelay: `${index * 3}s` }}>
                  {text}
                </span>
              ))}
            </span>
          </div>
          <p className="subtitle">Transforming your ideas into powerful online presence</p>
          <div className="cta-buttons">
            <button className="cta-button primary">Get Started</button>
            <button className="cta-button secondary">Our Services</button>
          </div>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="services-section" id="services">
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
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#F5793B" d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" />
              </svg>
            </div>
            <h3>Website Development</h3>
            <p>Custom web applications and responsive websites built with the latest technologies.</p>
            <ul className="service-features">
              <li>Modern, responsive designs</li>
              <li>E-commerce solutions</li>
              <li>CMS integration</li>
              <li>Custom web applications</li>
            </ul>
            <button className="service-button">Learn More</button>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#F5793B" d="M21 5c-1.11-.35-2.33-.5-3.5-.5-1.95 0-4.05.4-5.5 1.5-1.45-1.1-3.55-1.5-5.5-1.5S2.45 4.9 1 6v14.65c0 .25.25.5.5.5.1 0 .15-.05.25-.05C3.1 20.45 5.05 20 6.5 20c1.95 0 4.05.4 5.5 1.5 1.35-.85 3.8-1.5 5.5-1.5 1.65 0 3.35.3 4.75 1.05.1.05.15.05.25.05.25 0 .5-.25.5-.5V6c-.6-.45-1.25-.75-2-1zm0 13.5c-1.1-.35-2.3-.5-3.5-.5-1.7 0-4.15.65-5.5 1.5V8c1.35-.85 3.8-1.5 5.5-1.5 1.2 0 2.4.15 3.5.5v11.5z" />
              </svg>
            </div>
            <h3>Hosting Management</h3>
            <p>Reliable, secure, and scalable hosting solutions for all your web needs.</p>
            <ul className="service-features">
              <li>99.9% uptime guarantee</li>
              <li>CDN integration</li>
              <li>SSL certificates</li>
              <li>Regular backups</li>
            </ul>
            <button className="service-button">Learn More</button>
          </div>
          
          <div className="service-card">
            <div className="service-icon">
              <svg viewBox="0 0 24 24" width="48" height="48">
                <path fill="#F5793B" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
            </div>
            <h3>Maintenance & Support</h3>
            <p>Keep your website running smoothly with our comprehensive maintenance services.</p>
            <ul className="service-features">
              <li>24/7 technical support</li>
              <li>Security monitoring</li>
              <li>Performance optimization</li>
              <li>Regular updates</li>
            </ul>
            <button className="service-button">Learn More</button>
          </div>
        </div>
      </div>
      
      {/* About Us Section */}
      <div className="about-section" id="about">
        <div className="section-header">
          <h2>About Us</h2>
          <div className="section-divider">
            <span className="divider-line"></span>
            <span className="divider-icon"></span>
            <span className="divider-line"></span>
          </div>
        </div>
        
        <div className="about-content">
          <div className="about-image">
            <div className="image-container">
              <div className="image-placeholder"></div>
            </div>
          </div>
          <div className="about-text">
            <h3>Your Trusted Web Partner</h3>
            <p>
              We are a team of passionate web developers and hosting specialists dedicated to delivering exceptional digital experiences. With years of industry experience, we've helped businesses of all sizes establish and enhance their online presence.
            </p>
            <p>
              Our mission is to provide cutting-edge web solutions that are not only visually stunning but also functionally powerful. We believe in building long-term relationships with our clients, ensuring their digital success through continuous support and innovation.
            </p>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-number">5+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100+</span>
                <span className="stat-label">Happy Clients</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">200+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
            </div>
            <button className="about-button">Learn More About Us</button>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="section-header">
          <h2>What Our Clients Say</h2>
          <div className="section-divider">
            <span className="divider-line"></span>
            <span className="divider-icon"></span>
            <span className="divider-line"></span>
          </div>
        </div>
        
        <div className="testimonials-container">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Their web development team created an amazing website for my business. The design is modern, responsive, and exactly what I needed!
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>John Smith</h4>
                <p>CEO, TechStart</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Their hosting service is reliable and their support team is always available. Best decision I made for my online store!
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Sarah Johnson</h4>
                <p>Owner, Fashion Boutique</p>
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">
              Professional, responsive, and incredibly skilled. They transformed our outdated website into a modern platform that our customers love.
            </p>
            <div className="testimonial-author">
              <div className="author-avatar"></div>
              <div className="author-info">
                <h4>Michael Brown</h4>
                <p>Marketing Director, GrowCorp</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contact CTA Section */}
      <div className="contact-cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Online Presence?</h2>
          <p>Let's discuss how we can help you achieve your digital goals.</p>
          <button className="cta-button primary">Contact Us Today</button>
        </div>
      </div>
    </div>
  );
};

export default Home;