import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Interactive3DViewer from '../components/Interactive3DViewer';
import ErrorBoundary from '../components/ErrorBoundary';
import SEO from '../components/SEO';

const TREATMENT_FAQS = [
  {
    id: 'treatment-faq-1',
    question: 'What joint conditions and treatments do you specialize in?',
    answer: 'My clinical practice focuses on disorders of the knee, hip, and shoulder. This includes robotic-assisted joint replacement, revision surgery, keyhole arthroscopy for sports injuries (such as ACL and meniscus tears), rotator cuff repairs, and structured non-surgical joint preservation.'
  },
  {
    id: 'treatment-faq-2',
    question: 'Can my knee pain be treated without undergoing surgery?',
    answer: 'Yes, in many cases. Early-stage osteoarthritis, mild meniscal tears, tendonitis, and ligament sprains often improve significantly with non-surgical management. I routinely prescribe targeted physiotherapy, muscle strengthening, lifestyle modifications, and medication before ever considering a procedure.'
  },
  {
    id: 'treatment-faq-3',
    question: 'What treatment options are available for hip pain and arthritis?',
    answer: 'For early hip discomfort, bursitis, or mild wear, we focus on muscle-strengthening exercises, gait correction, and medical therapy. When advanced arthritis or avascular necrosis (AVN) causes persistent pain and stiffness, modern muscle-sparing hip replacement offers dependable, long-term pain relief and restores natural walking.'
  },
  {
    id: 'treatment-faq-4',
    question: 'How do you approach shoulder pain and rotator cuff tears?',
    answer: 'My approach depends on your specific diagnosis. Frozen shoulder and mild tendinopathy often respond very well to guided physiotherapy and anti-inflammatory care. For structural issues like full-thickness rotator cuff tears or recurring dislocations, I perform minimally invasive keyhole arthroscopy to repair tendons and stabilize the joint.'
  },
  {
    id: 'treatment-faq-5',
    question: 'When is keyhole arthroscopic surgery recommended?',
    answer: 'I recommend arthroscopy when internal joint structures—such as torn cruciate ligaments (ACL/PCL), damaged meniscus cartilage, or torn shoulder labrums—cannot heal through therapy alone. By using miniature cameras and precision instruments through tiny keyhole incisions, we minimize muscle trauma and accelerate recovery.'
  },
  {
    id: 'treatment-faq-6',
    question: 'How do we decide if joint replacement is necessary?',
    answer: 'We consider joint replacement only when joint wear or avascular necrosis causes persistent pain and restricted mobility that no longer responds to non-surgical care. The decision is made together after a careful clinical exam and scan review, focusing on your quality of life rather than age alone.'
  },
  {
    id: 'treatment-faq-7',
    question: 'How do you treat sports injuries such as ACL or meniscus tears?',
    answer: 'Treatment is tailored to your activity level and the severity of the injury. Minor sprains can often heal with structured bracing and rehabilitation. For active patients with complete ACL tears or repairable meniscus injuries, I perform anatomical keyhole reconstruction to restore joint stability and protect long-term cartilage health.'
  },
  {
    id: 'treatment-faq-8',
    question: 'How do you determine the best treatment plan for me?',
    answer: 'I combine a comprehensive physical examination, an in-depth review of your X-rays or MRI scans, and an honest conversation about your daily activities and goals. I explain every sensible option in plain language so that we can choose the safest, most effective path together.'
  }
];

const moreCareData = [
  {
    id: 1,
    image: '/galleri/brochure/sports-injury-care-guide.jpg',
    title: 'Sports Injury Care',
    desc: 'Specialized assessment and return-to-sport pathways for ligament, meniscus, and joint overload injuries in active individuals.',
  },
  {
    id: 2,
    image: '/galleri/brochure/conservative-treatment-guide.jpg',
    title: 'Conservative Treatment',
    desc: 'Stage-appropriate non-surgical options—including targeted physical therapy, joint preservation protocols, and lifestyle adjustments.',
  },
  {
    id: 3,
    image: '/galleri/brochure/structured-rehabilitation-guide.jpg',
    title: 'Structured Rehabilitation',
    desc: 'Tailored physiotherapy milestones designed with clear goals so you can track your strength and mobility progress every week.',
  },
];

