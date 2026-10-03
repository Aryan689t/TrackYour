import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ initialMode = 'login' }) {
  const location = useLocation();
  const navigate = useNavigate();

  // Mode: 'login' | 'register'
  const isRegisterParam = location.pathname.toLowerCase().includes('register') || initialMode === 'register';
  const [mode, setMode] = useState(isRegisterParam ? 'register' : 'login');

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    identifier: '',
    password: '',
    confirmPassword: '',
    rememberMe: true,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null); // { type: 'success' | 'error' | 'info', text: string }

  // Forgot password dialog state
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Theme support (Obsidian / Mono)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('trackyour-theme') || 'obsidian';
    } catch {
      return 'obsidian';
    }
  });

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
    try {
      localStorage.setItem('trackyour-theme', newTheme);
    } catch {}
  };

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  // Sync mode if route changes
  useEffect(() => {
    if (location.pathname.toLowerCase().includes('register')) {
      setMode('register');
    } else if (location.pathname.toLowerCase().includes('login')) {
      setMode('login');
    }
  }, [location.pathname]);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    validateField(field, formData[field]);
  };

  // Frontend Validation Logic
  const validateField = (field, value) => {
    let err = '';

    if (field === 'identifier') {
      if (!value.trim()) {
        err = 'Email or username is required.';
      } else if (value.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        err = 'Please enter a valid email address.';
      }
    }

    if (field === 'name' && mode === 'register') {
      if (!value.trim()) {
        err = 'Full name is required.';
      }
    }

    if (field === 'password') {
      if (!value) {
        err = 'Password is required.';
      } else if (value.length < 6) {
        err = 'Password must be at least 6 characters.';
      }
    }

    if (field === 'confirmPassword' && mode === 'register') {
      if (!value) {
        err = 'Please confirm your password.';
      } else if (value !== formData.password) {
        err = 'Passwords do not match.';
      }
    }

    setErrors((prev) => {
      if (!err) {
        const next = { ...prev };
        delete next[field];
        return next;
      }
      return { ...prev, [field]: err };
    });

    return !err;
  };

  const validateAll = () => {
    const newErrors = {};

    if (mode === 'register' && !formData.name.trim()) {
      newErrors.name = 'Full name is required.';
    }

    if (!formData.identifier.trim()) {
      newErrors.identifier = 'Email or username is required.';
    } else if (formData.identifier.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.identifier)) {
      newErrors.identifier = 'Please enter a valid email address.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (mode === 'register') {
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password.';
      } else if (formData.confirmPassword !== formData.password) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    setErrors(newErrors);
    setTouched({
      name: true,
      identifier: true,
      password: true,
      confirmPassword: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler (Pure Frontend Demo)
 const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("HANDLE SUBMIT HIT");

    setStatusMessage(null);

    const isValid = validateAll();

    if (!isValid) return;

    // For now, only connect the Login mode
    if (mode !== "login") {
        setStatusMessage({
            type: "info",
            text: "Registration will be connected next."
        });
        return;
    }

    setIsLoading(true);

    try {
        const response = await fetch("/api/students/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: formData.identifier,
                password: formData.password
            })
        });

        const data = await response.json();

        console.log("LOGIN RESPONSE:", data);

        if (!response.ok) {
            setStatusMessage({
                type: "error",
                text: data.error || "Login failed."
            });
            return;
        }

        localStorage.setItem("token", data.token);

        setStatusMessage({
            type: "success",
            text: "Login successful!"
        });
