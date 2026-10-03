import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

const VIDEO_BASE = `${import.meta.env.BASE_URL}galleri/opreation/`;

export const surgicalVideos = [
  {
    id: 1,
    file: 'IMG_3715.MP4',
    src: `${VIDEO_BASE}IMG_3715.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_3715.webp`,
    title: 'Knee Arthroplasty & Precision Alignment',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Robotic Arthroplasty',
    desc: 'Intra-operative robotic alignment and sub-millimeter component placement for total knee restoration.',
    badge: '01 / Robotic Knee'
  },
  {
    id: 2,
    file: 'IMG_3727.MP4',
    src: `${VIDEO_BASE}IMG_3727.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_3727.webp`,
    title: 'Ligament Reconstruction & Arthroscopic Inspection',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Arthroscopy',
    desc: 'High-definition endoscopic visualization and tension verification for cruciate ligament reconstruction.',
    badge: '02 / Arthroscopy'
  },
  {
    id: 3,
    file: 'IMG_3815.MP4',
    src: `${VIDEO_BASE}IMG_3815.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_3815.webp`,
    title: 'Minimally Invasive Joint Preservation',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Joint Preservation',
    desc: 'Targeted bone and cartilage preservation to support early weight-bearing and accelerated mobility.',
    badge: '03 / Joint Preservation'
  },
  {
    id: 4,
    file: 'IMG_4033.MP4',
    src: `${VIDEO_BASE}IMG_4033.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4033.webp`,
    title: 'Hip Reconstruction & Acetabular Preparation',
    category: 'hip',
    categoryName: 'Hip & Reconstruction',
    tag: 'Hip Surgery',
    desc: 'Precision acetabular reaming and anatomical implant orientation for optimal stability and range of motion.',
    badge: '04 / Hip Reconstruction'
  },
  {
    id: 5,
    file: 'IMG_4034.MP4',
    src: `${VIDEO_BASE}IMG_4034.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4034.webp`,
    title: 'Direct Anterior Muscle-Sparing Hip Approach',
    category: 'hip',
    categoryName: 'Hip & Reconstruction',
    tag: 'Muscle-Sparing',
    desc: 'Sparing key musculature to facilitate rapid same-day rehabilitation and reduced post-operative discomfort.',
    badge: '05 / Muscle Sparing'
  },
  {
    id: 6,
    file: 'IMG_4055.MP4',
    src: `${VIDEO_BASE}IMG_4055.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4055.webp`,
    title: 'Shoulder Arthroscopy & Rotator Cuff Repair',
    category: 'shoulder',
    categoryName: 'Shoulder & Sports Medicine',
    tag: 'Shoulder Arthroscopy',
    desc: 'Keyhole suture anchor placement and rotator cuff tendon reattachment with dynamic tensioning.',
    badge: '06 / Shoulder Care'
  },
  {
    id: 7,
    file: 'IMG_4455.MP4',
    src: `${VIDEO_BASE}IMG_4455.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4455.webp`,
    title: 'Glenohumeral Joint Stabilization',
    category: 'shoulder',
    categoryName: 'Shoulder & Sports Medicine',
    tag: 'Shoulder Instability',
    desc: 'Labral repair and anatomical capsule restoration for recurrent shoulder instability and sports recovery.',
    badge: '07 / Shoulder Stabilization'
  },
  {
    id: 8,
    file: 'IMG_4459.MP4',
    src: `${VIDEO_BASE}IMG_4459.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4459.webp`,
    title: 'Robotic Arm Surgical Resurfacing',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Robotic Surgery',
    desc: 'Live stereotactic boundary tracking ensuring zero collateral ligament compromise during bone preparation.',
    badge: '08 / Robotic Precision'
  },
  {
    id: 9,
    file: 'IMG_4841.MP4',
    src: `${VIDEO_BASE}IMG_4841.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4841.webp`,
    title: 'Complex Revision Arthroplasty Procedure',
    category: 'hip',
    categoryName: 'Hip & Reconstruction',
    tag: 'Revision Surgery',
    desc: 'Managing bone loss and structural reconstruction using specialized modular revision implants.',
    badge: '09 / Complex Revision'
  },
  {
    id: 10,
    file: 'IMG_4846.MP4',
    src: `${VIDEO_BASE}IMG_4846.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4846.webp`,
    title: 'Surgical Theatre Workflow & Operative Protocols',
    category: 'theatre',
    categoryName: 'Surgical Theatre & Techniques',
    tag: 'OT Protocol',
    desc: 'Sterile ultra-clean laminar flow operating room setup adhering to international safety protocols.',
    badge: '10 / Theatre Protocol'
  },
  {
    id: 11,
    file: 'IMG_4875.MP4',
    src: `${VIDEO_BASE}IMG_4875.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4875.webp`,
    title: 'Meniscal Repair & Biological Augmentation',
    category: 'shoulder',
    categoryName: 'Shoulder & Sports Medicine',
    tag: 'Sports Injury',
    desc: 'Inside-out meniscal suture repair saving natural cushioning to prevent premature arthritis.',
    badge: '11 / Sports Recovery'
  },
  {
    id: 12,
    file: 'IMG_4891.MP4',
    src: `${VIDEO_BASE}IMG_4891.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_4891.webp`,
    title: 'Subacromial Decompression & Bursectomy',
    category: 'shoulder',
    categoryName: 'Shoulder & Sports Medicine',
    tag: 'Shoulder Keyhole',
    desc: 'Arthroscopic bone spur resection creating frictionless glide for full overhead shoulder range.',
    badge: '12 / Keyhole Shoulder'
  },
  {
    id: 13,
    file: 'IMG_5140.MP4',
    src: `${VIDEO_BASE}IMG_5140.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5140.webp`,
    title: 'Multi-Ligament Knee Reconstruction',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Ligament Repair',
    desc: 'Combined ACL and collateral ligament reconstruction restoring full rotational joint stability.',
    badge: '13 / Multi-Ligament'
  },
  {
    id: 14,
    file: 'IMG_5524.MP4',
    src: `${VIDEO_BASE}IMG_5524.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5524.webp`,
    title: 'Trial Component Kinematic Testing',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Kinematic Alignment',
    desc: 'Dynamic real-time testing of flexion-extension balance and patellar tracking before final seating.',
    badge: '14 / Kinematic Balance'
  },
  {
    id: 15,
    file: 'IMG_5525.MP4',
    src: `${VIDEO_BASE}IMG_5525.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5525.webp`,
    title: 'Day-Care Joint Replacement Protocol',
    category: 'knee',
    categoryName: 'Knee & Robotic Surgery',
    tag: 'Rapid Recovery',
    desc: 'Fast-track surgical execution enabling walking within 3-4 hours post-procedure under ERAS guidelines.',
    badge: '15 / ERAS Pathway'
  },
  {
    id: 16,
    file: 'IMG_5527.MP4',
    src: `${VIDEO_BASE}IMG_5527.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5527.webp`,
    title: 'Femoral Component Impaction & Seating',
    category: 'hip',
    categoryName: 'Hip & Reconstruction',
    tag: 'Hip Arthroplasty',
    desc: 'Precision press-fit seating of hydroxyapatite coated femoral stem for long-term osseointegration.',
    badge: '16 / Precision Hip'
  },
  {
    id: 17,
    file: 'IMG_5528.MP4',
    src: `${VIDEO_BASE}IMG_5528.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5528.webp`,
    title: 'Endoscopic Visualization & Joint Cleansing',
    category: 'theatre',
    categoryName: 'Surgical Theatre & Techniques',
    tag: 'Arthroscopy System',
    desc: 'Ultra-HD 4K camera visualization providing crisp views of joint cartilage and soft tissue borders.',
    badge: '17 / 4K Endoscopy'
  },
  {
    id: 18,
    file: 'IMG_5529.MP4',
    src: `${VIDEO_BASE}IMG_5529.MP4`,
    poster: `${VIDEO_BASE}thumbnails/IMG_5529.webp`,
    title: 'Tissue-Preserving Wound Closure Technique',
    category: 'theatre',
    categoryName: 'Surgical Theatre & Techniques',
    tag: 'Wound Care',
    desc: 'Multi-layer sub-cuticular waterproof suture closure promoting minimal cosmetic scarring.',
    badge: '18 / Cosmetic Closure'
  }
];

