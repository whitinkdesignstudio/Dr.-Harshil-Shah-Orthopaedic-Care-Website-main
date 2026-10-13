import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

const experienceItems = [
  {
    type: 'MEDICAL EDUCATION', tone: 'education', location: 'Ahmedabad',
    title: 'Medical Education & Orthopaedic Residency',
    paragraphs: [
      'MBBS and internship completed at NHL Municipal Medical College, Ahmedabad, building a rigorous foundation in medical science and clinical examination.',
      'Orthopaedic surgery residency at L.G. Hospital, Ahmedabad, providing extensive surgical experience in musculoskeletal trauma and reconstructive procedures.'
    ], side: 'left'
  },
  {
    type: 'FELLOWSHIP', tone: 'training', location: 'Mumbai',
    title: 'Joint Replacement Training',
    paragraphs: [
      'Fellowship training in joint replacement surgery at P. D. Hinduja Hospital, Mumbai, under Dr. Sanjay Agarwala.',
      'Specialized in primary and complex hip and knee arthroplasty, and medical management of early hip avascular necrosis (AVN).'
    ], side: 'right'
  },
  {
    type: 'SPECIALIZED TRAINING', tone: 'sports', location: 'Mumbai',
    title: 'Sports Injury & Arthroscopy',
    paragraphs: [
      'Specialized training in sports medicine and arthroscopy at P. D. Hinduja Hospital, Mumbai, under Dr. Abhay Narvekar.',
      'Focused on high-precision knee and shoulder arthroscopy, cruciate ligament reconstruction, and meniscus preservation techniques.'
    ],
    side: 'left'
  },
  {
    type: 'SHOULDER FELLOWSHIP', tone: 'shoulder', location: 'Pune',
    title: 'Shoulder Surgery & Sports Injuries',
    paragraphs: [
      'Advanced shoulder surgery fellowship in Pune under Dr. Ashish Babhulkar.',
      'Specialized in arthroscopic rotator cuff repair, shoulder stabilization for recurrent dislocation, and reverse shoulder replacement.'
    ], side: 'right'
  },
  {
    type: 'INTERNATIONAL FELLOWSHIP · USA', tone: 'usa', location: 'New York, USA',
    title: 'Robotic & Revision Joint Replacement · HSS New York',
    paragraphs: [
      'International training in robotic and revision hip and knee replacement at Hospital for Special Surgery (HSS), New York, under Dr. Peter Sculco and Dr. Thomas Sculco.',
      'Studied modern implant kinematics, robotic alignment systems, and complex revision reconstructive techniques.'
    ], side: 'left'
  },
  {
    type: 'INTERNATIONAL TRAINING · USA', tone: 'harvard', location: 'Boston, USA',
    title: 'Complex Shoulder Reconstruction & Scapulothoracic Disorders · MGH Boston',
    paragraphs: [
      'Advanced training at Massachusetts General Hospital (MGH), Boston, under Dr. Bassem Elhassan.',
      'Specialized focus on scapulothoracic disorders, tendon transfers, and complex shoulder reconstructive procedures.'
    ], side: 'right'
  }
];

const expertiseItems = [
  {
    num: '01',
    title: 'Knee Care',
    link: '/treatments#knee',
    icon: '/icons/knee-pain.webp',
    text: 'Ligament injuries, meniscus tears, arthritis, ACL reconstruction, robotic and joint preservation procedures.'
  },
  {
    num: '02',
    title: 'Shoulder Care',
    link: '/treatments#shoulder',
    icon: '/icons/shoulder-pain.webp',
    text: 'Arthroscopic rotator cuff repair, shoulder stabilization for recurrent dislocation, and reverse shoulder replacement.'
  },
  {
    num: '03',
    title: 'Hip Care',
    link: '/treatments#hip',
    icon: '/icons/hip-pain.webp',
    text: 'Avascular necrosis (AVN), femoroacetabular impingement (FAI), direct anterior approach and hip replacement.'
  }
];

const aboutFocusItems = [
  { title: 'Evidence-Based Decisions', text: 'Treatment recommendations follow current clinical evidence, internationally recognized guidelines (AAOS, NICE), and individualized patient risk assessment.' },
  { title: 'Joint Preservation First', text: 'Non-surgical protocols, ligament repair, cartilage restoration, and alignment osteotomy are evaluated before considering joint replacement.' },
  { title: 'Informed Consent', text: 'Expected benefits, potential risks, alternatives, and realistic recovery timelines are explained thoroughly before planning any procedure.' },
  { title: 'Continuity of Care', text: 'The same consultant surgeon leads every stage of care—from clinical diagnosis and surgical execution through scheduled rehabilitation follow-up.' }
];

