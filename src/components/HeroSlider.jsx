import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Link } from 'react-router-dom';

const SLIDES = [
  {
    id: 0,
    eyebrow: 'EXPERT ORTHOPAEDIC CARE',
    title: (
      <>
        Better Movement.<br />
        <span className="medical-hero-title-accent">A Healthier Tomorrow.</span>
      </>
    ),
    desc: 'Thoughtful care for sports injuries, arthroscopy, joint preservation and replacement — explained in simple terms, with your well-being at the centre.',
    primaryBtn: { text: 'Book Appointment', link: '/appointment' },
    secondaryBtn: { text: 'Explore Treatments', link: '/treatments' },
    highlights: [
      {
        title: 'Personalised',
        subtitle: 'Treatment Plans'
      },
      {
        title: 'Evidence-Based',
        subtitle: 'Approach'
      },
      {
        title: 'Focus on Long-Term',
        subtitle: 'Mobility'
      },
      {
        title: 'Compassionate Patient',
        subtitle: 'Care'
      }
    ],
    image: '/doctor-sir-hero.webp',
    alt: 'Dr. Harshil Shah - Orthopaedic Surgery & Joint Care',
    imgWidth: 1024,
    imgHeight: 989,
    imgClass: 'medical-doctor-img'
  },
  {
    id: 1,
    eyebrow: 'LESS PAIN • MORE POSSIBILITY',
    title: (
      <>
        Get Back to<br />
        <span className="medical-hero-title-accent">What You Love.</span>
      </>
    ),
    desc: 'Specialised care for joint pain, sports injuries and mobility issues — so you can move with confidence in everyday life.',
    primaryBtn: { text: 'Book Appointment', link: '/appointment' },
    secondaryBtn: { text: 'Explore Treatments', link: '/treatments' },
    highlights: [
      {
        title: 'Sports Injury',
        subtitle: 'Management'
      },
      {
        title: 'Arthroscopy & Joint',
        subtitle: 'Preservation'
      },
      {
        title: 'Joint Replacement',
        subtitle: 'Solutions'
      },
      {
        title: 'Rehabilitation &',
        subtitle: 'Recovery Support'
      }
    ],
    image: '/rehab-knee-hero.jpg',
    alt: 'Knee Joint Rehabilitation Runner',
    imgWidth: 2560,
    imgHeight: 998,
    imgClass: 'medical-rehab-img'
  }
];

export default function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const timerRef = useRef(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6500);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer]);

  const handlePrev = useCallback(() => {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
    startTimer();
  }, [startTimer]);

  const handleNext = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    startTimer();
  }, [startTimer]);

  return (
    <section className="medical-hero-section" id="hero">
      {/* Subtle Integrated Movement Curve */}
      <div className="medical-movement-track" aria-hidden="true">
        <svg viewBox="0 0 1400 360" fill="none" preserveAspectRatio="none" className="medical-movement-svg">
          <path
            d="M 120,240 C 340,240 480,280 620,190 C 720,120 820,110 980,160 C 1100,200 1240,150 1380,120"
            stroke="#146c72"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="5 5"
            opacity="0.22"
          />
        </svg>
      </div>

      {/* Full-bleed edge-to-edge hero wrapper with 2 slides */}
      <div className="medical-hero-shell">
        <div className="medical-slides-wrapper">
          {SLIDES.map((slide, idx) => (
            <div
              key={slide.id}
              className={`medical-hero-slide ${activeSlide === idx ? 'is-active' : ''}`}
            >
              <div className="medical-hero-layout">

                {/* Left Content Column */}
                <div className="medical-hero-content">
                  <div className="medical-hero-eyebrow">
                    <span className="medical-eyebrow-text">{slide.eyebrow}</span>
                    <span className="medical-eyebrow-rule" />
                  </div>

                  <h1 className="medical-hero-title">
                    {slide.title}
                  </h1>

                  <p className="medical-hero-desc">
                    {slide.desc}
                  </p>

                  <div className="medical-hero-actions">
                    <Link to={slide.primaryBtn.link} className="medical-btn-primary">
                      <span>{slide.primaryBtn.text}</span>
                    </Link>

                    <Link to={slide.secondaryBtn.link} className="medical-btn-secondary">
                      <span>{slide.secondaryBtn.text}</span>
                    </Link>
                  </div>

                  <div className="medical-hero-highlights">
                    {slide.highlights.map((item, hIdx) => (
                      <React.Fragment key={hIdx}>
                        <div className="medical-highlight-item">
                          {item.icon && (
                            <div className="medical-highlight-icon">
                              {item.icon}
                            </div>
                          )}
                          <div className="medical-highlight-text">
                            <span className="medical-highlight-line1">{item.title}</span>
                            <span className="medical-highlight-line2">{item.subtitle}</span>
                          </div>
                        </div>
                        {hIdx < slide.highlights.length - 1 && (
                          <div className="medical-highlight-divider" aria-hidden="true" />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* Right Visual Area */}
                <div className="medical-hero-visual">
                  <div className="medical-integrated-stage">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className={`medical-integrated-img ${slide.imgClass || ''}`}
                      loading="eager"
                      width={slide.imgWidth}
                      height={slide.imgHeight}
                    />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Centered Slider Navigation Controls: < ( • • ) > */}
      <div className="medical-hero-controls-bar">
        <button type="button" className="medical-ctrl-btn" onClick={handlePrev} aria-label="Previous slide">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="medical-ctrl-dots">
          {SLIDES.map((_, idx) => (
            <button
              key={idx}
              type="button"
              className={`medical-dot-item ${activeSlide === idx ? 'is-active' : ''}`}
              onClick={() => { setActiveSlide(idx); startTimer(); }}
              aria-label={`Show slide ${idx + 1}`}
            >
              <span className="medical-dot-bar" />
            </button>
          ))}
        </div>

        <button type="button" className="medical-ctrl-btn" onClick={handleNext} aria-label="Next slide">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Floating Bottom Stats Card in centered container */}
      <div className="shell medical-stats-shell">
        <div className="v2-floating-stats-wrapper medical-stats-wrapper">
          <div className="v2-stats-card">
            {/* Stat 1 */}
            <div className="v2-stat-box">
              <div className="v2-stat-info">
                <strong>15+</strong>
                <span className="v2-stat-title">Years of Experience</span>
                <span className="v2-stat-sub">In advanced orthopaedic care</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 2 */}
            <div className="v2-stat-box">
              <div className="v2-stat-info">
                <strong>5000+</strong>
                <span className="v2-stat-title">Happy Patients</span>
                <span className="v2-stat-sub">Trust us for better movement</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 3 */}
            <div className="v2-stat-box">
              <div className="v2-stat-info">
                <strong>2000+</strong>
                <span className="v2-stat-title">Successful Procedures</span>
                <span className="v2-stat-sub">Across joint & sports conditions</span>
              </div>
            </div>

            <div className="v2-stat-divider" />

            {/* Stat 4 */}
            <div className="v2-stat-box">
              <div className="v2-stat-info">
                <strong>98%</strong>
                <span className="v2-stat-title">Patient Satisfaction</span>
                <span className="v2-stat-sub">Because your recovery matters</span>
              </div>
            </div>
          </div>

          <div className="v2-stats-bottom-line">
            <span className="v2-line-dash" />
            <p>Trusted orthopaedic care in Ahmedabad. Precision, evidence, and patient-first.</p>
            <span className="v2-line-dash" />
          </div>
        </div>
      </div>
    </section>
  );
}
