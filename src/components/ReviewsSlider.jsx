import React, { useState, useEffect, useRef } from 'react';

const REVIEWS = [
  {
    id: 1,
    name: 'Rushabh Shah',
    avatar: 'RS',
    avatarColor: '#1e40af',
    meta: '9 reviews',
    rating: 5,
    time: 'a month ago',
    text: 'Best surgeon for any orthopaedic treatment. He is very supportive and gives proper attention to every patient. I consulted him for my mother’s right total knee replacement (TKR) surgery. Thanks to his excellent surgical skills, guidance, and post-op care, she recovered smoothly.',
    ownerReply: 'Thank you for your kind words.'
  },
  {
    id: 2,
    name: 'Nilesh Patel',
    avatar: 'N',
    avatarColor: '#7c3aed',
    meta: '2 reviews',
    rating: 5,
    time: '4 months ago',
    text: '“Dr. Harshil shah ek behtareen orthopedic surgeon hain. Unhone meri surgery bahut safalta-purvak ki. Unka treatment aur nature dono hi bahut supportive hain.”'
  },
  {
    id: 3,
    name: 'Uma Santoki',
    avatar: 'U',
    avatarColor: '#0284c7',
    meta: '5 reviews',
    rating: 5,
    time: '3 months ago',
    text: 'Best orthopaedic surgeon. Compassionate care and excellent expertise. Thank you for your kind service. 😊'
  },
  {
    id: 4,
    name: 'MAHENDRA PAREKH',
    avatar: 'M',
    avatarColor: '#0369a1',
    meta: '1 review',
    rating: 5,
    time: '3 months ago',
    text: 'Dr Harshil shah is very nice doctor to do operations and treatments also.'
  },
  {
    id: 5,
    name: 'HIMANSHU K',
    avatar: 'H',
    avatarColor: '#4f46e5',
    meta: 'Local Guide · 23 reviews',
    isLocalGuide: true,
    rating: 5,
    time: '4 months ago',
    text: 'Best Orthopedic Surgeon at Lilavati Clinic Ahmedabad. Very knowledgeable and polite doctor.'
  },
  {
    id: 6,
    name: 'Manish Agarwal',
    avatar: 'MA',
    avatarColor: '#059669',
    meta: '5 reviews · 11 photos',
    rating: 5,
    time: '3 months ago',
    text: 'Best doctor and bast treatment. Good facility happy 😊'
  },
  {
    id: 7,
    name: 'Parmar Sanjay',
    avatar: 'P',
    avatarColor: '#b45309',
    meta: '2 reviews',
    rating: 5,
    time: '2 months ago',
    text: 'Best doctor best treatment thank you sir my life change.'
  }
];

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Determine cards per view based on window width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, REVIEWS.length - cardsPerView);

  // Auto slide smoothly every 1 second
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [maxIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 40) {
      handleNext();
    }
    if (touchStartX.current - touchEndX.current < -40) {
      handlePrev();
    }
  };

  const totalDots = maxIndex + 1;

  return (
    <section
      className="reviews-section"
      aria-label="Verified Patient Reviews"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="shell">
        {/* Compact Header */}
        <div className="reviews-header-wrap">
          <div className="reviews-header-left">
            <h2 className="reviews-main-title">
              What our patients <span>say about us</span>
            </h2>
            <p className="reviews-main-desc">
              Verified Google reviews from patients and families treated by Dr. Harshil Shah in Ahmedabad.
            </p>
          </div>

          {/* Google Badge */}
          <div className="reviews-google-badge">
            <div className="google-badge-top">
              <svg viewBox="0 0 24 24" width="22" height="22" className="google-icon" aria-hidden="true">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              <div className="google-badge-score">
                <strong>5.0</strong>
                <div className="google-stars" aria-label="5 out of 5 stars">
                  ★★★★★
                </div>
              </div>
            </div>
            <a
              href="https://share.google/MBpDzvqtecRuH4gf8"
              target="_blank"
              rel="noreferrer"
              className="google-badge-link"
            >
              <span>View all Google Reviews</span>
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Carousel Multi-card Track */}
        <div
          className="reviews-carousel-track"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="reviews-cards-wrapper"
            style={{
              transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)`,
              transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          >
            {REVIEWS.map((rev) => (
              <div
                key={rev.id}
                className="review-slide-item"
                style={{ width: `${100 / cardsPerView}%`, flex: `0 0 ${100 / cardsPerView}%` }}
              >
                <div className="review-card-modern">
                  {/* Top: Avatar, Name & Google G */}
                  <div className="review-card-header">
                    <div className="review-user-row">
                      <div
                        className="review-avatar-circle"
                        style={{ backgroundColor: rev.avatarColor }}
                      >
                        {rev.avatar}
                      </div>
                      <div className="review-user-info">
                        <div className="review-user-name">
                          <strong>{rev.name}</strong>
                          {rev.isLocalGuide && (
                            <span className="local-guide-pill">★ Local Guide</span>
                          )}
                        </div>
                        <span className="review-meta-text">{rev.meta}</span>
                      </div>
                    </div>

                    <div className="review-google-badge-mini" title="Google Review">
                      <svg viewBox="0 0 24 24" width="17" height="17">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                          fill="#EA4335"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Stars + Time */}
                  <div className="review-rating-row">
                    <div className="review-stars-gold">★★★★★</div>
                    <span className="review-time-stamp">{rev.time}</span>
                  </div>

                  {/* Review Text */}
                  <p className="review-card-text">{rev.text}</p>

                  {/* Owner Response */}
                  {rev.ownerReply && (
                    <div className="review-owner-response">
                      <small>Response from owner: {rev.ownerReply}</small>
                    </div>
                  )}

                  {/* Verified Tag */}
                  <div className="review-bottom-actions">
                    <span className="review-verified-tag">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Verified Patient
                    </span>
                    <a
                      href="https://share.google/MBpDzvqtecRuH4gf8"
                      target="_blank"
                      rel="noreferrer"
                      className="review-view-original"
                    >
                      Google Review ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Controls */}
        <div className="reviews-controls-row">
          <button
            type="button"
            className="reviews-nav-btn reviews-btn-prev"
            onClick={handlePrev}
            aria-label="Previous reviews"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="reviews-dots-group">
            {Array.from({ length: totalDots }).map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`reviews-dot ${currentIndex === idx ? 'is-active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide to review group ${idx + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="reviews-nav-btn reviews-btn-next"
            onClick={handleNext}
            aria-label="Next reviews"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