const campItems = [
  {
    id: 'camp-bijainagar',
    title: 'Orthopaedic Screening & Joint Health Camp',
    hospital: 'Shree P. K. V. Hospital and Research Centre',
    description:
      'Community orthopaedic screening and clinical consultation camp conducted by Dr. Harshil Shah for patients suffering from knee, spine, trauma, shoulder, and hip conditions. Provided specialist clinical assessments and joint care guidance.',
    photos: [
      {
        src: '/camps/bijainagar-camp-banner.jpg',
        title: 'Camp Banner & Consultation Venue',
        subtitle: 'Dr. Harshil Shah at Shree P. K. V. Hospital, Bijainagar',
        tag: 'Camp Banner'
      },
      {
        src: '/camps/bijainagar-camp-team.png',
        title: 'Hospital Felicitation & Reception',
        subtitle: 'Felicitation by hospital organizers and medical staff at Bijainagar',
        tag: 'Community Program'
      }
    ]
  }
];

function CampSlideshow({ photos, onPhotoClick }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (photos.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    }, 3500);

    return () => clearInterval(interval);
  }, [photos.length, isPaused]);

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrentIdx((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="camp-slideshow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <img
        src={photos[currentIdx].src}
        alt={photos[currentIdx].title}
        className="camp-slideshow-img"
        onClick={() => onPhotoClick && onPhotoClick(photos[currentIdx])}
      />
      {photos.length > 1 && (
        <>
          <button
            type="button"
            className="camp-slide-arrow prev"
            onClick={prevSlide}
            aria-label="Previous photo"
          >
            ‹
          </button>
          <button
            type="button"
            className="camp-slide-arrow next"
            onClick={nextSlide}
            aria-label="Next photo"
          >
            ›
          </button>
          <div className="camp-slide-dots">
            {photos.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`camp-slide-dot ${idx === currentIdx ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIdx(idx);
                }}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="camp-slide-counter">
            {currentIdx + 1} / {photos.length}
          </div>
        </>
      )}
    </div>
  );
}


export default function AboutPage() {
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [activeCampPhoto, setActiveCampPhoto] = useState(null);
  const [currentPhilosophyIndex, setCurrentPhilosophyIndex] = useState(0);

  const prevPhilosophy = () => {
    setCurrentPhilosophyIndex((prev) => (prev === 0 ? aboutFocusItems.length - 1 : prev - 1));
  };

  const nextPhilosophy = () => {
    setCurrentPhilosophyIndex((prev) => (prev === aboutFocusItems.length - 1 ? 0 : prev + 1));
  };

  const activeExperience = experienceItems[selectedExperience];

  return (
    <div className="about-page mock-home">
      <SEO
        title="About Dr. Harshil Shah | Orthopaedic Surgeon Ahmedabad"
        description="Learn about Dr. Harshil Shah (MBBS, MS Orthopaedics), his fellowships at HSS New York and MGH Boston, and his patient-first orthopaedic care in Ahmedabad."
        canonicalUrl="/about"
        keywords="Dr Harshil Shah, orthopaedic surgeon qualifications, HSS New York fellowship, MGH Boston, joint replacement surgeon Ahmedabad"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'Person',
              '@id': 'https://www.drharshilshah.com/about#person',
              name: 'Dr. Harshil Shah',
              jobTitle: 'Consultant Orthopaedic & Joint Surgeon',
              worksFor: {
                '@type': 'MedicalClinic',
                name: 'Curis Hospitals, Ahmedabad'
              },
              alumniOf: [
                {
                  '@type': 'EducationalOrganization',
                  name: 'NHL Municipal Medical College, Ahmedabad'
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'Hospital for Special Surgery (HSS), New York, USA'
                },
                {
                  '@type': 'EducationalOrganization',
                  name: 'Massachusetts General Hospital (MGH), Boston, USA'
                }
              ],
              knowsAbout: [
                'Joint Replacement',
                'Hip Joint Preservation',
                'Shoulder Arthroscopy',
                'Sports Medicine'
              ]
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://www.drharshilshah.com/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'About Dr. Harshil Shah',
                  item: 'https://www.drharshilshah.com/about'
                }
              ]
            }
          ]
        }}
      />
      {/* 1. HERO BANNER (Exact same structure and styling as Home Page) */}
      <section className="mock-hero" aria-label="Hero Banner">
        <div className="mock-hero-media">
          <img
            src="/galleri/docter img/about.png"
            alt="Dr. Harshil Shah - Expert Orthopaedic Surgeon"
            className="mock-hero-full-image"
            loading="eager"
          />
        </div>
        <div className="mock-shell mock-hero-overlay">
          <div className="mock-hero-inner">
            <div className="mock-hero-left">
              {/* Mobile Only: Centered Hero Focus Image */}
              <div className="mock-hero-mobile-box">
                <div className="mock-hero-mobile-frame">
                  <img
                    src="/galleri/about-mobile-focus.png"
                    alt="Dr. Harshil Shah - Expert Orthopaedic Surgeon"
                    className="mock-hero-mobile-img"
                    loading="eager"
                  />
                </div>
              </div>

              <h1 className="mock-hero-title">
                <span className="mock-hero-line-1">Dr. Harshil Shah</span>
                <span className="mock-hero-line-2" style={{ fontSize: '0.85em' }}>M.S. (Orth.)</span>
              </h1>
              <p className="mock-hero-desc">
                Consultant Orthopaedic Surgeon &bull; Fellowship-Trained in Joint Replacement, Arthroscopy &amp; Sports Injury &bull; Ahmedabad
              </p>

            </div>
          </div>
        </div>
      </section>

      <section className="about-content-section">
        <div className="shell about-split-layout">
          <div className="about-profile-card">
            <img src="/profile2.webp" alt="Dr. Harshil Shah profile" />
            <div className="about-profile-body">
              <h3>Dr. Harshil Shah</h3>
              <p className="about-role">M.S. (Ortho) · Consultant Orthopaedic Surgeon</p>
              <p className="about-profile-credentials" style={{ fontSize: '0.82rem', color: '#526e75', marginTop: '8px', lineHeight: 1.55 }}>
                Reg. No. G-36119 · Gujarat Medical Council &bull; Consulting at Curis, Sterling, Lilavati and Kakadiya Hospitals in Ahmedabad.
              </p>
            </div>
          </div>

          <div className="about-copy-block">
            <h2>Clinical Philosophy</h2>
            <p>
              Good orthopaedic outcomes depend as much on choosing the right treatment as on performing it well. Every plan starts from an accurate diagnosis, takes the patient&apos;s age, activity, and goals into account, and moves to surgery only when conservative measures have been thoroughly considered.
            </p>

            {/* Desktop Grid (Unchanged on PC) */}
            <div className="about-focus-grid">
              {aboutFocusItems.map((item) => (
                <article key={item.title} className="about-focus-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

            {/* Mobile 1-by-1 Slider (Conditions Treated Concept) */}
            <div className="about-philosophy-mobile-slider">
              <div className="about-philosophy-slider-card-wrap" key={`philo-${currentPhilosophyIndex}`}>
                <article className="about-focus-card about-focus-card-active">

                  <h3>{aboutFocusItems[currentPhilosophyIndex].title}</h3>
                  <p>{aboutFocusItems[currentPhilosophyIndex].text}</p>
                </article>
              </div>

              {/* Slider Controls */}
              <div className="mock-reviews-slider-controls">
                <button
                  type="button"
                  className="mock-slider-btn prev"
                  onClick={prevPhilosophy}
                  aria-label="Previous Principle"
                >
                  &#8592;
                </button>
                <div className="mock-slider-indicator">
                  <span>{currentPhilosophyIndex + 1}</span> / <span>{aboutFocusItems.length}</span>
                </div>
                <button
                  type="button"
                  className="mock-slider-btn next"
                  onClick={nextPhilosophy}
                  aria-label="Next Principle"
                >
                  &#8594;
                </button>
              </div>

              <div className="mock-slider-dots">
                {aboutFocusItems.map((_, dotIdx) => (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`mock-slider-dot${dotIdx === currentPhilosophyIndex ? ' active' : ''}`}
                    onClick={() => setCurrentPhilosophyIndex(dotIdx)}
                    aria-label={`Go to principle ${dotIdx + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="about-experience-section">
        <div className="shell">
          <h2 className="section-title">Training & Clinical Experience</h2>
          <p className="section-subtitle">My training and clinical experience have shaped a practical approach to understanding orthopaedic conditions and planning appropriate care for each patient.</p>

          <div className="about-experience-timeline">
            <nav className="about-experience-nav" aria-label="Experience and training">
              {experienceItems.map((item, index) => {
                const isSelected = selectedExperience === index;
                return (
                  <div key={item.title} className={`about-experience-accordion-group${isSelected ? ' is-active' : ''}`}>
                    <button
                      type="button"
                      className={`about-experience-selector${isSelected ? ' is-active' : ''}`}
                      onClick={() => setSelectedExperience(index)}
                      aria-pressed={isSelected}
                      aria-expanded={isSelected}
                    >
                      <span className="about-experience-selector-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="about-experience-selector-title">{item.title}</span>
                      <span className="about-experience-selector-location">{item.location}</span>
                    </button>

                    {/* Mobile Inline Content: opens directly beneath the clicked option on phones */}
                    {isSelected && (
                      <article className="about-experience-detail about-experience-detail-inline">
                        <div className="about-experience-copy">
                          {item.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                        </div>
                      </article>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Desktop Detail Card: Remains on the right side on desktop screens */}
            {activeExperience && (
              <article className="about-experience-detail about-experience-detail-desktop" key={activeExperience.title}>
                <div className="about-experience-detail-meta" style={{ marginBottom: '14px' }}>
                  <span>{activeExperience.type}</span>
                </div>
                <div className="about-experience-detail-rule" aria-hidden="true" />
                <div className="about-experience-copy">
                  {activeExperience.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </article>
            )}
          </div>
        </div>
      </section>



      <section className="about-camp-section" id="camps-work">
        <div className="shell">
          <h2 className="section-title">Community Health & Awareness</h2>

          <div className="about-camp-container">
            {campItems.map((camp) => (
              <article key={camp.id} className="about-camp-box">
                {/* Left Side: Auto-playing Image Slideshow */}
                <div className="about-camp-left">
                  <CampSlideshow
                    photos={camp.photos}
                    onPhotoClick={setActiveCampPhoto}
                  />
                </div>

                {/* Right Side: Heading, Hospital, and Description */}
                <div className="about-camp-right">
                  <h3 className="about-camp-title">{camp.title}</h3>

                  <p className="about-camp-hospital-text">
                    <strong>Hospital:</strong> {camp.hospital}
                  </p>

                  <p className="about-camp-desc">{camp.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-treatment-section" aria-label="My Expertise">
        <div className="shell">
          <div className="about-expertise-header">

            <h2 className="section-title">My Expertise</h2>
          </div>

          <div className="about-expertise-container">
            <div className="about-expertise-row">
              {expertiseItems.map((item) => (
                <div key={item.title} className="about-expertise-card">
                  <div className="about-expertise-card-header">
                    <span className="about-expertise-num">{item.num}</span>
                    <span className="about-expertise-logo-wrap">
                      <img src={item.icon} alt={item.title} className="about-expertise-logo-img" />
                    </span>
                    <span className="about-expertise-divider-vert" aria-hidden="true"></span>
                    <h3 className="about-expertise-title">{item.title}</h3>
                  </div>
                  <p className="about-expertise-desc">{item.text}</p>
                  <Link to={item.link} className="about-expertise-link">
                    <span className="about-expertise-link-text">LEARN MORE</span>
                    <span className="about-expertise-link-line" aria-hidden="true"></span>
                    <span className="about-expertise-link-icon" aria-hidden="true">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Camp Photo Lightbox Modal */}
      {activeCampPhoto && (
        <div
          className="gallery-modal-backdrop"
          onClick={() => setActiveCampPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-modal-close"
              onClick={() => setActiveCampPhoto(null)}
              aria-label="Close photo preview"
            >
              ✕
            </button>
            <div className="gallery-modal-img-wrap">
              <img src={activeCampPhoto.src} alt={activeCampPhoto.title} />
            </div>
            <div className="gallery-modal-caption">
              <span className="modal-tag">{activeCampPhoto.tag}</span>
              <strong>{activeCampPhoto.title}</strong>
              <p>{activeCampPhoto.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
