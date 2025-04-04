import React, { useState } from 'react';
import "./Services.css";

const Services = () => {
  const [selectedService, setSelectedService] = useState('website-development');
  const [activeStep, setActiveStep] = useState(null);

  const services = [
    {
      id: 'website-development',
      title: 'Website Development',
      description: 'At Taruga, we specialize in crafting custom websites that bring your ideas to life. Whether you need a sleek corporate site, an engaging blog, or a dynamic e-commerce platform, our team is dedicated to building a strong digital presence that resonates with your audience. Our mission is to create websites that are not only visually appealing but also intuitive and user-friendly.',
      image: '/images/website-development.jpg'
    },
    {
      id: 'host-management',
      title: 'Host and Management',
      description: 'At Taruga, we provide comprehensive hosting and management services alongside website development, customized to meet your business needs. Our priority is to keep your website fast, secure, and always up-to-date, allowing you to focus on growing your business while we handle the technical aspects. With our reliable hosting solutions and proactive management, you can trust that your digital presence is in safe hands.',
      image: '/images/host-management.jpg'
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
      description: 'We create detailed wireframes and prototypes to visualize the structure and functionality of your website before development begins.',
      
    },
    {
      id: 'step4',
      title: 'Your voice or priority',
      description: 'Our designers and developers work together to create a visually stunning and fully functional website that meets all your requirements.',
     
    },
    {
      id: 'step5',
      title: 'Revealing your digital presence',
      description: 'Before launch, we conduct comprehensive testing to ensure your website works perfectly across all devices and browsers.',
      
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
      <section className="services-section">
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
                  <img src={service.image} alt={service.title} />
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
