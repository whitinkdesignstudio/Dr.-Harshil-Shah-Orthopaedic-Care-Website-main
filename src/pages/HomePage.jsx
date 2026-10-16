import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import { faqData } from '../data/faqData';



const conditionsData = [
  {
    id: 'knee',
    link: '/treatments#knee',
    image: '/galleri/brochure/knee-replacement-guide.jpg',
    title: 'Knee Conditions',
    desc: 'Osteoarthritis, ACL & multi-ligament injuries, meniscus tears, cartilage defects, and malalignment.',
  },
  {
    id: 'hip',
    link: '/treatments#hip',
    image: '/galleri/brochure/hip-replacement-guide.jpg',
    title: 'Hip Conditions',
    desc: 'Osteoarthritis, avascular necrosis (AVN), femoroacetabular impingement (FAI), and joint preservation.',
  },
  {
    id: 'shoulder',
    link: '/treatments#shoulder',
    image: '/galleri/brochure/shoulder-arthroscopy-guide.jpg',
    title: 'Shoulder Conditions',
    desc: 'Rotator cuff tears, recurrent instability, frozen shoulder, cuff-tear arthropathy, and arthritis.',
  },
];

const locationsData = [
  {
    id: 'curis',
    logo: '/curis-hospital-logo.png',
    logoClass: 'mock-loc-logo-img curis',
    title: 'Curis Hospitals',
    address: 'Sindhubhavan Road, Bodakdev, Ahmedabad',
  },
  {
    id: 'sterling',
    logo: '/sterling-hospital-logo.png',
    logoClass: 'mock-loc-logo-img sterling',
    title: 'Sterling Hospitals',
    address: 'Sterling Hospital Road, Memnagar, Ahmedabad',
  },
  {
    id: 'lilavati',
    logo: '/lilavati-hospital-logo.png',
    logoClass: 'mock-loc-logo-img lilavati',
    title: 'Kakadya & Lilavati Hospitals',
    address: 'Bapunagar / East Ahmedabad Clinic',
  },
];

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [currentConditionIndex, setCurrentConditionIndex] = useState(0);
  const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
  const [expandedLocation, setExpandedLocation] = useState(null);

  const prevCondition = () => {
    setCurrentConditionIndex((prev) => (prev === 0 ? conditionsData.length - 1 : prev - 1));
  };

  const nextCondition = () => {
    setCurrentConditionIndex((prev) => (prev === conditionsData.length - 1 ? 0 : prev + 1));
  };

  const prevLocation = () => {
    setCurrentLocationIndex((prev) => (prev === 0 ? locationsData.length - 1 : prev - 1));
  };

  const nextLocation = () => {
    setCurrentLocationIndex((prev) => (prev === locationsData.length - 1 ? 0 : prev + 1));
  };

  const toggleLocation = (idx) => {
    setExpandedLocation((prev) => (prev === idx ? null : idx));
  };

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  // Top featured FAQs directly from faqData (same as FaqPage)
  const homeFaqs = useMemo(() => {
    const featured = faqData.filter((item) => item.featured);
    return featured.length >= 4 ? featured.slice(0, 6) : faqData.slice(0, 6);
  }, []);

  return (
    <div className="mock-home">
      <SEO
        title="Dr. Harshil Shah | Orthopaedic Surgeon, Ahmedabad"
        description="Fellowship-trained in joint replacement and arthroscopy (HSS New York, MGH Boston). Knee, hip and shoulder care in Ahmedabad."
        canonicalUrl="/"
        schema={{
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Dr. Harshil Shah Orthopaedic Care',
          url: 'https://www.drharshilshah.com/',
          description: 'Specialist orthopaedic care for knee, hip, and shoulder conditions in Ahmedabad, Gujarat.',
          publisher: {
            '@type': 'Physician',
            name: 'Dr. Harshil Shah'
          }
        }}
      />

      {/* Hero Banner */}
      <section className="home-hero-image-banner" aria-label="Hero Banner" style={{ width: '100%', lineHeight: 0 }}>
        <img
          src="/galleri/homepage-herosection.png"
          alt="Dr. Harshil Shah - Knee, Hip & Shoulder Surgery"
          style={{ width: '100%', height: 'auto', display: 'block' }}
          loading="eager"
        />
      </section>

      {/* =========================================================================
          3. CONDITIONS & CARE - CONDITIONS I TREAT (WITH EXACT MATCHING LOGOS)
          ========================================================================= */}
      <section className="mock-treatments-section" id="conditions" aria-label="Conditions I Treat">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: 0 }}>
              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>Conditions Treated</h2>
              <p style={{ color: '#526e75', fontSize: '0.95rem', marginTop: '6px', maxWidth: '750px', lineHeight: 1.6, textAlign: 'left', marginLeft: 0 }}>
                Assessment begins with accurate clinical diagnosis, not the procedure. Most joint problems are first managed with medication, structured physiotherapy, and activity modifications; surgery is advised when these no longer control symptoms or when the injury will not heal without it.
              </p>
            </div>
          </div>

          <div className="mock-conditions-grid">
            {conditionsData.map((cond) => (
              <Link key={cond.id} to={cond.link} className="mock-condition-card">
                <div className="mock-condition-img-wrap">
                  <img
                    src={cond.image}
                    alt={cond.title}
                    className="mock-condition-img"
                    loading="lazy"
                  />
                </div>
                <div className="mock-condition-content">
                  <strong className="mock-condition-title">{cond.title}</strong>
                  <p className="mock-condition-desc">{cond.desc}</p>
                  <span className="mock-condition-arrow">Read More &rarr;</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Mobile 1-by-1 Condition Slider */}
          <div className="mock-conditions-mobile-slider">
            <div className="mock-condition-slider-card-wrap" key={`cond-${currentConditionIndex}`}>
              <Link to={conditionsData[currentConditionIndex].link} className="mock-condition-card mock-condition-card-active">
                <div className="mock-condition-img-wrap">
                  <img
                    src={conditionsData[currentConditionIndex].image}
                    alt={conditionsData[currentConditionIndex].title}
                    className="mock-condition-img"
                    loading="lazy"
                  />
                </div>
                <div className="mock-condition-content">
                  <strong className="mock-condition-title">
                    {conditionsData[currentConditionIndex].title}
                  </strong>
                  <p className="mock-condition-desc">
                    {conditionsData[currentConditionIndex].desc}
                  </p>
                  <span className="mock-condition-arrow">Read More &rarr;</span>
                </div>
              </Link>
            </div>

            {/* Slider Controls */}
            <div className="mock-reviews-slider-controls">
              <button
                type="button"
                className="mock-slider-btn prev"
                onClick={prevCondition}
                aria-label="Previous Condition"
              >
                &#8592;
              </button>
              <div className="mock-slider-indicator">
                <span>{currentConditionIndex + 1}</span> / <span>{conditionsData.length}</span>
              </div>
              <button
                type="button"
                className="mock-slider-btn next"
                onClick={nextCondition}
                aria-label="Next Condition"
              >
                &#8594;
              </button>
            </div>

            <div className="mock-slider-dots">
              {conditionsData.map((_, dotIdx) => (
                <button
                  key={`cond-dot-${dotIdx}`}
                  type="button"
                  className={`mock-slider-dot ${dotIdx === currentConditionIndex ? 'active' : ''}`}
                  onClick={() => setCurrentConditionIndex(dotIdx)}
                  aria-label={`Go to condition ${dotIdx + 1}`}
                />
              ))}
            </div>
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
            <div className="mock-approach-right" style={{ textAlign: 'left', alignItems: 'flex-start' }}>
              
              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>Clinical Approach</h2>
              <p style={{ textAlign: 'left', marginLeft: 0, marginRight: 'auto' }}>
                Orthopaedic decision-making centres on establishing an accurate clinical diagnosis, exhaustively exploring non-surgical therapies, and recommending surgery only when it demonstrably restores function and adds long-term value.
              </p>

              <ul className="mock-checklist">
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span><strong>Diagnosis first:</strong> Comprehensive clinical examination and imaging review (X-ray/MRI) so investigations are repeated only when they change the management plan.</span>
                </li>

                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span><strong>Conservative care before surgery:</strong> Lifestyle modification, targeted physiotherapy, and joint injections are trialled first whenever clinically sound.</span>
                </li>

                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span><strong>Surgery when it adds value:</strong> Rationale, alternatives, potential risks, and expected rehabilitation milestones are explained transparently before obtaining informed consent.</span>
                </li>

                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  <span><strong>Recovery planned in advance:</strong> Pre-operative patient education, modern pain management, and early mobilisation under Enhanced Recovery (ERAS) protocols.</span>
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

                <span className="mock-award-badge" style={{ background: '#eaf6f7', color: '#146c72' }}>Recognition</span>
                <strong className="mock-award-name">Times of India Healthcare Leaders 2026</strong>
                <p className="mock-award-desc">
                  Conferred by Optimal Media Solutions (Times Group) recognizing clinical practice in orthopaedic surgery, joint preservation, and arthroscopy in Ahmedabad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          7. DAY CARE JOINT REPLACEMENT (CIRCULAR SHOWCASE WITH ATTRACTIVE ROUND BADGES)
          ========================================================================= */}
      <section className="mock-daycare-section" id="day-care" aria-label="Enhanced Recovery After Surgery">
        <div className="mock-shell">
          <h2 className="mock-title" style={{ textAlign: 'center', color: '#000000' }}>Enhanced Recovery Pathway (ERAS)</h2>
        <br />
          <div className="mock-daycare-box">
            
            {/* Left Content */}
            <div className="mock-daycare-left">
              <p>
                Enhanced Recovery After Surgery (ERAS) is an evidence-based clinical protocol combining pre-operative preparation, modern anaesthesia, multimodal pain management, and early mobilisation. In suitable candidates, it supports early weight-bearing and reduced hospital stay.
              </p>
            </div>

            {/* Right: 3D Joint Model in Circular Ring with Round Badges surrounding it */}
            <div className="mock-daycare-showcase">
              {/* Left Badges */}
              <div className="mock-daycare-badge-col mock-badge-col-left">
                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Multimodal Pain Control</span>
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
                    alt="Knee joint anatomical model"
                    className="mock-daycare-joint-img"
                  />
                </div>
              </div>

              {/* Right Badges */}
              <div className="mock-daycare-badge-col mock-badge-col-right">
                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Early Mobilisation</span>
                </div>

                <div className="mock-daycare-pill mock-pill-round">
                  <span className="mock-pill-dot" />
                  <span>Targeted Protocol</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* =========================================================================
          11. PATIENT EDUCATION LIBRARY (SPLIT EDITORIAL LAYOUT)
          ========================================================================= */}
      <section className="mock-brochures-section" id="brochures" aria-label="Patient Education Library">
        <div className="mock-shell">
          <div className="mock-brochures-split-layout">
            {/* Left Column (about 35%): Left-aligned heading, 2 lines of copy, note */}
            <div className="mock-brochures-left-col">
              <h2 className="mock-brochures-title">
                Patient Education Library
              </h2>
              <p className="mock-brochures-lead">
                Clinical guides explaining knee, hip, and shoulder joint conditions, surgical and non-surgical choices, preparation, and rehabilitation stages.
              </p>
 
            </div>

            {/* Right Column (about 65%): 2x2 grid of guides with cover thumbnails */}
            <div className="mock-brochures-right-col">
              <div className="mock-brochures-split-grid">
                {/* Guide 1: Knee Replacement */}
                <div className="mock-split-guide-card">
                  <div className="mock-split-thumb-wrap">
                    <img
                      src="/galleri/brochure/knee-replacement-guide.jpg"
                      alt="Understanding Knee Replacement Guide Cover"
                      className="mock-split-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mock-split-guide-info">
                    <span className="mock-split-badge">Knee Care</span>
                    <h3 className="mock-split-card-title">Understanding Knee Replacement</h3>
                    <p className="mock-split-card-desc">Joint care, recovery steps, and what to expect after surgery.</p>
                    <a
                      href="/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf"
                      download="Understanding_Knee_Replacement_Guide.pdf"
                      className="mock-split-dl-link"
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

                {/* Guide 2: Hip Replacement */}
                <div className="mock-split-guide-card">
                  <div className="mock-split-thumb-wrap">
                    <img
                      src="/galleri/brochure/hip-replacement-guide.jpg"
                      alt="Understanding Hip Replacement Guide Cover"
                      className="mock-split-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mock-split-guide-info">
                    <span className="mock-split-badge">Hip Care</span>
                    <h3 className="mock-split-card-title">Understanding Hip Replacement</h3>
                    <p className="mock-split-card-desc">Simple guidance on treatment, recovery planning, and daily movement.</p>
                    <a
                      href="/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf"
                      download="Understanding_Hip_Replacement_Guide.pdf"
                      className="mock-split-dl-link"
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

                {/* Guide 3: Sports Injuries & Arthroscopy */}
                <div className="mock-split-guide-card">
                  <div className="mock-split-thumb-wrap">
                    <img
                      src="/galleri/brochure/knee-sports-injury-guide.jpg"
                      alt="Sports Injuries & Arthroscopy Guide Cover"
                      className="mock-split-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mock-split-guide-info">
                    <span className="mock-split-badge">Sports Medicine</span>
                    <h3 className="mock-split-card-title">Sports Injuries &amp; Arthroscopy</h3>
                    <p className="mock-split-card-desc">Understanding keyhole treatment, rehab progress, and return to activity.</p>
                    <a
                      href="/galleri/brochure/03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                      download="Understanding_Sports_Injuries_Arthroscopy_Guide.pdf"
                      className="mock-split-dl-link"
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

                {/* Guide 4: Shoulder Care & Arthroscopy */}
                <div className="mock-split-guide-card">
                  <div className="mock-split-thumb-wrap">
                    <img
                      src="/galleri/brochure/shoulder-arthroscopy-guide.jpg"
                      alt="Shoulder Care & Arthroscopy Guide Cover"
                      className="mock-split-thumb-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="mock-split-guide-info">
                    <span className="mock-split-badge">Shoulder Care</span>
                    <h3 className="mock-split-card-title">Shoulder Care &amp; Arthroscopy</h3>
                    <p className="mock-split-card-desc">Practical information on pain relief, mobility, and shoulder recovery.</p>
                    <a
                      href="/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                      download="Understanding_Shoulder_Arthroscopy_Guide.pdf"
                      className="mock-split-dl-link"
                      title="Download Shoulder Care Guide"
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
              <h2 className="mock-title">Consultation Locations</h2>
              <p className="mock-subtitle">
                In-person clinical consultations, physical examinations, and comprehensive imaging reviews available across hospital locations in Ahmedabad.
              </p>
            </div>

          </div>

          <div className="mock-locations-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {/* Card 1: Curis Hospitals (Main OPD Clinic) */}
            <div
              className={`mock-location-card ${expandedLocation === 0 ? 'is-expanded' : ''}`}
              onClick={() => toggleLocation(0)}
              role="button"
              tabIndex="0"
            >
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/curis-hospital-logo.png"
                    alt="Curis Hospitals Logo"
                    className="mock-loc-logo-img curis"
                    loading="lazy"
                  />
                </div>
                <div className="mock-loc-mobile-toggle" aria-label="Toggle details">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={expandedLocation === 0 ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                  </svg>
                </div>
              </div>
              <div className="mock-loc-text">
                <strong className="mock-loc-title">Curis Hospitals</strong>
                <div className="mock-loc-details">
                  <span>Sindhubhavan Road, Bodakdev, Ahmedabad</span>
                  <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '6px', lineHeight: 1.45 }}>
                    Regular consultations, joint examinations, imaging reviews, and follow-ups.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2: Sterling Hospitals (Visiting OPD Clinic) */}
            <div
              className={`mock-location-card ${expandedLocation === 1 ? 'is-expanded' : ''}`}
              onClick={() => toggleLocation(1)}
              role="button"
              tabIndex="0"
            >
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/sterling-hospital-logo.png"
                    alt="Sterling Hospitals Logo"
                    className="mock-loc-logo-img sterling"
                    loading="lazy"
                  />
                </div>
                <div className="mock-loc-mobile-toggle" aria-label="Toggle details">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={expandedLocation === 1 ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                  </svg>
                </div>
              </div>
              <div className="mock-loc-text">
                <strong className="mock-loc-title">Sterling Hospitals</strong>
                <div className="mock-loc-details">
                  <span>Sterling Hospital Road, Memnagar, Ahmedabad</span>
                  <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '8px', lineHeight: 1.45 }}>
                    Focused consultations, pre-surgery evaluations, and second opinions.
                  </span>
                </div>
              </div>
            </div>

            {/* Card 3: Kakadya & Lilavati Hospitals (Specialty Clinic) */}
            <div
              className={`mock-location-card ${expandedLocation === 2 ? 'is-expanded' : ''}`}
              onClick={() => toggleLocation(2)}
              role="button"
              tabIndex="0"
            >
              <div className="mock-loc-top-row">
                <div className="mock-loc-logo-wrap">
                  <img
                    src="/lilavati-hospital-logo.png"
                    alt="Lilavati Hospital Logo"
                    className="mock-loc-logo-img lilavati"
                    loading="lazy"
                  />
                </div>
                <div className="mock-loc-mobile-toggle" aria-label="Toggle details">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points={expandedLocation === 2 ? "18 15 12 9 6 15" : "6 9 12 15 18 9"} />
                  </svg>
                </div>
              </div>
              <div className="mock-loc-text">
                <strong className="mock-loc-title">Kakadya &amp; Lilavati Hospitals</strong>
                <div className="mock-loc-details">
                  <span>Ahmedabad, Gujarat</span>
                  <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '8px', lineHeight: 1.45 }}>
                    Specialty consultations for shoulder, sports injuries, and arthroscopy.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 1-by-1 Location Slider */}
          <div className="mock-locations-mobile-slider">
            <div className="mock-location-slider-card-wrap" key={`loc-${currentLocationIndex}`}>
              <div className="mock-location-card mock-location-card-active is-expanded">
                <div className="mock-loc-top-row">
                  <div className="mock-loc-logo-wrap">
                    <img
                      src={locationsData[currentLocationIndex].logo}
                      alt={`${locationsData[currentLocationIndex].title} Logo`}
                      className={locationsData[currentLocationIndex].logoClass}
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="mock-loc-text">
                  <strong className="mock-loc-title">{locationsData[currentLocationIndex].title}</strong>
                  <div className="mock-loc-details" style={{ display: 'block', maxHeight: 'none', opacity: 1, marginTop: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#0f2b30' }}>{locationsData[currentLocationIndex].address}</span>
                    <span style={{ display: 'block', fontSize: '0.82rem', color: '#526e75', marginTop: '6px', lineHeight: 1.45 }}>
                      {locationsData[currentLocationIndex].desc}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Controls */}
            <div className="mock-reviews-slider-controls">
              <button
                type="button"
                className="mock-slider-btn prev"
                onClick={prevLocation}
                aria-label="Previous Location"
              >
                &#8592;
              </button>
              <div className="mock-slider-indicator">
                <span>{currentLocationIndex + 1}</span> / <span>{locationsData.length}</span>
              </div>
              <button
                type="button"
                className="mock-slider-btn next"
                onClick={nextLocation}
                aria-label="Next Location"
              >
                &#8594;
              </button>
            </div>

            <div className="mock-slider-dots">
              {locationsData.map((_, dotIdx) => (
                <button
                  key={`loc-dot-${dotIdx}`}
                  type="button"
                  className={`mock-slider-dot ${dotIdx === currentLocationIndex ? 'active' : ''}`}
                  onClick={() => setCurrentLocationIndex(dotIdx)}
                  aria-label={`Go to location ${dotIdx + 1}`}
                />
              ))}
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
                  href="https://wa.me/919316753985?text=Hello%20Dr.%20Harshil%20Shah,%20I%20would%20like%20to%20consult%20online"
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