const categories = [
  { id: 'all', label: 'All Procedures', shortLabel: 'All Procedures', count: 18 },
  { id: 'knee', label: 'Knee & Robotic Surgery', shortLabel: 'Knee & Robotic', count: 7 },
  { id: 'hip', label: 'Hip & Reconstruction', shortLabel: 'Hip & Joint', count: 4 },
  { id: 'shoulder', label: 'Shoulder & Sports Medicine', shortLabel: 'Shoulder & Sports', count: 4 },
  { id: 'theatre', label: 'Surgical Theatre & Techniques', shortLabel: 'Surgical Theatre', count: 3 }
];

// High-performance video card: loads 30KB WebP poster instantly, previews video smoothly on hover
function LazyVideoCard({ video, onSelect }) {
  const [isHovered, setIsHovered] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (isHovered && videoRef.current) {
      const p = videoRef.current.play();
      if (p !== undefined) p.catch(() => {});
    } else if (!isHovered && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isHovered]);

  return (
    <div
      className="surgical-grid-card"
      onClick={() => onSelect(video)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setVideoReady(false);
      }}
    >
      <div className="surgical-card-media">
        {/* Instant WebP Poster Image */}
        <img
          src={video.poster}
          alt={video.title}
          loading="lazy"
          className="surgical-card-poster"
        />

        {/* Video stream mounted on hover only — zero network bloat on page load */}
        {isHovered && (
          <video
            ref={videoRef}
            src={video.src}
            muted
            loop
            playsInline
            preload="metadata"
            onCanPlay={() => setVideoReady(true)}
            className={`surgical-card-video ${videoReady ? 'is-playing' : ''}`}
          />
        )}

        {/* Center Play Indicator */}
        <div className="surgical-card-play-btn" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
            <polygon points="6 4 20 12 6 20 6 4" />
          </svg>
        </div>

        <div className="surgical-card-overlay-badge">
          <span className="card-badge-num">{video.badge}</span>
          <span className="card-badge-cat">{video.tag}</span>
        </div>

        <div className="surgical-card-hover-actions">
          <span className="card-expand-pill" title="Watch Full Procedure" aria-label="Watch Full Procedure">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 3 21 3 21 9" />
              <polyline points="9 21 3 21 3 15" />
            </svg>
          </span>
        </div>
      </div>

      <div className="surgical-card-info">
        <h3 className="surgical-card-title">{video.title}</h3>
        <p className="surgical-card-desc">{video.desc}</p>
        <div className="surgical-card-footer">
          <span className="surgical-card-action-text">
            Watch Full Procedure
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SurgicalVideosPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [modalVideo, setModalVideo] = useState(null);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const heroVideoRef = useRef(null);
  const modalVideoRef = useRef(null);
  const filterScrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const totalHeroVideos = surgicalVideos.length;

  // Filtered videos for grid
  const filteredVideos = activeCategory === 'all'
    ? surgicalVideos
    : surgicalVideos.filter((v) => v.category === activeCategory);

  // Check filter bar scroll status
  const checkScrollState = useCallback(() => {
    if (filterScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = filterScrollRef.current;
      setCanScrollLeft(scrollLeft > 4);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
    }
  }, []);

  useEffect(() => {
    checkScrollState();
    window.addEventListener('resize', checkScrollState);
    return () => window.removeEventListener('resize', checkScrollState);
  }, [checkScrollState]);

  const scrollFilters = (direction) => {
    if (filterScrollRef.current) {
      const scrollAmount = filterScrollRef.current.clientWidth || 240;
      filterScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      setTimeout(checkScrollState, 320);
    }
  };

  // Next / Prev handlers for hero stage
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalHeroVideos);
    setPlaybackProgress(0);
  }, [totalHeroVideos]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalHeroVideos) % totalHeroVideos);
    setPlaybackProgress(0);
  }, [totalHeroVideos]);

  // When center video ends or auto-advances, go to next video
  const handleHeroVideoEnded = () => {
    if (isAutoPlayEnabled) {
      handleNext();
    }
  };

  // Center video time update for smooth animated progress bar
  const handleHeroTimeUpdate = () => {
    if (heroVideoRef.current && heroVideoRef.current.duration) {
      const pct = (heroVideoRef.current.currentTime / heroVideoRef.current.duration) * 100;
      setPlaybackProgress(pct);
    }
  };

  // When active index changes, force play the center video
  useEffect(() => {
    if (heroVideoRef.current) {
      heroVideoRef.current.currentTime = 0;
      const playPromise = heroVideoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay policy handled silently
        });
      }
    }
  }, [activeIndex]);

  // Keyboard navigation for hero
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalVideo) {
        if (e.key === 'Escape') setModalVideo(null);
        return;
      }
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalVideo, handleNext, handlePrev]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (modalVideo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [modalVideo]);

  const currentVideo = surgicalVideos[activeIndex];

  // Compute 3D stage items: previous, current, next
  const prevIdx = (activeIndex - 1 + totalHeroVideos) % totalHeroVideos;
  const nextIdx = (activeIndex + 1) % totalHeroVideos;

  return (
    <div className="surgical-page">      

      {/* ============================================================
          CATEGORY FILTER TABS & COMPREHENSIVE VIDEO BENTO GRID
          ============================================================ */}
      <section className="surgical-grid-section" id="surgical-archive">
        <div className="shell">
          <div className="surgical-section-heading">
            <div className="eyebrow">
              <span></span> Categorized Video Library
            </div>
            <h2 className="surgical-section-title">Explore by Surgical Specialty</h2>
            <p className="surgical-section-subtitle">
              Click on any procedure video below to inspect anatomical milestones, surgical techniques, and keyhole arthroscopy methods.
            </p>

            {/* Filter Tabs Carousel Track */}
            <div className="surgical-filter-carousel-wrapper">
              <button
                type="button"
                className="surgical-filter-nav-btn prev"
                onClick={() => scrollFilters('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll left filter categories"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <div
                className="surgical-filter-bar"
                ref={filterScrollRef}
                onScroll={checkScrollState}
                role="tablist"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className={`surgical-filter-tab ${activeCategory === cat.id ? 'is-active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    role="tab"
                    aria-selected={activeCategory === cat.id}
                  >
                    <span className="filter-tab-label filter-tab-desktop">{cat.label}</span>
                    <span className="filter-tab-label filter-tab-mobile">{cat.shortLabel || cat.label}</span>
                    <span className="filter-tab-count">{cat.count}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="surgical-filter-nav-btn next"
                onClick={() => scrollFilters('right')}
                disabled={!canScrollRight}
                aria-label="Scroll right filter categories"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Video Grid */}
          <div className="surgical-video-bento-grid">
            {filteredVideos.map((video) => (
              <LazyVideoCard
                key={video.id}
                video={video}
                onSelect={setModalVideo}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          CINEMA LIGHTBOX MODAL VIEWER
          ============================================================ */}
      {modalVideo && (
        <div
          className="surgical-modal-backdrop"
          onClick={() => setModalVideo(null)}
          aria-modal="true"
          role="dialog"
        >
          <div
            className="surgical-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="surgical-modal-close-btn"
              onClick={() => setModalVideo(null)}
              aria-label="Close Video Viewer"
            >
              ✕
            </button>

            <div className="surgical-modal-player-wrap">
              <video
                ref={modalVideoRef}
                src={modalVideo.src}
                poster={modalVideo.poster}
                controls
                muted
                autoPlay
                playsInline
                preload="auto"
                className="surgical-modal-video"
              />
            </div>

            <div className="surgical-modal-info">
              <div className="modal-header-line">
                <span className="modal-cat-tag">{modalVideo.categoryName}</span>
                <span className="modal-file-id">My Clinical Surgical Archive</span>
              </div>
              <h2 className="modal-title">{modalVideo.title}</h2>
              <p className="modal-desc">{modalVideo.desc}</p>

              <div className="modal-action-bar">
                <Link
                  to="/appointment"
                  className="button button-primary"
                  onClick={() => setModalVideo(null)}
                >
                  <span>Book Consultation for this Condition</span>
                </Link>
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => setModalVideo(null)}
                >
                  Close Player
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONSULTATION CTA ── */}
      <section className="surgical-cta-section" aria-labelledby="surgical-cta-heading">
        <div className="shell">
          <div className="surgical-cta-card">
            <div className="surgical-cta-grid">
              <div className="surgical-cta-left">
                <h2 id="surgical-cta-heading" className="surgical-cta-heading">
                  Have Questions About <br />
                  <span className="surgical-cta-accent">Your Surgery Options?</span>
                </h2>
                <p className="surgical-cta-desc">
                  Discuss robotic precision, expected recovery timelines, and joint preservation during a personalized clinical consultation.
                </p>
                <p className="surgical-cta-sub">
                </p>
              </div>
              <div className="surgical-cta-right">
                <Link to="/appointment" className="surgical-cta-primary">
                  <span>Book an Appointment</span>
                  <span className="surgical-cta-arrow">&rarr;</span>
                </Link>

                <a
                  href="https://wa.me/917874904030?text=Hello%2C%20I%20have%20questions%20regarding%20surgical%20options."
                  target="_blank"
                  rel="noreferrer"
                  className="surgical-cta-whatsapp"
                >
                  <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
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
