import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const experienceItems = [
  {
    type: 'MEDICAL EDUCATION', tone: 'education', location: 'Ahmedabad',
    title: 'Medical Education & Orthopaedic Residency',
    paragraphs: [
      'I completed my MBBS and internship from NHL MMC, Ahmedabad, building a strong base in patient care and surgical thinking.',
      'My orthopaedic training at L.G. Hospital helped me gain practical experience in trauma and reconstructive surgery.'
    ], side: 'left'
  },
  {
    type: 'FELLOWSHIP', tone: 'training', location: 'Mumbai',
    title: 'Joint Replacement Training',
    paragraphs: [
      'I trained in joint replacement surgery at P. D. Hinduja Hospital under Dr. Sanjay Agarwala.',
      'Also learned conservative treatment for hip AVN and knee arthritis.',
      'This experience strengthened my skills in hip and knee replacement care and long-term recovery planning.'
    ], side: 'right'
  },
  {
    type: 'SPECIALIZED TRAINING', tone: 'sports', location: 'Mumbai',
    title: 'Sports Injury & Arthroscopy',
    paragraphs: [
      'I trained at P. D. Hinduja Hospital under Dr. Abhay Narvekar.',
      'Focused on knee arthroscopic and shoulder arthroscopic treatment with the most advanced technology and implants.',
      'Gained specialized training in sports injuries, ligament repair, and joint preservation.'
    ],
    side: 'left'
  },
  {
    type: 'SHOULDER FELLOWSHIP', tone: 'shoulder', location: 'Pune',
    title: 'Shoulder Surgery & Sports Injuries',
    paragraphs: [
      'I pursued advanced shoulder surgery training in Pune under Dr. Ashish Babhulkar.',
      'Specialised in shoulder arthroscopy and reverse shoulder replacement.',
      'This helped me improve care for patients looking to return to active movement and better function.'
    ], side: 'right'
  },
  {
    type: 'INTERNATIONAL FELLOWSHIP · USA', tone: 'usa', location: 'New York, USA',
    title: 'Robotic & Revision Joint Replacement · USA',
    paragraphs: [
      'I trained in robotic and revision joint replacement at Hospital for Special Surgery in New York under Dr. Peter Sculco and Dr. Thomas Sculco.',
      'This advanced learning improved my approach to complex hip and knee surgery.'
    ], side: 'left'
  },
  {
    type: 'AFFILIATED HOSPITALS · MGH', tone: 'harvard', location: 'Boston, USA',
    title: 'Scapulothoracic Disorders & Shoulder Sports Injury',
    paragraphs: [
      'I trained at Massachusetts General Hospital (MGH) in Boston under Dr. Bassem Elhassan.',
      'Focused on scapulothoracic disorders, complex shoulder reconstruction, and shoulder sports injury.',
      'This advanced experience deepened my skills in scapulothoracic disorders and specialized functional recovery.'
    ], side: 'right'
  }
];

const testimonialItems = [
  { quote: '[details dalna baki he]', label: 'Knee Care Patient', detail: '[details dalna baki he]' },
  { quote: '[details dalna baki he]', label: 'Hip Care Patient', detail: '[details dalna baki he]' },
  { quote: '[details dalna baki he]', label: 'Shoulder Care Patient', detail: '[details dalna baki he]' },
  { quote: '[details dalna baki he]', label: 'Sports Injury Patient', detail: '[details dalna baki he]' }
];

const expertiseItems = [
  {
    num: '01',
    title: 'Knee Care',
    link: '/treatments#knee',
    text: 'Ligament injuries, meniscus tears, arthritis, ACL reconstruction (all graft options + LET), robotic & muscle-sparing day-care replacement.'
  },
  {
    num: '02',
    title: 'Shoulder Care',
    link: '/treatments#shoulder',
    text: 'Arthroscopy, rotator cuff injury, frozen shoulder, recurrent dislocation/instability, reverse shoulder replacement.'
  },
  {
    num: '03',
    title: 'Hip Care',
    link: '/treatments#hip',
    text: 'AVN, sports-related hip pain, FAI (femoroacetabular impingement), muscle-sparing anterior approach, day-care & robotic replacement.'
  }
];

const aboutFocusItems = [
  { title: 'Patient-First Treatment', text: 'Every treatment plan is based on your condition, lifestyle, concerns, and recovery goals.' },
  { title: 'Clear Treatment Guidance', text: 'Your diagnosis and treatment options are explained simply, so you can make informed decisions about your care.' },
  { title: 'Focused on Recovery', text: 'Treatment goes beyond relieving pain, with a focus on helping you regain movement and return to everyday activities.' },
  { title: 'Evidence-Based Orthopaedic Care', text: 'Treatment decisions are guided by established medical evidence while being tailored to your individual needs.' }
];

const aboutStats = [
  { label: 'Trauma Surgeries', value: '3000+' },
  { label: 'Joint Replacements', value: '200+' },
  { label: 'Arthroscopy Surgeries', value: '5000+' }
];

const campItems = [
  {
    id: 'camp-bijainagar',
    title: 'Free Joint Replacement & Orthopaedic Camp',
    hospital: 'Shree P. K. V. Hospital and Research Centre',

    description:
      'Free consultation camp conducted by Dr. Harshil Shah for patients suffering from knee, spine, trauma, shoulder, and hip conditions. Provided expert clinical evaluations, joint replacement guidance, and cashless surgical assistance.',
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
  const activeExperience = experienceItems[selectedExperience];

  return (
    <div className="about-page mock-home">
      {/* 1. HERO BANNER (Exact same structure and styling as Home Page) */}
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
                Let’s get you<br />
                <span>Moving again</span>
              </h1>
              <p className="mock-hero-desc">
                Because recovery isn’t just about reducing pain.<br />
                It’s about getting back to what you love.
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
              <ul>
              </ul>
            </div>
          </div>

          <div className="about-copy-block">
            <h2>Orthopaedic Care on Your Recovery</h2>
            <p>
              Quality orthopaedic care begins with understanding the cause of your pain and how it affects your everyday life. The approach is centred on accurate diagnosis, clear treatment guidance, and care tailored to each patient’s condition and needs. Whether you are dealing with joint pain, sports injuries, arthritis, or another orthopaedic concern, the goal is to choose the right treatment for you, recommend surgery only when necessary, and support a safe recovery that helps you return to the activities you value.           </p>

            <div className="about-focus-grid">
              {aboutFocusItems.map((item) => (
                <article key={item.title} className="about-focus-card">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>

          </div>

          <div className="about-stats-grid" aria-label="Surgical experience">
            {aboutStats.map((stat) => (
              <div key={stat.label} className="about-stat-card">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
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
