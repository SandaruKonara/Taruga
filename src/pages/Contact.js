import React, { useState } from "react";
import "./Contact.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [showPopup, setShowPopup] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }
    if (!formData.subject.trim()) {
      errors.subject = "Subject is required";
    }
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }
    return errors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (formErrors[e.target.name]) {
      setFormErrors({ ...formErrors, [e.target.name]: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    
    if (Object.keys(errors).length === 0) {
      // Form is valid, process submission
      console.log("Form submitted:", formData);
      setShowPopup(true);
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    } else {
      setFormErrors(errors);
    }
  };

  return (
    <div className="contact-container">
      {showPopup && (
        <div className="success-popup">
          <div className="popup-content">
            <i className="fas fa-check-circle"></i>
            <h3>Thank You!</h3>
            <p>Your message has been sent successfully.</p>
            <button 
                className="ok-button"
                onClick={() => setShowPopup(false)}
            >
                OK
            </button>
          </div>
        </div>
      )}
      <div className="contact-content">
        <div className="contact-info">
          <h1>Contact Us</h1>
          
          <div className="contact-details">
            
            <div className="contact-item">
              <i className="fas fa-phone"></i>
              <div>
                <h3>Phone</h3>
                <p>+358 417 241 555</p>
              </div>
            </div>
            <div className="contact-item">
              <i className="fas fa-envelope"></i>
              <div>
                <h3>Email</h3>
                <p>info@taruga.fi</p>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className={formErrors.name ? "error" : ""}
            />
            {formErrors.name && <span className="error-message">{formErrors.name}</span>}
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className={formErrors.email ? "error" : ""}
            />
            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              value={formData.subject}
              onChange={handleChange}
              className={formErrors.subject ? "error" : ""}
            />
            {formErrors.subject && <span className="error-message">{formErrors.subject}</span>}
          </div>
          <div className="form-group">
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className={formErrors.message ? "error" : ""}
            ></textarea>
            {formErrors.message && <span className="error-message">{formErrors.message}</span>}
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
