import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import logoImage from '/images/Cover_pic.png';

const HomePage = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const handleEmployeeLogin = () => {
    // Redirect to employee portal in new tab
    window.open('http://127.0.0.1:5000/', '_blank');
  };

  const handleHRLogin = () => {
    // Redirect to HR dashboard in new tab
    window.open('http://localhost:3000/', '_blank');
  };

  const services = [
    {
      icon: 'fa-graduation-cap',
      title: 'Financial Education',
      description: 'Interactive learning modules that make financial literacy engaging and accessible for all employees.'
    },
    {
      icon: 'fa-gamepad',
      title: 'Gamified Learning',
      description: 'Learn through interactive games, challenges, and real-world scenarios that build practical money skills.'
    },
    {
      icon: 'fa-chart-line',
      title: 'Budget Planning',
      description: 'Tools and guidance to help employees create, manage, and optimize their personal budgets.'
    },
    {
      icon: 'fa-piggy-bank',
      title: 'Savings Strategies',
      description: 'Expert advice and tools to help employees build emergency funds and achieve their savings goals.'
    },
    {
      icon: 'fa-trophy',
      title: 'Progress Tracking',
      description: 'Monitor your financial wellness journey with levels, badges, and achievement milestones.'
    },
    {
      icon: 'fa-users',
      title: 'HR Analytics',
      description: 'Comprehensive insights for HR teams to track employee engagement and program effectiveness.'
    }
  ];

  return (
    <div className="homepage-container">
      {/* Header/Navbar */}
      <header className="homepage-header">
        <div className="header-content">
          <div className="logo-section">
            <a href="/" className="logo-link">
              <img src={logoImage} alt="Coverage Compass" className="logo-image" />
            </a>
          </div>
          <button className="btn-get-started" onClick={() => setShowLoginModal(true)}>
            Get Started <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h2 className="hero-title">Empower Your Financial Future</h2>
            <p className="hero-subtitle">
              A comprehensive wellness platform designed to help employees master their finances 
              through engaging, interactive learning experiences.
            </p>
            <button className="btn-hero" onClick={() => setShowLoginModal(true)}>
              Start Your Journey <i className="fa-solid fa-rocket"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="services-header">
          <h2>Our Services</h2>
          <p>Comprehensive tools and resources for financial wellness</p>
        </div>
        
        {/* Financial Wellness Education CTA */}
        <div className="wellness-education-cta">
          <div className="wellness-cta-content">
            <div className="wellness-cta-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="wellness-cta-text">
              <h3>Financial Wellness Education</h3>
              <p>Interactive learning platform to master your finances through games, scenarios, and real-world challenges</p>
            </div>
            <a 
              href="https://mohnish-dev.github.io/financial-wellness-app/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-wellness-education"
            >
              Start Learning <i className="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={`fa-solid ${service.icon}`}></i>
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Highlight Section */}
      <section className="features-section">
        <div className="feature-row">
          <div className="feature-content">
            <h2>Interactive Learning Experience</h2>
            <p>
              Say goodbye to boring financial education. Our platform uses gamification, 
              real-world scenarios, and interactive challenges to make learning about 
              money management fun and memorable.
            </p>
            <ul className="feature-list">
              <li><i className="fa-solid fa-check"></i> Maze navigation games</li>
              <li><i className="fa-solid fa-check"></i> Real-life scenario simulations</li>
              <li><i className="fa-solid fa-check"></i> Budget building tools</li>
              <li><i className="fa-solid fa-check"></i> Quiz-based learning</li>
            </ul>
          </div>
          <div className="feature-visual">
            <div className="stats-card">
              <div className="stat-item">
                <i className="fa-solid fa-star"></i>
                <h3>Level-Based</h3>
                <p>Progress System</p>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-trophy"></i>
                <h3>Achievement</h3>
                <p>Badges & Rewards</p>
              </div>
              <div className="stat-item">
                <i className="fa-solid fa-chart-bar"></i>
                <h3>Track Your</h3>
                <p>Financial Growth</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Transform Your Financial Future?</h2>
          <p>Join thousands of employees building better financial habits today.</p>
          <button className="btn-cta" onClick={() => setShowLoginModal(true)}>
            Get Started Now <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="footer-content">
          <div className="footer-logo">
            <img src="/images/Cover_pic.png" alt="Coverage Compass" className="footer-logo-image" />
          </div>
          <p className="footer-powered">Powered by AI | Built for Lincoln Financial Wellness</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal-overlay-login" onClick={() => setShowLoginModal(false)}>
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowLoginModal(false)}>
              <i className="fa-solid fa-times"></i>
            </button>
            <h2>Choose Login Type</h2>
            <p>Select how you'd like to access the platform</p>
            <div className="login-options">
              <button className="login-option" onClick={handleEmployeeLogin}>
                <div className="login-icon">
                  <i className="fa-solid fa-user"></i>
                </div>
                <h3>Employee Login</h3>
                <p>Access your financial wellness journey</p>
              </button>
              <button className="login-option" onClick={handleHRLogin}>
                <div className="login-icon">
                  <i className="fa-solid fa-user-tie"></i>
                </div>
                <h3>HR Login</h3>
                <p>Manage and monitor employee programs</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
