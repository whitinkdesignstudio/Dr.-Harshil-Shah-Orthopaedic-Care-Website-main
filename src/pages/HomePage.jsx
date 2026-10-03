import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { faqData } from '../data/faqData';

const reviewsData = [
  {
    id: 1,
    name: "Rushabh Shah",
    sub: "Knee Replacement (TKR) • Google Review",
    text: "“Best surgeon for any orthopaedic treatment. He is very supportive and gives proper attention to every patient. I consulted him for my mother's right total knee replacement (TKR) surgery. Thanks to his excellent surgical skills, guidance, and post-op care, she recovered smoothly.”",
  },
  {
    id: 2,
    name: "Nilesh Patel",
    sub: "Orthopaedic Surgery • Google Review",
    text: "“Dr. Harshil shah ek behtareen orthopedic surgeon hain. Unhone meri surgery bahut safalta-purvak ki. Unka treatment aur nature dono hi bahut supportive hain.”",
  },
  {
    id: 3,
    name: "Himanshu K",
    sub: "Local Guide • Google Review",
    text: "“Best Orthopedic Surgeon at Lilavati Clinic Ahmedabad. Very knowledgeable and polite doctor. Gives sufficient time to understand problems and provides accurate diagnosis and treatment.”",
  },
  {
    id: 4,
    name: "Uma Santoki",
    sub: "Patient Care • Google Review",
    text: "“Best orthopaedic surgeon. Compassionate care, polite nature, and excellent expertise. Takes time to explain everything clearly and guides through recovery with patience. Thank you for your kind service.”",
  },
  {
    id: 5,
    name: "MAHENDRA PAREKH",
    sub: "Google Verified Review",
    text: "Dr Harshil shah is very nice doctor  to do operations and treatments also",
  },
  {
    id: 6,
    name: "Manish Agarwal",
    sub: "Google Verified Review",
    text: "Best doctor and best treatment Good facility happy",
  },
  {
    id: 7,
    name: "Parmar Sanjay",
    sub: "Google Verified Review",
    text: "Best doctor best treatment thank you sir my life changed",
  },
  {
    id: 8,
    name: "Bhavya Shah",
    sub: "Google Verified Review",
    text: "Best orthopaedic doctor in Ahmedabad",
  },
  {
    id: 9,
    name: "Nilesh Patel",
    sub: "Google Verified Review",
    text: "\"Dr. Harshil Shah is an excellent orthopedic surgeon. He performed my surgery very successfully. Both his treatment and nature are very supportive.",
  },
  {
    id: 10,
    name: "Vinod Kapadiya",
    sub: "Google Verified Review",
    text: "\"Very good work, Rdo. Harshil Shah has made me walk in just one month.. Many congratulations Rdo. Sir.. 🙏 …",
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  const prevReview = () => {
    setCurrentReviewIndex((prev) => (prev === 0 ? reviewsData.length - 1 : prev - 1));
  };

  const nextReview = () => {
    setCurrentReviewIndex((prev) => (prev === reviewsData.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 45) {
      nextReview();
    } else if (diff < -45) {
      prevReview();
    }
    setTouchStartX(null);
  };

  // Top featured FAQs directly from faqData (same as FaqPage)
  const homeFaqs = useMemo(() => {
    const featured = faqData.filter((item) => item.featured);
    return featured.length >= 4 ? featured.slice(0, 6) : faqData.slice(0, 6);
  }, []);

  return (
    <div className="mock-home">

      {/* =========================================================================
          1. HERO BANNER (With transparent-left hero image & doctor on right)
          ========================================================================= */}
      <section className="mock-hero" aria-label="Hero Banner">
        <div className="mock-hero-media">
          <img
            src="/a7675ee9-feed-4c23-a637-a0aaf4665117.jpeg"
            alt="Dr. Harshil Shah - Expert Orthopaedic Surgeon"
            className="mock-hero-full-image"
            loading="eager"
          />
        </div>
        <div className="mock-shell mock-hero-overlay">
          <div className="mock-hero-inner">
            <div className="mock-hero-left">
              <h1 className="mock-hero-title">
                <span className="mock-hero-line-1" style={{ color: '#000000' }}>Joint pain shouldn't keep you</span>
                <span className="mock-hero-line-2">from living your life.</span>
              </h1>
              <p className="mock-hero-desc">
Hi, I’m Dr. Harshil Shah. Whether you are dealing with persistent knee pain, a stiff shoulder, or a sports injury, I am here to help you get back to a comfortable, active life with the right care.              </p>

            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. CONDITIONS & CARE - CONDITIONS I TREAT (WITH EXACT MATCHING LOGOS)
          ========================================================================= */}
      <section className="mock-treatments-section" id="conditions" aria-label="Conditions I Treat">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
              <h2 className="mock-title">Care For Your Condition</h2>
            </div>
            <Link to="/treatments" className="mock-btn-outline mock-conditions-desktop-cta">
              <span>Explore All Treatments &rarr;</span>
            </Link>
          </div>

          <div className="mock-conditions-grid">
            {/* Card 1: Knee Pain & Arthritis */}
            <Link to="/treatments#knee" className="mock-condition-card">
              <div className="mock-condition-icon">
                <img
                  src="/icons/knee-pain.webp"
                  alt="Knee Pain & Arthritis"
                  className="mock-condition-icon-img is-knee-icon"
                  loading="lazy"
                />
              </div>
              <strong style={{ flexGrow: 0, marginBottom: '8px', fontSize: '1.05rem', color: '#0f2b30', fontWeight: 700, whiteSpace: 'nowrap' }}>Knee Pain &amp; Arthritis</strong>
              <span style={{ fontSize: '0.86rem', color: '#526e75', lineHeight: 1.5, marginBottom: '14px', flexGrow: 1, display: 'block' }}>
                Relief and treatment for painful, stiff, or damaged knees.
              </span>
              <span className="mock-condition-arrow">Read More &rarr;</span>
            </Link>

            {/* Card 2: Hip Pain & Joint Care */}
            <Link to="/treatments#hip" className="mock-condition-card">
              <div className="mock-condition-icon">
                <img
                  src="/icons/hip-pain.webp"
                  alt="Hip Pain & Joint Care"
                  className="mock-condition-icon-img"
                  loading="lazy"
                />
              </div>
              <strong style={{ flexGrow: 0, marginBottom: '8px', fontSize: '1.05rem', color: '#0f2b30', fontWeight: 700, whiteSpace: 'nowrap' }}>Hip Pain &amp; Joint Care</strong>
              <span style={{ fontSize: '0.86rem', color: '#526e75', lineHeight: 1.5, marginBottom: '14px', flexGrow: 1, display: 'block' }}>
                Relief for stiffness, arthritis, avascular necrosis (AVN), and hip wear.
              </span>
              <span className="mock-condition-arrow">Read More &rarr;</span>
            </Link>

            {/* Card 3: Shoulder Pain & Injuries */}
            <Link to="/treatments#shoulder" className="mock-condition-card">
              <div className="mock-condition-icon">
                <img
                  src="/icons/shoulder-pain.webp"
                  alt="Shoulder Pain & Injuries"
                  className="mock-condition-icon-img"
                  loading="lazy"
                />
              </div>
              <strong style={{ flexGrow: 0, marginBottom: '8px', fontSize: '1.05rem', color: '#0f2b30', fontWeight: 700, whiteSpace: 'nowrap' }}>Shoulder Pain &amp; Injuries</strong>
              <span style={{ fontSize: '0.86rem', color: '#526e75', lineHeight: 1.5, marginBottom: '14px', flexGrow: 1, display: 'block' }}>
                Care for shoulder pain, stiffness, and sports-related injuries.
              </span>
              <span className="mock-condition-arrow">Read More &rarr;</span>
            </Link>
          </div>

          <div className="mock-section-bottom-action">
            <Link to="/treatments" className="mock-btn-outline">
              <span>Explore All Treatments &rarr;</span>
            </Link>
          </div>
        </div>
      </section>


      {/* =========================================================================
          4. HOW I APPROACH YOUR TREATMENT (MY APPROACH)
          ========================================================================= */}
      <section className="mock-approach-section" id="approach" aria-label="My Treatment Approach">
        <div className="mock-shell">
          <div className="mock-approach-grid">
            {/* Left: OT Surgery Image with Play Button */}
            <div className="mock-approach-visual">
              <img
                src="/galleri/docter img/WhatsApp Image 2026-08-24 at 12.48.03 PM.webp"
                alt="Dr. Harshil Shah performing surgery in theatre"
                className="mock-approach-img"
              />
              <Link to="/surgical-videos" className="mock-play-btn-overlay" title="Watch Surgical Videos">
                <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
                  <polygon points="6 4 20 12 6 20 6 4" />
                </svg>
              </Link>
            </div>

            {/* Right Content */}
            <div className="mock-approach-right">
              
              <h2 className="mock-title">How I Approach Your Treatment</h2>
              <p>
                My approach is simple: I listen carefully to your symptoms, suggest surgery only when it is truly necessary, and always focus on gentle, minimally invasive methods so you can recover safely and comfortably.
              </p>

              <ul className="mock-checklist">
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Accurate diagnosis and a thorough, personal evaluation</span>
                </li>

                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Non-surgical medicines and physiotherapy explored first</span>
                </li>

                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span>Minimally invasive techniques for faster recovery and minimal pain</span>
                </li>
              </ul>

            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          5. RESEARCH & PUBLICATIONS
          ========================================================================= */}
      <section className="mock-publications-section" id="publications" aria-label="Research & Publications">
        <div className="mock-shell">
          <div className="mock-publications-inline-wrap">
            <h2 className="mock-title mock-publications-title">Research & Clinical Publications</h2>
            <div className="mock-toi-inline-card">
              <img
                src="/times-of-india-health.png"
                alt="The Times of India Health+"
                className="mock-toi-logo-img-sm"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          6. HONORS & RECOGNITIONS
          ========================================================================= */}
      <section className="mock-awards-section" id="awards" aria-label="Honors & Recognition">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
              
              <h2 className="mock-title">Recognitions &amp; Honors</h2>
              <p className="mock-subtitle">
                Recognitions and advanced surgical fellowships that reflect my ongoing commitment to providing you with the highest standard of care.
              </p>
            </div>
           
          </div>

          <div className="mock-awards-grid">
            <div className="mock-award-card is-primary-award" style={{ display: 'grid', gridTemplateColumns: 'minmax(240px, 420px) minmax(0, 1fr)', gap: '22px', alignItems: 'center' }}>
              <div className="mock-award-photo-wrap" style={{ marginBottom: 0, height: '230px' }}>
                <img
                  src="/toi-healthcare-leaders-award.jpg"
                  alt="Dr. Harshil Shah receiving Times of India Healthcare Leaders Award 2026"
                  className="mock-award-photo-img"
                  loading="lazy"
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

                <span className="mock-award-badge" style={{ background: '#eaf6f7', color: '#146c72' }}>Prestigious Award</span>
                <strong className="mock-award-name">Times of India (TOI) Healthcare Leader 2026</strong>
                <p className="mock-award-desc">
                  Awarded for clinical leadership in orthopaedic care, dedication to joint preservation, and helping patients recover safely with modern techniques.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          7. DAY CARE JOINT REPLACEMENT (CIRCULAR SHOWCASE WITH ATTRACTIVE ROUND BADGES)
          ========================================================================= */}
      <section className="mock-daycare-section" id="day-care" aria-label="Day Care Joint Replacement">
        <div className="mock-shell">
          <h2 className="mock-title" style={{ textAlign: 'center', color: '#000000' }}>Same-Day Joint Replacement</h2>
        <br />
          <div className="mock-daycare-box">
            
            {/* Left Content */}
            <div className="mock-daycare-left">
              <p>
