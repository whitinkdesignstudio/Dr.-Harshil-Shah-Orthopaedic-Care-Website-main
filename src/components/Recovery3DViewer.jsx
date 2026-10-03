import React from 'react';
import { Link } from 'react-router-dom';

export default function Recovery3DViewer() {
  return (
    <Link
      to="/patient-guides#quiet-knee"
      className="recovery-showcase-card"
    >
      {/* Concentric Orbit Rings & Glowing Dots in Background */}
      <div className="recovery-concentric-ring ring-outer">
        <span className="orbit-dot dot-1" />
        <span className="orbit-dot dot-2" />
      </div>
      <div className="recovery-concentric-ring ring-inner" />

      {/* Central 3D Knee Model */}
      <div className="recovery-showcase-model">
        <div className="knee-ambient-shadow" />
        <img
          src="/knee-motion-v2.webp"
          alt="3D Knee Joint Anatomy Visualization"
          className="knee-showcase-img"
        />
      </div>

    </Link>
  );
}
