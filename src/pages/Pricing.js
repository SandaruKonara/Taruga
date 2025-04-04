import React from "react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";  // Add this import
import "../styles/Pricing.css";
const Pricing = () => {
  // Updated pricing data based on the image
  const pricingData = [
    {
      plan: "WP Starter",
      price: "€699",
      description: "Landing Page",
      subDescription: "One page",
      features: [
        "Fast page loading",
        "Mobilization",
        "Monthly technical support"
      ],
      color: "#f0f0f0",
      isPopular: false,
      addOn: "Add On",
      hostingInfo: "Hosting: 4,99/mo",
      extraInfo: "Multilanguage and technical Domains and SSL",
      buttonType: "normal"
    },
    {
      plan: "WP Pro",
      price: "€1699",
      description: "Portfolio website",
      subDescription: "Company website",
      features: [
        "Four pages",
        "Fast page loading",
        "Mobilization",
        "Monthly technical support"
      ],
      color: "#f8b06c",
      isPopular: true,
      addOn: "Add On",
      hostingInfo: "Hosting: 9,99/mo",
      extraInfo: "Multilanguage and technical Domains and SSL",
      buttonType: "normal"
    },
    {
      plan: "WP Premium",
      price: "€2499",
      description: "Portfolio website",
      subDescription: "Company website Blog site",
      features: [
        "Seven pages",
        "Fast page loading",
        "Mobilization",
        "Monthly technical support"
      ],
      color: "#f0f0f0",
      isPopular: false,
      addOn: "Add On",
      hostingInfo: "Hosting: 9,99/mo",
      extraInfo: "Multilanguage and technical Domains and SSL",
      buttonType: "normal"
    },
    {
      plan: "WP Elite",
      price: "€3999",
      description: "Online store",
      subDescription: "Unlimited",
      features: [
        "Fast page loading",
        "Mobilization",
        "Monthly technical support"
      ],
      color: "#f8b06c",
      isPopular: false,
      addOn: "Add On",
      hostingInfo: "Hosting: 9,99/mo",
      extraInfo: "Multilanguage and technical Domains and SSL",
      buttonType: "request"
    }
  ];

  // Feature comparison data from the lower section of the image
  const comparisonData = [
    { feature: "Pages (Maximum)", starter: "1", pro: "4", premium: "7", elite: "Customization" },
    { feature: "Website", starter: "Landing Page", pro: "Portfolio website, Business website", premium: "Portfolio website, Business website, Blog website", elite: "Online store" },
    { feature: "Lightning fast page loading",  premium: true,  },
    { feature: "Mobile-friendly responsive design",  premium: true,  },
    { feature: "SEO-friendly setup",  premium: true,  },
    { feature: "Google Analytics and Google Search Console Integration",  premium: true,  },
    { feature: "Website Legal (GDPR)",  premium: true,  },
    { feature: "1 round of revisions",  premium: true,  },
    { feature: "Free support training session",  premium: true,  },
    { feature: "One month of ongoing technical support",   premium: true,  }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="pricing-container">
      {/* Pricing Header */}
      <div className="pricing-header">
        
      </div>
      
      {/* Pricing Cards */}
      <motion.div
        className="pricing-cards-container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {pricingData.map((plan, index) => (
          <motion.div
            key={index}
            className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
            variants={cardVariants}
            style={{ backgroundColor: plan.color }}
          >
           
            
            <div className="card-header">
              <h2 className="plan-name">{plan.plan}</h2>
              <div className="plan-price">{plan.price}</div>
              <div className="plan-description">{plan.description}</div>
              <div className="plan-sub-description">{plan.subDescription}</div>
            </div>
            
            <div className="card-body">
              <ul className="features-list">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="feature-item">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="card-footer">
              {plan.buttonType === "request" ? (
                <NavLink to="/contact" className="btn btn-primary">
                  Request a quote ➔
                </NavLink>
              ) : (
                <NavLink to="/contact" className="btn btn-outline">
                  {plan.addOn}
                </NavLink>
              )}
              
              <div className="hosting-info">{plan.hostingInfo}</div>
              <div className="extra-info">{plan.extraInfo}</div>
              <NavLink to="/contact" className="contact-link">Contact us</NavLink>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Feature Comparison Table */}
      <div className="comparison-container">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Features</th>
              <th>WP STARTER</th>
              <th>WP PRO</th>
              <th>WP PREMIUM</th>
              <th>WP ELITE</th>
            </tr>
          </thead>
          <tbody>
            {comparisonData.map((row, index) => (
              <tr key={index}>
                <td>{row.feature}</td>
                <td>
                  {typeof row.starter === "boolean" ? 
                    (row.starter ? <span className="check-icon">✓</span> : <span className="empty-icon">○</span>) : 
                    row.starter}
                </td>
                <td>
                  {typeof row.pro === "boolean" ? 
                    (row.pro ? <span className="check-icon orange">✓</span> : <span className="empty-icon">○</span>) : 
                    row.pro}
                </td>
                <td>
                  {typeof row.premium === "boolean" ? 
                    (row.premium ? <span className="check-icon orange">✓</span> : <span className="empty-icon">○</span>) : 
                    row.premium}
                </td>
                <td>
                  {typeof row.elite === "boolean" ? 
                    (row.elite ? <span className="check-icon orange">✓</span> : <span className="empty-icon">○</span>) : 
                    row.elite}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Hosting and Management Section */}
      <div className="hosting-section">
        <div className="hosting-card">
          <h2 className="hosting-title">Hosting and Management</h2>
          <Link to="/contact" className="btn btn-primary">
            Request a quote ➔
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Pricing;

