import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {

  const scrollToTop = () => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      document.documentElement.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      document.body.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };



  return (
    <footer className="footer">
      <div className="shell footer-grid">
        {/* Brand Col */}
        <div className="footer-brand">
          <Link to="/" className="brand-footer" aria-label="Dr. Harshil Shah - Home">
            <img
              src="/logo.png"
              alt="Dr. Harshil Shah - Orthopaedic Surgeon"
              className="footer-logo-img"
            />
          </Link>
          <p className="footer-brand-text">
            Specialist orthopaedic care dedicated to joint preservation, robotic knee &amp; hip replacement, and arthroscopy in Ahmedabad.
          </p>

          {/* Social Links Row in Footer */}
          <div className="footer-social-row" style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
            <a
              href="https://wa.me/917874904030"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#25d366' }}
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/drharshilshah_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285aeb 90%)' }}
            >
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/harshil-shah-45b730321/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#0a66c2' }}
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@drharshilshahh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              style={{ color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '34px', height: '34px', borderRadius: '50%', background: '#ff0000' }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Explore Col */}
        <div className="footer-nav-col footer-explore-col">
          <p className="footer-label">Explore</p>
          <Link to="/about">About Dr. Harshil Shah</Link>
          <Link to="/treatments">Treatments</Link>

          <Link to="/brochures">Patient brochures</Link>
          <Link to="/gallery">Case gallery</Link>
        </div>

        {/* Patient Help Col */}
        <div className="footer-nav-col footer-help-col">
          <p className="footer-label">Patient Help</p>
          <Link to="/appointment">Contact & Book Appointment</Link>
          <Link to="/faq">Common questions</Link>
        </div>

        {/* Contact Col */}
        <div className="footer-nav-col footer-contact-col">
          <p className="footer-label">Contact</p>
          <a
            className="footer-contact-address"
            href="https://maps.app.goo.gl/v94sN3JMwJMwKZYi6?g_st=iw"
            target="_blank"
            rel="noopener noreferrer"
            title="Open Curis Hospitals location in Google Maps"
          >
            <span className="footer-contact-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <span className="footer-contact-text">
              Curis Hospitals, Sindhubhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
            </span>
          </a>
          <a
            className="footer-contact-link"
            href="tel:+917874904030"
          >
            <span className="footer-contact-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </span>
            <span className="footer-contact-text">
              +91 78749 04030
            </span>
          </a>
          <a
            className="footer-contact-email"
            href="mailto:harshilshah199706@gmail.com"
          >
            <span className="footer-contact-icon">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </span>
            <span className="footer-contact-text">
              harshilshah199706@gmail.com
            </span>
          </a>

          {/* Timing & Emergency placed under email */}
          <span className="footer-hours-text" style={{ marginTop: '12px' }}>
            Mon – Sat: 10:00 AM – 1:00 PM &bull; 5:00 PM – 7:00 PM
          </span>
          <a
            href="tel:+917874904030"
            className="footer-emergency-link"
            title="Call +91 78749 04030 for emergency assistance"
            style={{ marginTop: '8px' }}
          >
            <span className="footer-emergency-pulse" aria-hidden="true"></span>
            <span>24 Hours Open for Emergency</span>
          </a>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Dr. Harshil Shah. All rights reserved.</span>
        <button
          type="button"
          onClick={scrollToTop}
          className="footer-back-to-top-btn"
          aria-label="Scroll back to top"
          title="Scroll back to top"
        >
          <span>Back to top</span>
        </button>
        <span>Medical information is for general education, not a diagnosis.</span>
      </div>
    </footer>
  );
}
