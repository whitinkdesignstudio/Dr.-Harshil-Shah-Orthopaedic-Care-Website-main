import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function GalleryPage() {
  const [searchParams] = useSearchParams();
  const catParam = searchParams.get('category');
  const [activeCategory, setActiveCategory] = useState(catParam || 'all');
  const [activeModalImg, setActiveModalImg] = useState(null);
  const [visibleCardIds, setVisibleCardIds] = useState(new Set());
  const cardRefs = useRef({});
  const filterScrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  useEffect(() => {
    if (catParam) {
      setActiveCategory(catParam);
      setVisibleCardIds(new Set());
    } else {
      setActiveCategory('all');
    }
  }, [catParam]);

  const categories = [
    { id: 'all', label: 'All', desc: 'Complete visual timeline of surgical practice and patient care' },
    { id: 'clinical-practice', label: 'Clinical Practice', desc: 'Outpatient consultations, diagnostics, and patient care planning' },
    { id: 'surgical-theatre', label: 'Surgical Theatre', desc: 'High-precision robotic surgeries, joint replacements, and arthroscopy' },
    { id: 'academic-training', label: 'Academic & Training', desc: 'Faculty presentations, cadaveric workshops, and clinical masterclasses' },
    { id: 'professional-journey', label: 'Professional Journey', desc: 'Scientific research, clinical papers, and specialist fellowships' },
    { id: 'patient-care', label: 'Patient Care', desc: 'Post-op mobility restoration, personalized counseling, and rehabilitation' }
  ];

  // Reset and re-trigger observer on filter category change
  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
    setVisibleCardIds(new Set());
  };

  const updateScrollButtons = useCallback(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 6);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener('scroll', updateScrollButtons, { passive: true });
    window.addEventListener('resize', updateScrollButtons);
    return () => {
      el.removeEventListener('scroll', updateScrollButtons);
      window.removeEventListener('resize', updateScrollButtons);
    };
  }, [updateScrollButtons]);

  const scrollFilters = (direction) => {
    const el = filterScrollRef.current;
    if (!el) return;
    const distance = 260;
    el.scrollBy({
      left: direction === 'left' ? -distance : distance,
      behavior: 'smooth'
    });
  };

  const DOCTOR_IMG_BASE = `${import.meta.env.BASE_URL}galleri/docter img/`;

  const galleryItems = [
    {
      id: 9,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.47.57 PM.webp`,
      tag: 'Professional Journey',
      title: 'Consultant Orthopaedics Appointment',
      subtitle: 'Welcoming Dr. Harshil Shah — Specialist in robotic joint care & arthroscopy',
      size: 'small', // 1x1
      anim: 'left-to-right',
      category: 'professional-journey'
    },
    {
      id: 10,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.47.58 PM.webp`,
      tag: 'Clinical Practice',
      title: 'Pre-Op Patient Consultation & Guidance',
      subtitle: 'Addressing queries with clarity and empathy',
      size: 'big', // 2x2
      anim: 'right-to-left',
      category: 'clinical-practice'
    },
    {
      id: 11,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.47.58 PM (1).webp`,
      tag: 'Professional Journey',
      title: 'Massachusetts General Hospital — Outpatient Surgery Center',
      subtitle: 'Advanced surgical fellowship & clinical experience at Mass General Brigham, USA',
      size: 'column', // 1x2 tall
      anim: 'top-to-bottom',
      category: 'professional-journey'
    },
    {
      id: 12,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.47.58 PM (2).webp`,
      tag: 'Academic & Training',
      title: 'Advanced Joint Cadaveric Lab Training',
      subtitle: 'Refining complex revision techniques',
      size: 'small', // 1x1
      anim: 'bottom-to-top',
      category: 'academic-training'
    },
    {
      id: 13,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.47.59 PM.webp`,
      tag: 'Professional Journey',
      title: 'Massachusetts General Hospital, USA',
      subtitle: 'Clinical fellowship & training at Harvard-affiliated medical centre',
      size: 'small', // 1x1
      anim: 'left-to-right',
      category: 'professional-journey'
    },
    {
      id: 14,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.00 PM.webp`,
      tag: 'Professional Journey',
      title: 'Scientific Paper Presentation',
      subtitle: 'Outcomes in rapid-recovery joint pathways',
      size: 'small', // 1x1
      anim: 'right-to-left',
      category: 'professional-journey'
    },
    {
      id: 15,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.01 PM.webp`,
      tag: 'Professional Journey',
      title: 'Practical Do\'s & Don\'ts in Robotic Surgery',
      subtitle: 'Keynote presentation at Curis Hospitals clinical forum',
      size: 'small', // 1x1
      anim: 'top-to-bottom',
      category: 'professional-journey'
    },
    {
      id: 16,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.01 PM (1).webp`,
      tag: 'Professional Journey',
      title: 'Times Healthcare Leaders Gujarat Award',
      subtitle: 'Recognition & honors presented by Optimal Media Solutions (Times of India)',
      size: 'small', // 1x1
      anim: 'bottom-to-top',
      category: 'professional-journey'
    },
    {
      id: 17,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.02 PM.jpeg`,
      tag: 'Academic & Training',
      title: 'International Faculty Interaction',
      subtitle: 'Exchanging clinical insights with global specialists',
      size: 'column', // 1x2 tall
      anim: 'left-to-right',
      category: 'academic-training'
    },
    {
      id: 18,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.02 PM (1).webp`,
      tag: 'Surgical Theatre',
      title: 'Shoulder Arthroscopy in Progress',
      subtitle: 'Keyhole repair of rotator cuff and labrum',
      size: 'big', // 2x2
      anim: 'right-to-left',
      category: 'surgical-theatre'
    },
    {
      id: 20,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.03 PM.webp`,
      tag: 'Surgical Theatre',
      title: 'Minimally Invasive Joint Arthroscopy',
      subtitle: 'Live arthroscopic visualisation and keyhole ligament reconstruction',
      size: 'small', // 1x1
      anim: 'bottom-to-top',
      category: 'surgical-theatre'
    },
    {
      id: 21,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.03 PM (1).webp`,
      tag: 'Surgical Theatre',
      title: 'Pre-Operative Check & Surgical Readiness',
      subtitle: 'Ensuring utmost patient safety and surgical readiness',
      size: 'row', // 2x1 wide
      anim: 'left-to-right',
      category: 'surgical-theatre'
    },
    {
      id: 23,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.04 PM (1).webp`,
      tag: 'Professional Journey',
      title: 'Specialized Arthroplasty Certification',
      subtitle: 'Dedication to advanced clinical mastery',
      size: 'small', // 1x1
      anim: 'top-to-bottom',
      category: 'professional-journey'
    },
    {
      id: 24,
      src: `${DOCTOR_IMG_BASE}WhatsApp Image 2026-08-24 at 12.48.04 PM (2).webp`,
      tag: 'Surgical Theatre',
      title: 'Knee Preservation & Realignment',
      subtitle: 'High tibial osteotomy and cartilage restoration',
      size: 'small', // 1x1
      anim: 'bottom-to-top',
      category: 'surgical-theatre'
    },
    {
      id: 26,
      src: `${DOCTOR_IMG_BASE}IMG_2517.jpg`,
      tag: 'Patient Care',
      title: 'Clinical Joint Assessment & Mobility Check',
      subtitle: 'Hands-on knee evaluation, ligament assessment and personalized patient recovery guidance',
      size: 'column', // 1x2 tall
      anim: 'left-to-right',
      category: 'patient-care'
    }
  ];

  const filteredItems = activeCategory === 'all'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  // IntersectionObserver: Animate cards when user scrolls down to them
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.dataset.id);
          if (entry.isIntersecting) {
            setVisibleCardIds((prev) => new Set([...prev, id]));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    Object.values(cardRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filteredItems]);

  return (
    <div className="gallery-page-wrapper">
      {/* Visual Hero */}
      <section className="gallery-hero-custom">
        <div className="gallery-hero-bg-glow"></div>
        <div className="shell gallery-hero-grid">
          <div className="gallery-hero-content">
            <h1 className="gallery-hero-title">
              Moments from a journey of care.
            </h1>
            <p className="gallery-hero-subtitle">
              A comprehensive visual journey through my clinical practice, advanced joint procedures, academic forums, and surgical training milestones.
            </p>
          </div>

          <div className="gallery-hero-visual-panel" aria-hidden="true">
            <div className="gallery-hero-showcase-card">
              <div className="hero-3d-models-wrap">
                <img className="hero-3d-img hero-3d-shoulder" src="/shoulder-3d.webp" alt="3D Shoulder Joint" />
                <img className="hero-3d-img hero-3d-knee" src="/knee-3d.webp" alt="3D Knee Joint" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Dedicated Categories Section */}
      <section className="section gallery-categories-section" id="gallery-categories">
        <div className="shell">
          <div className="gallery-categories-header">

            <h2 className="gallery-categories-title">
              Visual Gallery &amp; Albums
            </h2>

          </div>

          <div className="faq-topics-selection-wrapper gallery-filter-selection-wrapper">
            <button
              type="button"
              className="faq-topics-nav-btn"
              onClick={() => scrollFilters('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll categories left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="faq-topics-scroll-row" ref={filterScrollRef} role="tablist" aria-label="Browse categories">
              {categories.map((cat) => {
                const count = cat.id === 'all'
                  ? galleryItems.length
                  : galleryItems.filter((i) => i.category === cat.id).length;
                const isActive = activeCategory === cat.id;

                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`faq-topic-tab ${isActive ? 'faq-topic-tab--active' : ''}`}
                    onClick={() => handleCategoryChange(cat.id)}
                  >
                    <span className="faq-topic-tab-name">{cat.label}</span>
                    <span className="faq-topic-tab-count">{count}</span>
                  </button>
                );
              })}

              <Link
                to="/operation-theatre"
                className="faq-topic-tab"
                title="Watch high-definition surgical recordings"
                style={{ textDecoration: 'none' }}
              >
                <span className="faq-topic-tab-name">Surgical &amp; OT Videos</span>
                <span className="faq-topic-tab-count" style={{ background: '#e0f2f1', color: '#146c72', fontWeight: 800 }}>18</span>
              </Link>
            </div>

            <button
              type="button"
              className="faq-topics-nav-btn"
              onClick={() => scrollFilters('right')}
              disabled={!canScrollRight}
              aria-label="Scroll categories right"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>


        </div>
      </section>

      {/* Bento Mosaic Dynamic Animated Grid */}
      <section className="section gallery-bento-section">
        <div className="shell">
          <div className="gallery-bento-grid">
            {filteredItems.map((item, index) => {
              const isInView = visibleCardIds.has(item.id);
              return (
                <div
                  key={item.id}
                  ref={(el) => (cardRefs.current[item.id] = el)}
                  data-id={item.id}
                  className={`gallery-bento-card gallery-card-uniform anim-${item.anim} ${isInView ? 'is-in-view' : 'is-hidden'}`}
                  style={{ animationDelay: `${(index % 3) * 0.12}s` }}
                  onClick={() => setActiveModalImg(item)}
                >
                  <div className="gallery-card-inner">
                    <img
                      src={item.src}
                      alt={item.title}
                      className="gallery-card-img"
                      loading="lazy"
                    />

                    {/* Glassmorphic Overlay Gradient */}
                    <div className="gallery-card-gradient"></div>

                    {/* Top Badge */}
                    <div className="gallery-card-tag">
                      <span>{item.tag}</span>
                    </div>

                    {/* Hover Zoom Icon */}
                    <div className="gallery-zoom-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>

                    {/* Bottom Captions */}
                    <div className="gallery-card-info">
                      <h3>{item.title}</h3>
                      <p>{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {activeModalImg && (
        <div
          className="gallery-modal-backdrop"
          onClick={() => setActiveModalImg(null)}
        >
          <div
            className="gallery-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery-modal-close"
              onClick={() => setActiveModalImg(null)}
              aria-label="Close lightbox"
            >
              ✕
            </button>
            <div className="gallery-modal-img-wrap">
              <img src={activeModalImg.src} alt={activeModalImg.title} />
            </div>
            <div className="gallery-modal-caption">
              <span className="modal-tag">{activeModalImg.tag}</span>
              <strong>{activeModalImg.title}</strong>
              <p>{activeModalImg.subtitle}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
