import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lottie from 'lottie-react';
import "./Services.css";
import websiteAnimation from '../images/Animation - 1743772306215.json';
import hostingAnimation from '../images/hosting.json';

const Services = () => {
  const [selectedService, setSelectedService] = useState('website-development');
  const [activeStep, setActiveStep] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    
    if (section) {
      setSelectedService(section);
      // Add a small delay to ensure component is fully rendered
      setTimeout(() => {
        const element = document.getElementById('services-section');
        if (element) {
          element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          // Force scroll position in case of any offset issues
          window.scrollTo({
            top: element.offsetTop - 100, // Adjust this value based on your navbar height
            behavior: 'smooth'
          });
        }
      }, 300); // Increased delay for better reliability
    }
  }, [location, selectedService]);

  const services = [
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'At Taruga, we specialize in crafting custom websites that bring your ideas to life. Whether you need a sleek corporate site, an engaging blog, or a dynamic e-commerce platform, our team is dedicated to building a strong digital presence that resonates with your audience. Our mission is to create websites that are not only visually appealing but also intuitive and user-friendly.',
      animation: websiteAnimation
    },
    {
      id: 'host-management',
      title: 'Host and Management',
      description: 'At Taruga, we offer comprehensive hosting and management services in addition to website development, tailored to your business needs. Our goal is to ensure that your website stays fast, secure, and up-to-date, so you can focus on growing your business while we take care of the technical details. With our reliable hosting solutions and proactive management, your digital presence is always in safe hands.',
      animation: hostingAnimation
    }
  ];

  const workSteps = [
    {
      id: 'step1',
      title: 'Discover you digital needs',
      description: 'We start by understanding your business, your goals, and your target audience. Through consultations and detailed questionnaires, we gather all the information you need to create a website that reflects your vision.',
      
    },
    {
      id: 'step2',
      title: 'Turning idea into action plans',
      description: 'Our team conducts thorough market research and competitor analysis to identify opportunities and create a strategy that helps you stand out.',
      
    },
    {
      id: 'step3',
      title: 'Creativity meets functionality',
      description: 'Our design process involves creating visually appealing layouts that reflect your brand identity. Once the design is approved, we develop the website using WordPress, ensuring it is responsive, fast, and SEO-friendly.',
      
    },
    {
      id: 'step4',
      title: 'Your voice or priority',
      description: 'After development, we present the site for your review. We incorporate your feedback and make changes to ensure the final product exceeds your expectations.',
     
    },
    {
      id: 'step5',
      title: 'Revealing your digital presence',
      description: 'Once the site is approved, it will be published and made visible. We also provide ongoing maintenance and support to keep the site up to date and running smoothly.',
      
    }
  ];

  const handleServiceClick = (serviceId) => {
    setSelectedService(serviceId);
  };

  const handleStepClick = (stepId) => {
    setActiveStep(activeStep === stepId ? null : stepId);
  };

  return (
    <div className="services-container">
      <section 
        className="services-section" 
        id="services-section"
        style={{ scrollMarginTop: '100px' }} // Add scroll margin for header offset
      >
        <h2>Services</h2>
        <div className="services-menu">
          {services.map(service => (
            <div
              key={service.id}
              className={`service-tab ${selectedService === service.id ? 'active' : ''}`}
              onClick={() => handleServiceClick(service.id)}
            >
              {service.title}
            </div>
          ))}
        </div>
        <div className="service-details-container">
          {services.map(service => (
            service.id === selectedService && (
              <div key={service.id} className="service-detail">
                <div className="service-content">
                  <div className="service-title">{service.title}</div>
                  <div className="service-description">{service.description}</div>
                </div>
                <div className="service-image">
                  <div className="image-overlay"></div>
                  {service.animation ? (
                    <Lottie 
                      animationData={service.animation}
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  ) : (
                    <img src={service.image} alt={service.title} />
                  )}
                </div>
              </div>
            )
          ))}
        </div>
      </section>

      <section className="work-section">
        <h2>How we Work</h2>
        <div className="work-process-container">
          {workSteps.map(step => (
            <div key={step.id} className="work-step">
              <div className="step-header">
                <h3>{step.title}</h3>
                <button 
                  className="expand-button"
                  onClick={() => handleStepClick(step.id)}
                >
                  {activeStep === step.id ? '−' : '+'}
                </button>
              </div>
              {activeStep === step.id && (
                <div className="step-content">
                  <div className="step-description">
                    <p>{step.description}</p>
                  </div>
                  
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="footer-section">
        <div className="tagline">
          <h2>Let's building the website of your dreams</h2>
        </div>
        <div className="contact-section">
          <a href="/contact" className="contact-button">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
