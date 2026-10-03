import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function WelcomeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    // Show modal on first website visit (once per session)
    const hasSeenModal = sessionStorage.getItem('hasSeenWelcomeModal');
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // Auto-focus close button when modal opens (accessibility)
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Single keydown listener — stable, no recreation on isOpen change
  // Single keydown listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen((prev) => {
          if (prev) {
            sessionStorage.setItem('hasSeenWelcomeModal', 'true');
            return false;
          }
          return prev;
        });
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenWelcomeModal', 'true');
  };

  const handleBook = () => {
    handleClose();
    navigate('/appointment');
  };

  const handleKnowMore = () => {
    handleClose();
    navigate('/about');
  };

  if (!isOpen) return null;

  return (
    <div
      className="welcome-modal-overlay"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Welcome — Dr. Harshil Shah Orthopaedic Surgeon"
    >
      <div
        className="welcome-modal-card"
        onClick={(e) => e.stopPropagation()}
        aria-labelledby="welcome-modal-title"
        aria-describedby="welcome-modal-desc"
        tabIndex="-1"
      >
        {/* Close Button */}
        <button
          ref={closeButtonRef}
          className="welcome-modal-close"
          onClick={handleClose}
          aria-label="Close welcome modal"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Doctor Photo */}
        <div className="welcome-modal-visual">
          <img
            src={`${import.meta.env.BASE_URL}doctor-modal.webp`}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${import.meta.env.BASE_URL}doctor-modal.jpg`;
            }}
            alt="Dr. Harshil Shah - Orthopaedic Surgeon"
            className="welcome-modal-photo"
            loading="eager"
          />
        </div>

        {/* Right Side: Content & Action */}
        <div className="welcome-modal-content">
          {/* Header Area */}
          <div className="welcome-modal-header">
            <div className="welcome-kicker">ORTHOPAEDIC SURGEON</div>
            <h2 id="welcome-modal-title" className="welcome-title">
              Dr. Harshil Shah
            </h2>
            <p id="welcome-modal-desc" className="welcome-desc">
              Focused orthopaedic care for knee, hip and shoulder conditions with clear guidance from diagnosis through recovery.
              Focused on orthopaedic care for knee, hip and shoulder conditions with clear guidance from diagnosis through recovery.
            </p>
          </div>

          {/* 4 Feature Badges */}
          <div className="welcome-features-grid">
            <div className="welcome-feature-item">
              <div className="welcome-feature-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span>Expert<br />Consultation</span>
            </div>

            <div className="welcome-feature-item">
              <div className="welcome-feature-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 3v5a4.5 4.5 0 0 0 9 0V3M18 10a3 3 0 0 0-3 3v2a4 4 0 0 1-4 4h-.5m0 0A4.5 4.5 0 0 1 6 14.5V11M18 10a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
                </svg>
              </div>
              <span>Advanced<br />Treatment</span>
            </div>

            <div className="welcome-feature-item">
              <div className="welcome-feature-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <span>Patient-First<br />Care</span>
            </div>

            <div className="welcome-feature-item">
              <div className="welcome-feature-icon">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <path d="M10 16h4M12 14v4" />
                </svg>
              </div>
              <span>Book<br />Appointment<br />Easily</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="welcome-actions">
            <button className="welcome-btn-primary" onClick={handleBook} type="button">
              <span>Book an Appointment</span>
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <button className="welcome-btn-secondary" onClick={handleKnowMore} type="button">
              Know More
            </button>
          </div>

          {/* Stats Bar */}
          <div className="welcome-stats-bar">
            <div className="welcome-stat-col">
              <div className="welcome-stat-icon">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <div className="welcome-stat-text">
                <strong>5000+</strong>
                <span>Patients</span>
              </div>
            </div>

            <div className="welcome-stat-divider" />

            <div className="welcome-stat-col">
              <div className="welcome-stat-icon">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="4" />
                  <path d="M12 8v8M8 12h8" />
                </svg>
              </div>
              <div className="welcome-stat-text">
                <strong>Knee • Hip • Shoulder</strong>
                <span>Specialized Care</span>
              </div>
            </div>

            <div className="welcome-stat-divider" />

            <div className="welcome-stat-col">
              <div className="welcome-stat-icon">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="welcome-stat-text">
                <strong>Ahmedabad</strong>
                <span>Gujarat, India</span>
              </div>
            </div>
          </div>


        </div>

        {/* Floating Close Cross Button */}
        <button
          ref={closeButtonRef}
          className="welcome-modal-close"
          onClick={handleClose}
          aria-label="Close welcome modal"
          type="button"
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    </div>
  );
}