export default function TreatmentsPage() {
  const location = useLocation();
  const [activeJointTab, setActiveJointTab] = useState('knee');
  const [openFaqId, setOpenFaqId] = useState(null);
  const [currentCareIndex, setCurrentCareIndex] = useState(0);

  const prevCare = () => {
    setCurrentCareIndex((prev) => (prev === 0 ? moreCareData.length - 1 : prev - 1));
  };

  const nextCare = () => {
    setCurrentCareIndex((prev) => (prev === moreCareData.length - 1 ? 0 : prev + 1));
  };

  const scrollToSection = (id) => {
    setActiveJointTab(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const headerEl = document.querySelector('.site-header');
        const dirEl = document.querySelector('.treatment-directory');
        const headerH = headerEl ? headerEl.offsetHeight : 70;
        const dirH = dirEl ? dirEl.offsetHeight : 60;
        const totalOffset = headerH + dirH + 16;
        const elementPosition = el.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - totalOffset;
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }
    }, 40);
  };

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      if (['knee', 'hip', 'shoulder', 'more'].includes(targetId)) {
        setActiveJointTab(targetId);
        setTimeout(() => {
          scrollToSection(targetId);
        }, 180);
      }
    }
  }, [location.hash]);

  const toggleFaq = (id) => {
    setOpenFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="treatments-page">
      <SEO
        title="Orthopaedic Treatments | Dr. Harshil Shah Ahmedabad"
        description="Explore specialist orthopaedic treatments by Dr. Harshil Shah in Ahmedabad: robotic knee replacement, hip replacement, arthroscopy, and sports injury care."
        canonicalUrl="/treatments"
        keywords="robotic knee replacement Ahmedabad, hip replacement surgery, shoulder arthroscopy, ACL reconstruction Gujarat, sports injury doctor"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'MedicalWebPage',
              name: 'Orthopaedic Treatments & Procedures',
              url: 'https://drharshilshah.com/treatments',
              description: 'Detailed clinical guide to surgical and non-surgical treatments for knee, hip, and shoulder joint conditions.',
              about: ['Knee Replacement', 'Hip Replacement', 'Shoulder Arthroscopy', 'Joint Preservation']
            },
            {
              '@type': 'FAQPage',
              mainEntity: TREATMENT_FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.answer
                }
              }))
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://drharshilshah.com/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Treatments',
                  item: 'https://drharshilshah.com/treatments'
                }
              ]
            }
          ]
        }}
      />
      {/* Hero Banner */}
      <section className="treatment-hero-image-banner" aria-label="Treatments Hero Banner" style={{ width: '100%', lineHeight: 0 }}>
        <picture style={{ display: 'block', width: '100%' }}>
          <source media="(max-width: 768px)" srcSet="/galleri/treatmentpage-phone-banner.png" />
          <img
            src="/galleri/Treatment-banner-pc.png"
            alt="Care Focused on Better Movement and Recovery - Dr. Harshil Shah"
            style={{ width: '100%', height: 'auto', display: 'block' }}
            loading="eager"
          />
        </picture>
      </section>

      {/* Real 3D Interactive Joint Anatomy Explorer */}
      <section className="treatment-3d-section" id="3d-explorer" aria-label="Interactive 3D Joint Anatomy">
        <div className="shell">
          <div className="treatment-3d-header">
            <h2 className="treatment-3d-title">Understand Your Joint Health in 3D</h2>
            <p className="treatment-3d-subtitle">
              I believe informed patients make the best recovery choices. Explore the interactive 3D model below to see the key ligaments, tendons, and cartilage structures of the knee, hip, and shoulder.
            </p>
          </div>

          <ErrorBoundary
            fallback={
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: 'rgba(15, 23, 42, 0.6)',
                borderRadius: '16px',
                color: '#e2e8f0'
              }}>
                <img
                  src={`${import.meta.env.BASE_URL}${activeJointTab === 'more' ? 'knee' : activeJointTab}-3d.webp`}
                  alt="Joint Anatomy"
                  style={{ maxHeight: '220px', objectFit: 'contain', margin: '0 auto 16px' }}
                />
                <h4 style={{ color: '#3bb3bc', marginBottom: '8px' }}>Specialist Orthopaedic Anatomy</h4>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto 16px' }}>
                  Explore specific knee, hip, and shoulder conditions and surgical treatments in the sections below.
                </p>
                <button
                  type="button"
                  className="button button-outline"
                  onClick={() => scrollToSection(activeJointTab === 'more' ? 'knee' : activeJointTab)}
                >
                  View Treatment Options
                </button>
              </div>
            }
          >
            <Interactive3DViewer
              initialJoint={activeJointTab}
              onSelectTreatment={(joint) => scrollToSection(joint)}
              onJointChange={(joint) => setActiveJointTab(joint)}
            />
          </ErrorBoundary>
        </div>
      </section>

      {/* Directory Nav & Sections */}
      <section className="treatment-directory" id="treatment-nav">
        <div className="shell">
          <div className="treatment-tabs-bar">
            <div className="treatment-tabs-label">
              <span className="tabs-live-dot"></span>
              <span>Explore By Joint</span>
            </div>
            <div className="treatment-tabs-list">
              <button
                type="button"
                className={`treatment-tab-pill ${activeJointTab === 'knee' ? 'active' : ''}`}
                onClick={() => scrollToSection('knee')}
              >
                Knee Care
              </button>
              <button
                type="button"
                className={`treatment-tab-pill ${activeJointTab === 'hip' ? 'active' : ''}`}
                onClick={() => scrollToSection('hip')}
              >
                Hip Care
              </button>
              <button
                type="button"
                className={`treatment-tab-pill ${activeJointTab === 'shoulder' ? 'active' : ''}`}
                onClick={() => scrollToSection('shoulder')}
              >
                Shoulder Care
              </button>
              <button
                type="button"
                className={`treatment-tab-pill ${activeJointTab === 'more' ? 'active' : ''}`}
                onClick={() => scrollToSection('more')}
              >
                More Care
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Knee Section */}
      <section className="treatment-row" id="knee">
        <div className="shell treatment-row-grid">
          <div className="treatment-joint-visual">
            <img src="/knee-3d.webp" alt="3D Knee joint medical visualization" />
          </div>
          <div className="treatment-detail">
            <div className="eyebrow">
              <span></span> Knee Care
            </div>
            <h2>
              Knee conditions &amp;
              <br />
              <em>treatment options.</em>
            </h2>
            <p>
              Whether you are experiencing knee stiffness on stairs, persistent arthritis pain, or an acute sports ligament injury, my focus is on preserving your natural joint and restoring stable, comfortable movement.
            </p>
            <div className="treatment-list">
              <div className="treatment-list-item">
                <span>01</span>
                <strong>Robotic &amp; muscle-sparing knee replacement</strong>
              </div>
              <div className="treatment-list-item">
                <span>02</span>
                <strong>Keyhole arthroscopy for meniscus &amp; cartilage repair</strong>
              </div>
              <div className="treatment-list-item">
                <span>03</span>
                <strong>ACL &amp; multi-ligament reconstruction</strong>
              </div>
              <div className="treatment-list-item">
                <span>04</span>
                <strong>Lateral extra-articular tenodesis (LET) for rotary stability</strong>
              </div>
              <div className="treatment-list-item">
                <span>05</span>
                <strong>Non-surgical joint preservation &amp; rapid recovery pathways</strong>
              </div>
            </div>
            <div className="treatment-action-group">
              <a
                href="/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="treatment-brochure-quicklink"
                title="Download Knee Replacement Patient Guide (PDF)"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <span>Knee Guide (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Hip Section */}
      <section className="treatment-row treatment-row-alt" id="hip">
        <div className="shell treatment-row-grid">
          <div className="treatment-joint-visual">
            <img src="/hip-3d.webp" alt="3D Hip joint medical visualization" />
          </div>
          <div className="treatment-detail">
            <div className="eyebrow">
              <span></span> Hip Care
            </div>
            <h2>
              Hip conditions &amp;
              <br />
              <em>treatment options.</em>
            </h2>
            <p>
              I evaluate groin discomfort, deep joint stiffness, avascular necrosis, and cartilage wear to help you regain comfortable walking and active mobility without lingering hip pain.
            </p>
            <div className="treatment-list">
              <div className="treatment-list-item">
                <span>01</span>
                <strong>Direct anterior &amp; muscle-sparing hip replacement</strong>
              </div>
              <div className="treatment-list-item">
                <span>02</span>
                <strong>Avascular necrosis (AVN) early-stage joint preservation</strong>
              </div>
              <div className="treatment-list-item">
                <span>03</span>
                <strong>Robotic-guided total hip reconstruction</strong>
              </div>
              <div className="treatment-list-item">
                <span>04</span>
                <strong>Femoroacetabular impingement (FAI) care</strong>
              </div>
              <div className="treatment-list-item">
                <span>05</span>
                <strong>Rapid recovery &amp; day-care mobility pathways</strong>
              </div>
            </div>
            <div className="treatment-action-group">
              <a
                href="/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="treatment-brochure-quicklink"
                title="Download Hip Replacement Patient Guide (PDF)"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <span>Hip Guide (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shoulder Section */}
      <section className="treatment-row" id="shoulder">
        <div className="shell treatment-row-grid">
          <div className="treatment-joint-visual">
            <img src="/shoulder-3d.webp" alt="3D Shoulder joint medical visualization" />
          </div>
          <div className="treatment-detail">
            <div className="eyebrow">
              <span></span> Shoulder Care
            </div>
            <h2>
              Shoulder conditions &amp;
              <br />
              <em>treatment options.</em>
            </h2>
            <p>
              Whether you struggle with sleep-disturbing night pain, recurrent dislocations, or restricted overhead reach, I focus on restoring shoulder stability, rotator cuff strength, and easy daily function.
            </p>
            <div className="treatment-list">
              <div className="treatment-list-item">
                <span>01</span>
                <strong>Keyhole arthroscopic rotator cuff repair</strong>
              </div>
              <div className="treatment-list-item">
                <span>02</span>
                <strong>Shoulder stabilization for recurrent dislocations</strong>
              </div>
              <div className="treatment-list-item">
                <span>03</span>
                <strong>Reverse &amp; anatomical shoulder replacement</strong>
              </div>
              <div className="treatment-list-item">
                <span>04</span>
                <strong>Frozen shoulder hydrodilatation &amp; release</strong>
              </div>
              <div className="treatment-list-item">
                <span>05</span>
                <strong>Acromioplasty &amp; subacromial decompression</strong>
              </div>
            </div>
            <div className="treatment-action-group">
              <a
                href="/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="treatment-brochure-quicklink"
                title="Download Shoulder Arthroscopy Patient Guide (PDF)"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
                <span>Shoulder Guide (PDF)</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Recovery Guides Feature */}
      <section className="section treatment-guides-feature">
        <div className="shell treatment-guides-grid">
          <div className="treatment-guides-copy">
            <h2>
              A structured recovery plan
              <br />
              <em>designed for clarity.</em>
            </h2>
            <p>
              Recovery is a partnership. Alongside your clinical visits, I provide clear visual guides so you and your family know exactly what to do before treatment, during early healing, and throughout your rehabilitation milestones.
            </p>
            <div className="treatment-guide-notes">
              <span>
                <b>01</b> Preparation &amp; pre-hab
              </span>
              <span>
                <b>02</b> Safe early movement
              </span>
              <span>
                <b>03</b> Guided rehabilitation
              </span>
            </div>
            <div style={{ marginTop: '28px', display: 'flex', gap: '14px', flexWrap: 'wrap', alignItems: 'center' }}>
              <Link to="/brochures" className="button button-primary">
                Download All Patient PDFs
              </Link>
              <Link to="/appointment" className="button button-outline">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* More Specialist Care */}
      <section className="section more-care" id="more">
        <div className="shell">
          <div className="section-heading more-care-heading">
            <div className="eyebrow">
              <span></span> Comprehensive Approach
            </div>
            <h2>
              Every condition. <em>A clear, personalized path.</em>
            </h2>
            <p>
              My first commitment is to identify the true root cause of your symptoms. Surgery is never the default—I guide you through every appropriate option, from non-surgical therapy to advanced reconstructive care.
            </p>
          </div>
          <div className="more-care-grid">
            {moreCareData.map((care) => (
              <article key={care.id} className="more-care-card">
                <div className="more-care-img-wrap">
                  <img
                    src={care.image}
                    alt={care.title}
                    className="more-care-img"
                    loading="lazy"
                  />
                </div>
                <div className="more-care-body">
                  <h3 className="more-care-title">{care.title}</h3>
                  <p className="more-care-desc">{care.desc}</p>
                </div>
              </article>
            ))}
          </div>

          {/* Mobile Single Care Slideshow (1 card at a time with controls) */}
          <div className="more-care-mobile-slider">
            <div className="more-care-slider-card-wrap" key={`care-${currentCareIndex}`}>
              <article className="more-care-card more-care-card-active">
                <div className="more-care-img-wrap">
                  <img
                    src={moreCareData[currentCareIndex].image}
                    alt={moreCareData[currentCareIndex].title}
                    className="more-care-img"
                    loading="lazy"
                  />
                </div>
                <div className="more-care-body">
                  <h3 className="more-care-title">{moreCareData[currentCareIndex].title}</h3>
                  <p className="more-care-desc">
                    {moreCareData[currentCareIndex].desc}
                  </p>
                </div>
              </article>
            </div>

            {/* Slider Controls */}
            <div className="mock-reviews-slider-controls">
              <button
                type="button"
                className="mock-slider-btn prev"
                onClick={prevCare}
                aria-label="Previous Option"
              >
                &#8592;
              </button>
              <div className="mock-slider-indicator">
                <span>{currentCareIndex + 1}</span> / <span>{moreCareData.length}</span>
              </div>
              <button
                type="button"
                className="mock-slider-btn next"
                onClick={nextCare}
                aria-label="Next Option"
              >
                &#8594;
              </button>
            </div>

            <div className="mock-slider-dots">
              {moreCareData.map((_, dotIdx) => (
                <button
                  key={`care-dot-${dotIdx}`}
                  type="button"
                  className={`mock-slider-dot ${dotIdx === currentCareIndex ? 'active' : ''}`}
                  onClick={() => setCurrentCareIndex(dotIdx)}
                  aria-label={`Go to option ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Treatments FAQ Section */}
      <section className="section treatment-faq-section" id="treatment-faqs">
        <div className="shell">
          <div className="treatment-faq-header">
            <div className="eyebrow">
              <span></span> Treatment Guidance &amp; Insights
            </div>
            <h2>
              Frequently Asked <em>Questions</em>
            </h2>
            <p>
              Clear answers to common questions about my diagnostic approach, non-surgical options, robotic surgery, and recovery.
            </p>
          </div>

          <div className="treatment-faq-container">
            <div className="treatment-faq-list">
              {TREATMENT_FAQS.map((faq, index) => {
                const isOpen = openFaqId === faq.id;
                const panelId = `treatment-faq-panel-${faq.id}`;
                const btnId = `treatment-faq-btn-${faq.id}`;
                return (
                  <div
                    key={faq.id}
                    className={`treatment-faq-card ${isOpen ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      id={btnId}
                      className="treatment-faq-trigger"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(faq.id)}
                    >
                      <div className="treatment-faq-num">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <span className="treatment-faq-q">{faq.question}</span>
                      <div className="treatment-faq-icon-wrap" aria-hidden="true">
                        {isOpen ? (
                          <svg className="faq-toggle-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        ) : (
                          <svg className="faq-toggle-svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="12" y1="5" x2="12" y2="19"></line>
                            <line x1="5" y1="12" x2="19" y2="12"></line>
                          </svg>
                        )}
                      </div>
                    </button>
                    {isOpen && (
                      <div
                        id={panelId}
                        role="region"
                        aria-labelledby={btnId}
                        className="treatment-faq-body"
                      >
                        <p>{faq.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="treatment-faq-footer-card">
              <div className="treatment-faq-footer-info">
                <h4>Have more questions about your condition?</h4>
                <p>Explore our complete knowledge library or schedule a consultation to discuss your symptoms directly.</p>
              </div>
              <div className="treatment-faq-footer-actions">
                <Link to="/faq" className="button button-outline">
                  Full FAQ Library
                </Link>
                <Link to="/appointment" className="button button-primary">
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Note */}

    </div>
  );
}