navigate("/");
    } catch (error) {
        console.error("LOGIN ERROR:", error);

        setStatusMessage({
            type: "error",
            text: "Unable to connect to the server."
        });

    } finally {
        setIsLoading(false);
    }
};
   
  // Quick Demo Auto-fill Helper
  const handleFillDemo = () => {
    setFormData({
      name: 'Aryan Sharma',
      identifier: 'aryan@trackyour.dev',
      password: 'password123',
      confirmPassword: 'password123',
      rememberMe: true,
    });
    setErrors({});
    setStatusMessage({
      type: 'info',
      text: 'Demo credentials loaded. Click "Sign In" to test validation.',
    });
  };

  // Handle Forgot Password Demo
  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
  };

  return (
    <div className="auth-page-root">
      {/* Ambient background decoration */}
      <div className="auth-bg-grid" />
      <div className="auth-ambient-glow" />

      {/* Top Header Bar */}
      <header className="auth-top-bar">
        <Link to="/" className="auth-nav-link">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          <span>Back to Dashboard</span>
        </Link>

        {/* Theme Switcher */}
        <div className="auth-theme-switch" role="group" aria-label="Theme selector">
          <button
            type="button"
            className={`theme-toggle-pill ${theme === 'obsidian' ? 'active' : ''}`}
            onClick={() => handleThemeChange('obsidian')}
            title="Obsidian Dark"
          >
            <span>◐</span>
            <span>Obsidian</span>
          </button>
          <button
            type="button"
            className={`theme-toggle-pill ${theme === 'mono' ? 'active' : ''}`}
            onClick={() => handleThemeChange('mono')}
            title="Mono Light"
          >
            <span>◑</span>
            <span>Mono</span>
          </button>
        </div>
      </header>

      {/* Main Centered Login Section */}
      <main className="auth-main-container">
        <div className="auth-card-wrapper">
          <div className="auth-card">
            {/* Brand Logo & Header */}
            <div className="auth-card-header">
              <div className="auth-brand-badge-row">
                <span className="auth-brand-title">
                  Track<span className="brand-accent">Your</span>
                </span>
                <span className="brand-badge">v1.0</span>
              </div>
              <h1 className="auth-title">
                {mode === 'login' ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="auth-subtitle">
                {mode === 'login'
                  ? 'Sign in to access your academics, DSA roadmap & projects'
                  : 'Get started with your personal engineering tracking workspace'}
              </p>
            </div>

            {/* Demo Quick-Fill Helper Banner */}
            <div className="auth-demo-banner">
              <div className="auth-demo-text">
                <span><strong>Developer Demo</strong></span>
                <span className="auth-demo-code">aryan@trackyour.dev ••••••••</span>
              </div>
              <button
                type="button"
                className="btn-demo-fill"
                onClick={handleFillDemo}
              >
                Auto Fill
              </button>
            </div>

            {/* Status Feedback Banner */}
            {statusMessage && (
              <div className={`auth-message-banner auth-message-${statusMessage.type}`}>
                <span>{statusMessage.text}</span>
              </div>
            )}

            {/* Form */}
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
              {/* Full Name Field (Register Mode only) */}
              {mode === 'register' && (
                <div className="auth-field">
                  <div className="auth-label-row">
                    <label className="auth-label" htmlFor="auth-name">
                      Full Name
                    </label>
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </span>
                    <input
                      id="auth-name"
                      name="name"
                      type="text"
                      className={`auth-input-field ${touched.name && errors.name ? 'input-error' : ''}`}
                      placeholder="Aryan Sharma"
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={() => handleBlur('name')}
                      disabled={isLoading}
                    />
                  </div>
                  {touched.name && errors.name && (
                    <span className="auth-field-error">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {errors.name}
                    </span>
                  )}
                </div>
              )}

              {/* Email / Username Field */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-label" htmlFor="auth-identifier">
                    Email or Username
                  </label>
                </div>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <input
                    id="auth-identifier"
                    name="identifier"
                    type="text"
                    autoComplete="username"
                    className={`auth-input-field ${touched.identifier && errors.identifier ? 'input-error' : ''}`}
                    placeholder="aryan@trackyour.dev or aryan"
                    value={formData.identifier}
                    onChange={handleChange}
                    onBlur={() => handleBlur('identifier')}
                    disabled={isLoading}
                  />
                </div>
                {touched.identifier && errors.identifier && (
                  <span className="auth-field-error">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {errors.identifier}
                  </span>
                )}
              </div>

              {/* Password Field */}
              <div className="auth-field">
                <div className="auth-label-row">
                  <label className="auth-label" htmlFor="auth-password">
                    Password
                  </label>
                  {mode === 'login' && (
                    <button
                      type="button"
                      className="auth-forgot-link"
                      onClick={() => {
                        setForgotSent(false);
                        setForgotEmail(formData.identifier.includes('@') ? formData.identifier : '');
                        setForgotModalOpen(true);
                      }}
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="auth-input-wrapper">
                  <span className="auth-input-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </span>
                  <input
                    id="auth-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className={`auth-input-field has-trailing ${touched.password && errors.password ? 'input-error' : ''}`}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur('password')}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    className="auth-input-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                {touched.password && errors.password && (
                  <span className="auth-field-error">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password Field (Register Mode only) */}
              {mode === 'register' && (
                <div className="auth-field">
                  <div className="auth-label-row">
                    <label className="auth-label" htmlFor="auth-confirm-password">
                      Confirm Password
                    </label>
                  </div>
                  <div className="auth-input-wrapper">
                    <span className="auth-input-icon">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <input
                      id="auth-confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      autoComplete="new-password"
                      className={`auth-input-field has-trailing ${touched.confirmPassword && errors.confirmPassword ? 'input-error' : ''}`}
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      onBlur={() => handleBlur('confirmPassword')}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="auth-input-toggle-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                    >
                      {showConfirmPassword ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <span className="auth-field-error">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                      </svg>
                      {errors.confirmPassword}
                    </span>
                  )}
                </div>
              )}

              {/* Remember Me Checkbox */}
              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    name="rememberMe"
                    className="auth-checkbox-input"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    disabled={isLoading}
                  />
                  <span>Remember this device for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-primary auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="auth-spinner" />
                    <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
                  </>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In to TrackYour' : 'Create Account'}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="auth-divider">
              <span>or continue with</span>
            </div>

            {/* Social / SSO Alternative Mock Buttons */}
            <div className="auth-social-grid">
              <button
                type="button"
                className="auth-social-btn"
                onClick={() =>
                  setStatusMessage({
                    type: 'info',
                    text: 'OAuth demo: GitHub sign-in frontend placeholder.',
                  })
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>GitHub</span>
              </button>

              <button
                type="button"
                className="auth-social-btn"
                onClick={() =>
                  setStatusMessage({
                    type: 'info',
                    text: 'OAuth demo: Google sign-in frontend placeholder.',
                  })
                }
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                <span>Google</span>
              </button>
            </div>

            {/* Switch Mode Footer */}
            <div className="auth-card-footer">
              {mode === 'login' ? (
                <span>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-mode-btn"
                    onClick={() => {
                      setMode('register');
                      setErrors({});
                      setStatusMessage(null);
                    }}
                  >
                    Create account
                  </button>
                </span>
              ) : (
                <span>
                  Already have an account?{' '}
                  <button
                    type="button"
                    className="auth-switch-mode-btn"
                    onClick={() => {
                      setMode('login');
                      setErrors({});
                      setStatusMessage(null);
                    }}
                  >
                    Sign in
                  </button>
                </span>
              )}
            </div>
          </div>

          {/* Bottom Security / Privacy Meta */}
          <div className="auth-footer-meta">
            <span>Protected with end-to-end security architecture</span>
            <div className="auth-footer-links">
              <Link to="/" className="auth-footer-link">Overview</Link>
              <span>·</span>
              <Link to="/academics" className="auth-footer-link">Academics</Link>
              <span>·</span>
              <Link to="/Status" className="auth-footer-link">DSA Tracker</Link>
            </div>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="auth-dialog-backdrop" onClick={() => setForgotModalOpen(false)}>
          <div className="auth-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="auth-dialog-header">
              <h3 className="auth-dialog-title">Reset your password</h3>
              <button
                type="button"
                className="auth-dialog-close"
                onClick={() => setForgotModalOpen(false)}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {forgotSent ? (
              <div>
                <p className="auth-dialog-desc" style={{ color: '#34d399' }}>
                  ✓ If an account exists for <strong>{forgotEmail}</strong>, a password reset link has been dispatched (frontend simulation).
                </p>
                <div className="auth-dialog-actions">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <p className="auth-dialog-desc">
                  Enter your registered email address and we will send you password reset instructions.
                </p>
                <div className="auth-field" style={{ marginBottom: 16 }}>
                  <label className="auth-label" htmlFor="forgot-email">Email Address</label>
                  <input
                    id="forgot-email"
                    type="email"
                    className="input-standard"
                    placeholder="aryan@example.com"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="auth-dialog-actions">
                  <button
                    type="button"
                    className="btn-secondary"
                    onClick={() => setForgotModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
