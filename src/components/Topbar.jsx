import React from 'react';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="shell topbar-inner">
        <div className="topbar-primary">
          <a href="tel:+917874904030" className="topbar-phone" title="Call +91 78749 04030">
            <span className="topbar-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7.1 3.8 4.8 5.1c-.7.4-1 1.2-.8 2 1.1 5.8 5.7 10.4 11.5 11.5.8.2 1.6-.1 2-.8l1.3-2.3-4-1.9-1.2 1.7a11.8 11.8 0 0 1-5-5L10.3 9 8.4 5Z" />
              </svg>
            </span>
            <span className="topbar-phone-text">+91 78749 04030</span>
          </a>
          <span className="topbar-divider" aria-hidden="true"></span>
          <a href="mailto:harshilshah199706@gmail.com" className="topbar-email" title="Email harshilshah199706@gmail.com">
            <span className="topbar-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3" y="5" width="18" height="14" rx="2.5" />
                <path d="m4.5 7 7.5 6 7.5-6" />
              </svg>
            </span>
            <span className="topbar-email-text">harshilshah199706@gmail.com</span>
          </a>
        </div>
        <div className="topbar-actions">
          <a
            href="https://share.google/MBpDzvqtecRuH4gf8"
            target="_blank"
            rel="noopener noreferrer"
            className="topbar-location"
            title="Garden, Pakwan cross road, near Bodakdev, Ahmedabad, Gujarat 380054 (Click to open Google Maps)"
          >
            <span className="topbar-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19 10c0 5-7 10-7 10S5 15 5 10a7 7 0 1 1 14 0Z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
            </span>
            <span className="topbar-location-text">Garden, Pakwan Cross Rd, Bodakdev, Ahmedabad - 380054</span>
          </a>
          <span className="topbar-dot"></span>
          <div className="topbar-social" aria-label="Social media">
            <a
              className="topbar-social-instagram"
              href="https://www.instagram.com/drharshilshah_/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dr Harshil Shah on Instagram"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
              </svg>
            </a>
            <a
              className="topbar-social-linkedin"
              href="https://www.linkedin.com/in/harshil-shah-45b730321/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dr Harshil Shah on LinkedIn"
            >
              <svg viewBox="0 0 24 24" width="13" height="13" fill="#ffffff">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              className="topbar-social-youtube"
              href="https://www.youtube.com/@drharshilshahh"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Dr Harshil Shah on YouTube"
            >
              <svg viewBox="0 0 24 24" width="15" height="15" fill="#ffffff">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
