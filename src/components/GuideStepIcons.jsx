import React from 'react';

/**
 * Custom SVG Logos designed to match the user's reference image exactly:
 * - Soft mint/teal circular background (#e5f4f4 / #e0f2f1)
 * - Medical teal iconography (#10847e)
 */

export function ClipboardCheckLogo({ className = "pg-step-svg-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Before Treatment Checklist Logo"
    >
      {/* Soft circular background badge */}
      <circle cx="32" cy="32" r="30" fill="#e5f4f4" />

      {/* Clipboard Body */}
      <rect
        x="20"
        y="17"
        width="24"
        height="33"
        rx="3.5"
        stroke="#10847e"
        strokeWidth="2.4"
        fill="#ffffff"
      />

      {/* Top Clip */}
      <path
        d="M26 17V15C26 13.8954 26.8954 13 28 13H36C37.1046 13 38 13.8954 38 15V17"
        stroke="#10847e"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="15.5" r="1.2" fill="#10847e" />

      {/* Checklist items: Checkmark + Line */}
      {/* Row 1 */}
      <path
        d="M24 25.5L26.5 28L30 24"
        stroke="#10847e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="33" y1="26" x2="39" y2="26" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />

      {/* Row 2 */}
      <path
        d="M24 32.5L26.5 35L30 31"
        stroke="#10847e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="33" y1="33" x2="39" y2="33" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />

      {/* Row 3 */}
      <path
        d="M24 39.5L26.5 42L30 38"
        stroke="#10847e"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line x1="33" y1="40" x2="39" y2="40" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function HospitalLogo({ className = "pg-step-svg-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hospital Clinic Logo"
    >
      {/* Soft circular background badge */}
      <circle cx="32" cy="32" r="30" fill="#e5f4f4" />

      {/* Main Ground Line */}
      <line x1="16" y1="48" x2="48" y2="48" stroke="#10847e" strokeWidth="2.2" strokeLinecap="round" />

      {/* Left Wing */}
      <rect
        x="18"
        y="29"
        width="8"
        height="19"
        rx="1"
        stroke="#10847e"
        strokeWidth="2.2"
        fill="#ffffff"
      />
      <line x1="22" y1="33" x2="22" y2="34" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="38" x2="22" y2="39" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="43" x2="22" y2="44" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />

      {/* Right Wing */}
      <rect
        x="38"
        y="29"
        width="8"
        height="19"
        rx="1"
        stroke="#10847e"
        strokeWidth="2.2"
        fill="#ffffff"
      />
      <line x1="42" y1="33" x2="42" y2="34" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="38" x2="42" y2="39" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="43" x2="42" y2="44" stroke="#10847e" strokeWidth="2" strokeLinecap="round" />

      {/* Center Building */}
      <rect
        x="25"
        y="21"
        width="14"
        height="27"
        rx="1.5"
        stroke="#10847e"
        strokeWidth="2.2"
        fill="#ffffff"
      />

      {/* Top Cross Badge */}
      <rect x="27.5" y="16.5" width="9" height="9" rx="1.5" fill="#10847e" />
      <path
        d="M32 18.5V23.5M29.5 21H34.5"
        stroke="#ffffff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Center Windows: 2x2 grid */}
      <rect x="28.5" y="27" width="2.4" height="2.4" rx="0.5" fill="#10847e" />
      <rect x="33.1" y="27" width="2.4" height="2.4" rx="0.5" fill="#10847e" />
      <rect x="28.5" y="31.5" width="2.4" height="2.4" rx="0.5" fill="#10847e" />
      <rect x="33.1" y="31.5" width="2.4" height="2.4" rx="0.5" fill="#10847e" />

      {/* Main Entrance Door */}
      <path
        d="M29.5 48V42C29.5 40.6193 30.6193 39.5 32 39.5C33.3807 39.5 34.5 40.6193 34.5 42V48"
        fill="#10847e"
      />
    </svg>
  );
}

export function StethoscopeLogo({ className = "pg-step-svg-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Stethoscope Logo"
    >
      {/* Soft circular background badge */}
      <circle cx="32" cy="32" r="30" fill="#e5f4f4" />

      {/* Earpieces */}
      <path
        d="M22 23V20C22 18.3431 23.3431 17 25 17"
        stroke="#10847e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="22" cy="23" r="1.5" fill="#10847e" />

      <path
        d="M32 23V20C32 18.3431 30.6569 17 29 17"
        stroke="#10847e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="32" cy="23" r="1.5" fill="#10847e" />

      {/* U-Shape Binaural Tube */}
      <path
        d="M22 23V29C22 32.866 25.134 36 29 36C32.866 36 36 32.866 36 29V23"
        stroke="#10847e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Connector and Flexible Tube curving down and right */}
      <path
        d="M29 36V39C29 43.4183 32.5817 47 37 47C41.4183 47 45 43.4183 45 39V35"
        stroke="#10847e"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Chestpiece / Diaphragm */}
      <circle cx="45" cy="33" r="4.5" stroke="#10847e" strokeWidth="2.4" fill="#ffffff" />
      <circle cx="45" cy="33" r="2" fill="#10847e" />
    </svg>
  );
}

export function MedicineLogo({ className = "pg-step-svg-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Medicine and Tablet Logo"
    >
      {/* Soft circular background badge */}
      <circle cx="32" cy="32" r="30" fill="#e5f4f4" />

      {/* Diagonal Capsule Pill */}
      <g transform="translate(14, 15) rotate(-35 15 15)">
        <rect
          x="10"
          y="3"
          width="13"
          height="28"
          rx="6.5"
          fill="#10847e"
        />
        {/* Capsule highlight / divider line */}
        <line
          x1="10"
          y1="17"
          x2="23"
          y2="17"
          stroke="#ffffff"
          strokeWidth="1.8"
        />
      </g>

      {/* Round Tablet with cross score */}
      <g transform="translate(35, 33)">
        <circle cx="7" cy="7" r="7" stroke="#10847e" strokeWidth="2.2" fill="#ffffff" />
        <line x1="7" y1="2" x2="7" y2="12" stroke="#10847e" strokeWidth="1.8" strokeLinecap="round" />
        <line x1="2" y1="7" x2="12" y2="7" stroke="#10847e" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  );
}

export function CalendarLogo({ className = "pg-step-svg-icon" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Calendar Follow-up Logo"
    >
      {/* Soft circular background badge */}
      <circle cx="32" cy="32" r="30" fill="#e5f4f4" />

      {/* Calendar Outer Body */}
      <rect
        x="19"
        y="19"
        width="26"
        height="28"
        rx="4"
        stroke="#10847e"
        strokeWidth="2.4"
        fill="#ffffff"
      />

      {/* Calendar Top Solid Header Bar */}
      <path
        d="M19.5 26.5H44.5"
        stroke="#10847e"
        strokeWidth="2"
      />
      <path
        d="M21 21C21 20 22 19 23 19H41C42 19 43 20 43 21V26H21V21Z"
        fill="#10847e"
      />

      {/* Hanging Hooks */}
      <line x1="25" y1="15" x2="25" y2="21" stroke="#10847e" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="39" y1="15" x2="39" y2="21" stroke="#10847e" strokeWidth="2.4" strokeLinecap="round" />

      {/* Grid of Days (6 dots/squares) */}
      <rect x="23.5" y="30.5" width="3" height="3" rx="0.6" fill="#10847e" />
      <rect x="30.5" y="30.5" width="3" height="3" rx="0.6" fill="#10847e" />
      <rect x="37.5" y="30.5" width="3" height="3" rx="0.6" fill="#10847e" />

      <rect x="23.5" y="36.5" width="3" height="3" rx="0.6" fill="#10847e" />
      <rect x="30.5" y="36.5" width="3" height="3" rx="0.6" fill="#10847e" />
      <rect x="37.5" y="36.5" width="3" height="3" rx="0.6" fill="#10847e" />
    </svg>
  );
}

