import { Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="landing-page">
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-pattern"></div>
      </div>

      <div className="hero-content">
        <div className="logo-section">
          <h1 className="logo">
            Track<span className="logo-accent">Your</span>(Prog)
          </h1>
          <p className="tagline">
            Your all-in-one productivity dashboard for CS students
          </p>
        </div>

        <div className="feature-cards">
          <Link to="/academics" className="feature-card">
            <div className="feature-icon academics-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c0 2 6 3 6 3s6-1 6-3v-5"/>
              </svg>
            </div>
            <h3 className="feature-title">Academics</h3>
            <p className="feature-desc">
              Track grades, manage semesters, and monitor your academic progress
            </p>
          </Link>

          <Link to="/Status" className="feature-card">
            <div className="feature-icon dsa-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6"/>
                <polyline points="8 6 2 12 8 18"/>
              </svg>
            </div>
            <h3 className="feature-title">DSA Tracker</h3>
            <p className="feature-desc">
              Master algorithms with our roadmap, track problems, and journal your journey
            </p>
          </Link>

          <Link to="/projects" className="feature-card">
            <div className="feature-icon projects-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="feature-title">Projects</h3>
            <p className="feature-desc">
              Showcase your work, track project milestones, and build your portfolio
            </p>
          </Link>

          <Link to="/network" className="feature-card">
            <div className="feature-icon network-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
            </div>
            <h3 className="feature-title">Network</h3>
            <p className="feature-desc">
              Connect with peers, find collaborators, and grow your professional network
            </p>
          </Link>
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">10K+</span>
            <span className="stat-label">Problems Tracked</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Projects Built</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">1K+</span>
            <span className="stat-label">Connections Made</span>
          </div>
        </div>

             
        </div>
      </div>
    
  );
}

export default App;
