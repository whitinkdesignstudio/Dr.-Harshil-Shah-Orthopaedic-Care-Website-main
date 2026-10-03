import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [galleryDropdownOpen, setGalleryDropdownOpen] = useState(false);
  const [mobileGalleryOpen, setMobileGalleryOpen] = useState(false);
  const [brochureDropdownOpen, setBrochureDropdownOpen] = useState(false);
  const [mobileBrochureOpen, setMobileBrochureOpen] = useState(false);
  const location = useLocation();

  const galleryRef = useRef(null);
  const brochureRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (galleryRef.current && !galleryRef.current.contains(e.target)) {
        setGalleryDropdownOpen(false);
      }
      if (brochureRef.current && !brochureRef.current.contains(e.target)) {
        setBrochureDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateHeader = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
    };

    const handleScrollOrResize = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        updateHeader();
        rafId = null;
      });
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize, { passive: true });
    updateHeader();

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setGalleryDropdownOpen(false);
    setMobileGalleryOpen(false);
    setBrochureDropdownOpen(false);
    setMobileBrochureOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}
        id="site-header"
      >
        <div className="shell nav-wrap">
          {/* FAR LEFT: Brand Logo */}
          <Link to="/" className="brand" aria-label="Dr. Harshil Shah - Home">
            <img
              src="/logo.png"
              alt="Dr. Harshil Shah - M.S Orthopaedic, FIJR, FIAS"
              className="brand-logo-img"
            />
          </Link>

          {/* CENTER: Desktop Navigation Menu */}
          <nav className="desktop-nav" aria-label="Primary navigation">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'active' : '')}
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              About
            </NavLink>
            <NavLink
              to="/treatments"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              Treatments
            </NavLink>

            {/* Gallery Dropdown */}
            <div className="nav-dropdown-item nav-gallery-dropdown" ref={galleryRef}>
              <button
                type="button"
                className={`nav-dropdown-trigger nav-gallery-btn ${galleryDropdownOpen ? 'active' : ''} ${location.pathname === '/gallery' ? 'active' : ''}`}
                onClick={() => setGalleryDropdownOpen((prev) => !prev)}
                aria-expanded={galleryDropdownOpen}
              >
                Gallery
                <svg className={`nav-arrow-icon ${galleryDropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              <div className={`nav-dropdown-menu nav-gallery-menu ${galleryDropdownOpen ? 'is-visible' : ''}`}>

                <Link to="/operation-theatre" className="nav-dropdown-link" onClick={() => setGalleryDropdownOpen(false)}>

                  <div>
                    <strong>Surgical &amp; OT Videos</strong>
                  </div>
                  <span className="dropdown-dl-tag" style={{ background: '#146c72', color: '#ffffff', fontWeight: 800 }}>VIDEOS</span>
                </Link>
                <Link to="/gallery" className="nav-dropdown-link" onClick={() => setGalleryDropdownOpen(false)}>
                  <div>
                    <strong>All Moments</strong>
                  </div>
                </Link>

              </div>
            </div>

            {/* Brochure Dropdown */}
            <div
              className="nav-dropdown-item nav-brochure-dropdown"
              ref={brochureRef}
              onMouseEnter={() => setBrochureDropdownOpen(true)}
              onMouseLeave={() => setBrochureDropdownOpen(false)}
            >
              <NavLink
                to="/brochures"
                className={({ isActive }) => `nav-dropdown-trigger nav-brochure-btn ${brochureDropdownOpen ? 'active' : ''} ${isActive ? 'active' : ''}`}
              >
                Brochure
                <svg className={`nav-arrow-icon ${brochureDropdownOpen ? 'open' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </NavLink>

              <div className={`nav-dropdown-menu nav-brochure-menu ${brochureDropdownOpen ? 'is-visible' : ''}`}>
                <a
                  href="/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBrochureDropdownOpen(false)}
                  className="nav-dropdown-link"
                >
                  <div>
                    <strong>Knee Replacement Guide</strong>
                  </div>
                  <span className="dropdown-dl-tag">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBrochureDropdownOpen(false)}
                  className="nav-dropdown-link"
                >
                  <div>
                    <strong>Hip Replacement Guide</strong>
                  </div>
                  <span className="dropdown-dl-tag">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBrochureDropdownOpen(false)}
                  className="nav-dropdown-link"
                >
                  <div>
                    <strong>Knee Sports Injury Guide</strong>
                  </div>
                  <span className="dropdown-dl-tag">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setBrochureDropdownOpen(false)}
                  className="nav-dropdown-link"
                >
                  <div>
                    <strong>Shoulder Arthroscopy Guide</strong>
                  </div>
                  <span className="dropdown-dl-tag">PDF</span>
                </a>
              </div>
            </div>
            <NavLink
              to="/faq"
              className={({ isActive }) => (isActive ? 'active' : '')}
            >
              FAQs
            </NavLink>
          </nav>

          {/* FAR RIGHT: Book Appointment Button */}
          <Link className="button button-small nav-cta" to="/appointment">
            <span className="nav-cta-full">Book an Appointment</span>
            <span className="nav-cta-short">Book</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="mobile-menu-btn"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--line)',
              width: '44px',
              height: '44px',
              borderRadius: '8px',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '5px',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
            id="mobile-nav-toggle"
          >
            <span style={{ background: 'var(--ink)', width: '20px', height: '2px', display: 'block' }}></span>
            <span style={{ background: 'var(--ink)', width: '20px', height: '2px', display: 'block' }}></span>
            <span style={{ background: 'var(--ink)', width: '20px', height: '2px', display: 'block' }}></span>
          </button>
        </div>
      </header>

      {/* Mobile Drawer & Backdrop */}
      <div
        className={`mobile-nav-backdrop ${mobileMenuOpen ? 'is-open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      />
      <aside
        className={`mobile-menu-drawer ${mobileMenuOpen ? 'is-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <button
          type="button"
          className="mobile-menu-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          ✕
        </button>

        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <img
            src="/logo.png"
            alt="Dr. Harshil Shah"
            className="brand-logo-img brand-logo-drawer"
          />
        </div>

        <nav className="mobile-nav-links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
            Home <span>→</span>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'active' : '')}>
            About <span>→</span>
          </NavLink>
          <NavLink to="/treatments" className={({ isActive }) => (isActive ? 'active' : '')}>
            Treatments <span>→</span>
          </NavLink>

          <div className="mobile-nav-accordion">
            <button
              type="button"
              className={`mobile-nav-accordion-trigger ${mobileGalleryOpen ? 'open' : ''} ${location.pathname === '/gallery' ? 'active' : ''}`}
              onClick={() => setMobileGalleryOpen((prev) => !prev)}
            >
              <span>Gallery</span>
              <svg className={`mobile-chevron ${mobileGalleryOpen ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mobileGalleryOpen && (
              <div className="mobile-nav-sublinks">
                <Link to="/operation-theatre" onClick={() => setMobileMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#146c72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <polygon points="10 8 16 12 10 16 10 8" fill="#146c72" />
                  </svg>
                  <span>Surgical &amp; OT Videos</span>
                  <span className="mobile-pdf-pill" style={{ background: '#146c72', color: '#fff' }}>VIDEOS</span>
                </Link>
                <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#146c72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                  <span>All Moments</span>
                </Link>

              </div>
            )}
          </div>

          <div className="mobile-nav-accordion">
            <button
              type="button"
              className={`mobile-nav-accordion-trigger ${mobileBrochureOpen ? 'open' : ''} ${location.pathname === '/brochures' ? 'active' : ''}`}
              onClick={() => setMobileBrochureOpen((prev) => !prev)}
            >
              <span>Brochures (PDF)</span>
              <svg className={`mobile-chevron ${mobileBrochureOpen ? 'rotated' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {mobileBrochureOpen && (
              <div className="mobile-nav-sublinks">
                <Link
                  to="/brochures"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  All Patient Brochures <span className="mobile-pdf-pill" style={{ background: '#146c72', color: '#fff' }}>VIEW</span>
                </Link>
                <a
                  href="/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Knee Replacement Guide <span className="mobile-pdf-pill">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Hip Replacement Guide <span className="mobile-pdf-pill">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Knee Sports Injury Guide <span className="mobile-pdf-pill">PDF</span>
                </a>
                <a
                  href="/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Shoulder Arthroscopy Guide <span className="mobile-pdf-pill">PDF</span>
                </a>
              </div>
            )}
          </div>

          <NavLink to="/faq" className={({ isActive }) => (isActive ? 'active' : '')}>
            FAQs <span>→</span>
          </NavLink>
          <NavLink to="/appointment" className="mobile-cta-btn">
            Book an Appointment
          </NavLink>
        </nav>
      </aside>
    </>
  );
}