Using modern surgical methods and proper pain control, the goal is to help you stand and start walking soon after surgery so you can return home comfortably.              </p>

            </div>

            {/* Right: 3D Joint Model in Circular Ring with Round Badges surrounding it */}
            <div className="mock-daycare-showcase">
              {/* Left Badges */}
              <div className="mock-daycare-badge-col mock-badge-col-left">
                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Less Pain</span>
                </div>

                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Shorter Hospital Stay</span>
                </div>
              </div>

              {/* Center: 3D Knee Joint visual in glowing circular ring */}
              <div className="mock-daycare-center">
                <div className="mock-daycare-ring">
                  <img
                    src="/knee-motion-v2.webp"
                    alt="3D Knee joint replacement model"
                    className="mock-daycare-joint-img"
                  />
                </div>
              </div>

              {/* Right Badges */}
              <div className="mock-daycare-badge-col mock-badge-col-right">
                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Faster Recovery</span>
                </div>

                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Better Mobility</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          8. ABOUT ME (DR. HARSHIL SHAH)
          ========================================================================= */}
      {/* =========================================================================
          10. WHAT MY PATIENTS SAY (VERIFIED GOOGLE REVIEWS - 5.0/5 RATING)
          ========================================================================= */}
      <section className="mock-reviews-section" id="reviews" aria-label="What My Patients Say">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
                <h2 className="mock-title">Patient Reviews</h2>
              
            </div>
            <a
              href="https://www.google.com/maps/place/Dr+Harshil+shah+(M.S.+Ortho)/data=!4m7!3m6!1s0x43b531bc6d74ba0f:0xe04cdd81ae66085b!8m2!3d23.0483!4d72.5204!9m1!1b1"
              target="_blank"
              rel="noreferrer"
              className="mock-btn-outline mock-reviews-desktop-cta"
            >
              <span>View on Google</span>
            </a>
          </div>

          {/* Desktop Single-Line Infinite Marquee (Auto-moves left to right, pauses on hover) */}
          <div className="mock-reviews-marquee-wrapper">
            <div className="mock-reviews-marquee-track">
              {[...reviewsData, ...reviewsData].map((review, idx) => (
                <div className="mock-review-card" key={`marquee-${review.id}-${idx}`}>
                  <span className="mock-review-quote">&ldquo;</span>
                  <p className="mock-review-text">{review.text}</p>
                  <div className="mock-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <div className="mock-review-author">
                    <div className="mock-review-avatar">
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                      </svg>
                    </div>
                    <div>
                      <strong className="mock-review-name">{review.name}</strong>
                      <span style={{ display: 'block', fontSize: '0.75rem', color: '#68858d', marginTop: '2px' }}>
                        {review.sub}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Single Review Slideshow (1 card at a time with forward/backward controls & swipe) */}
          <div
            className="mock-reviews-mobile-slider"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="mock-review-card mock-review-card-active" key={`slide-${currentReviewIndex}`}>
              <span className="mock-review-quote">&ldquo;</span>
              <p className="mock-review-text">{reviewsData[currentReviewIndex].text}</p>
              <div className="mock-review-stars">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
              <div className="mock-review-author">
                <div className="mock-review-avatar">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div>
                  <strong className="mock-review-name">{reviewsData[currentReviewIndex].name}</strong>
                  <span style={{ display: 'block', fontSize: '0.75rem', color: '#68858d', marginTop: '2px' }}>
                    {reviewsData[currentReviewIndex].sub}
                  </span>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="mock-reviews-slider-controls">
              <button
                type="button"
                className="mock-slider-btn prev"
                onClick={prevReview}
                aria-label="Previous Review"
              >
                &#8592;
              </button>
              <div className="mock-slider-indicator">
                <span>{currentReviewIndex + 1}</span> / <span>{reviewsData.length}</span>
              </div>
              <button
                type="button"
                className="mock-slider-btn next"
                onClick={nextReview}
                aria-label="Next Review"
              >
                &#8594;
              </button>
            </div>

            <div className="mock-slider-dots">
              {reviewsData.map((_, dotIdx) => (
                <button
                  key={`dot-${dotIdx}`}
                  type="button"
                  className={`mock-slider-dot ${dotIdx === currentReviewIndex ? 'active' : ''}`}
                  onClick={() => setCurrentReviewIndex(dotIdx)}
                  aria-label={`Go to review ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Mobile CTA: Appears directly below the reviews slideshow on phone screens */}
          <div className="mock-reviews-mobile-cta">
            <a
              href="https://www.google.com/maps/place/Dr+Harshil+shah+(M.S.+Ortho)/data=!4m7!3m6!1s0x43b531bc6d74ba0f:0xe04cdd81ae66085b!8m2!3d23.0483!4d72.5204!9m1!1b1"
              target="_blank"
              rel="noreferrer"
              className="mock-btn-outline"
            >
              <span>View on Google</span>
            </a>
          </div>
        </div>
      </section>


      {/* =========================================================================
          11. USEFUL INFORMATION (DOWNLOAD BROCHURES)
          ========================================================================= */}
      <section className="mock-brochures-section" id="brochures" aria-label="Useful Information">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
              <h2 className="mock-title">Brochures for Better Understanding</h2>
              <p className="mock-subtitle">
                I believe informed patients make confident decisions. These simple guides explain common orthopaedic problems, treatment choices, and what recovery can look like.
              </p>
            </div>
          </div>

          <div className="mock-brochures-grid">
            {/* Card 1: Knee Replacement */}
            <div className="mock-guide-card">
              <div className="mock-guide-card-header">
                <div className="mock-guide-icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="mock-guide-badge">Knee Care</span>
              </div>
              <div className="mock-guide-content">
                <h3 className="mock-guide-title">Understanding Knee Replacement</h3>
                <p className="mock-guide-desc">Joint care, recovery steps, and what to expect after surgery.</p>
              </div>
              <div className="mock-guide-footer">
                <a
                  href="/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  download="Understanding_Knee_Replacement_Guide.pdf"
                  className="mock-guide-dl-btn"
                  title="Download Knee Replacement Guide"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Card 2: Hip Replacement */}
            <div className="mock-guide-card">
              <div className="mock-guide-card-header">
                <div className="mock-guide-icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="mock-guide-badge">Hip Care</span>
              </div>
              <div className="mock-guide-content">
                <h3 className="mock-guide-title">Understanding Hip Replacement</h3>
                <p className="mock-guide-desc">Simple guidance on treatment, recovery planning, and daily movement.</p>
              </div>
              <div className="mock-guide-footer">
                <a
                  href="/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf"
                  download="Understanding_Hip_Replacement_Guide.pdf"
                  className="mock-guide-dl-btn"
                  title="Download Hip Replacement Guide"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Card 3: Sports Injuries */}
            <div className="mock-guide-card">
              <div className="mock-guide-card-header">
                <div className="mock-guide-icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="mock-guide-badge">Sports Medicine</span>
              </div>
              <div className="mock-guide-content">
                <h3 className="mock-guide-title">Sports Injuries &amp; Arthroscopy</h3>
                <p className="mock-guide-desc">Understanding keyhole treatment, rehab progress, and return to activity.</p>
              </div>
              <div className="mock-guide-footer">
                <a
                  href="/galleri/brochure/03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  download="Understanding_Sports_Injuries_Arthroscopy_Guide.pdf"
                  className="mock-guide-dl-btn"
                  title="Download Sports Injuries Guide"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>

            {/* Card 4: Shoulder Care */}
            <div className="mock-guide-card">
              <div className="mock-guide-card-header">
                <div className="mock-guide-icon-box">
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <span className="mock-guide-badge">Shoulder Care</span>
              </div>
              <div className="mock-guide-content">
                <h3 className="mock-guide-title">Shoulder Care &amp; Arthroscopy</h3>
                <p className="mock-guide-desc">Practical information on pain relief, mobility, and shoulder recovery.</p>
              </div>
              <div className="mock-guide-footer">
                <a
                  href="/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                  download="Understanding_Shoulder_Arthroscopy_Guide.pdf"
                  className="mock-guide-dl-btn"
                  title="Download Shoulder Arthroscopy Guide"
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          12. WHERE YOU CAN VISIT ME (OPD CLINICS & TIMINGS)
          ========================================================================= */}
      <section className="mock-locations-section" id="locations" aria-label="Where You Can Visit Me">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
              <h2 className="mock-title">Where You Can Consult Me</h2>
              <p className="mock-subtitle">
                You can meet me in person for a detailed consultation, examination, and review of your X-rays or MRI. I will understand your condition and explain the treatment options suited to you.
              </p>
            </div>
            <Link to="/appointment" className="mock-btn-outline mock-locations-desktop-cta">
              <span>Book an Appointment &rarr;</span>
            </Link>
          </div>

          <div className="mock-locations-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {/* Card 1: Curis Hospitals (Main OPD Clinic) */}
            <div className="mock-location-card">
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/curis-hospital-logo.png"
                    alt="Curis Hospitals Logo"
                    className="mock-loc-logo-img curis"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mock-loc-text">
                <strong>Curis Hospitals</strong>
                <span>Sindhubhavan Road, Bodakdev, Ahmedabad</span>

                <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '6px', lineHeight: 1.45 }}>
                  Regular consultations, joint examinations, imaging reviews, and follow-ups.
                </span>
              </div>
            </div>

            {/* Card 2: Sterling Hospitals (Visiting OPD Clinic) */}
            <div className="mock-location-card">
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/sterling-hospital-logo.png"
                    alt="Sterling Hospitals Logo"
                    className="mock-loc-logo-img sterling"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mock-loc-text">
                <strong>Sterling Hospitals</strong>
                <span>Sterling Hospital Road, Memnagar, Ahmedabad</span>
                <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '8px', lineHeight: 1.45 }}>
                  Focused consultations, pre-surgery evaluations, and second opinions.
                </span>
              </div>
            </div>

            {/* Card 3: Kakadya & Lilavati Hospitals (Specialty Clinic) */}
            <div className="mock-location-card">
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/lilavati-hospital-logo.png"
                    alt="Lilavati Hospital Logo"
                    className="mock-loc-logo-img lilavati"
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="mock-loc-text">
                <strong>Kakadya &amp; Lilavati Hospitals</strong>
                <span>Ahmedabad, Gujarat</span>
                <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '8px', lineHeight: 1.45 }}>
                  Specialty consultations for shoulder, sports injuries, and arthroscopy.
                </span>
              </div>
            </div>
          </div>

          {/* Mobile CTA: Appears directly below the 3 cards on phone screens */}
          <div className="mock-locations-mobile-cta">
            <Link to="/appointment" className="mock-btn-outline">
              <span>Book an Appointment &rarr;</span>
            </Link>
          </div>
        </div>
      </section>


      {/* =========================================================================
          13. FREQUENTLY ASKED QUESTIONS (FAQS - Directly from faqData)
          ========================================================================= */}
      <section className="mock-faqs-section" id="faqs" aria-label="Frequently Asked Questions">
        <div className="mock-shell">
          <div className="mock-section-header">
            <div className="mock-section-header-left">
              <h2 className="mock-title">Frequently Asked Questions</h2>
              <p className="mock-subtitle">
                Here are simple, clear answers to the questions my patients ask most often before consultation and treatment.
              </p>
            </div>
            <Link to="/faq" className="mock-btn-outline mock-faqs-desktop-cta">
              <span>View All FAQs &rarr;</span>
            </Link>
          </div>

          <div className="mock-faqs-list">
            {homeFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id || idx}
                  className={`mock-faq-row ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <div className="mock-faq-header-row">
                    <div className="mock-faq-left">
                      <span className="mock-faq-icon-circle">Q</span>
                      <span className="mock-faq-question-text">{faq.question}</span>
                    </div>
                    <span className="mock-faq-plus">
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div className="mock-faq-body">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mock-section-bottom-action">
            <Link to="/faq" className="mock-btn-outline">
              <span>View All FAQs &rarr;</span>
            </Link>
          </div>
        </div>
      </section>



      {/* =========================================================================
          15. ONLINE CONSULTATION
          ========================================================================= */}
      <section className="mock-online-consult-section" id="online-consultation" aria-label="Online Consultation">
        <div className="mock-shell">
          <div className="mock-consult-card-unified">
            <div className="mock-consult-content-full">
              <h2 className="mock-title">Consult With Me Online</h2>
              <p className="mock-consult-lead">
                If you live outside Ahmedabad, find it difficult to travel, or want an expert second opinion on your joint condition, you can consult with me directly from home.
              </p>

              {/* Action Buttons */}
              <div className="mock-consult-footer-actions">
                <Link to="/appointment" className="mock-btn-primary">
                  <span>Book an Appointment</span>
                  <span className="mock-btn-primary-arrow">&rarr;</span>
                </Link>
                <a
                  href="https://wa.me/917874904030?text=Hello%20Dr.%20Harshil%20Shah,%20I%20would%20like%20to%20consult%20online"
                  target="_blank"
                  rel="noreferrer"
                  className="mock-btn-whatsapp"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" style={{ flexShrink: 0 }}>
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.02c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.14.11-3.66-.93-3.23-1.33-5.32-4.6-5.48-4.82-.16-.22-1.32-1.75-1.32-3.34 0-1.59.83-2.37 1.12-2.7.29-.33.64-.41.85-.41.21 0 .43 0 .61.01.2.01.47-.08.73.55.27.64.91 2.22.99 2.38.08.16.14.36.03.58-.11.22-.16.36-.33.55-.16.2-.35.44-.5.59-.16.16-.33.33-.14.66.19.33.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.72-.09.2-.23.83-.97 1.05-1.3.22-.33.44-.28.74-.16.3.11 1.93.91 2.26 1.07.33.16.55.25.63.38.08.14.08.8-.16 1.48z" />
                  </svg>
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
