import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';
import '../styles/avnPage.css';

const AVN_CLINICAL_FAQS = [
  {
    id: 'avn-faq-1',
    question: 'Can Avascular Necrosis (AVN) be treated without undergoing hip replacement?',
    answer: 'Yes. In its early stages (Ficat-Arlet Stages 1 and 2), before structural collapse of the femoral head occurs, AVN can often be successfully managed without total hip replacement. Dr. Harshil Shah provides evidence-based medical management (bisphosphonate therapy pioneered by Dr. Sanjay Agarwala) and minimally invasive biological procedures such as core decompression with BMAC (regenerative therapy) to halt bone death and preserve your native hip joint.'
  },
  {
    id: 'avn-faq-2',
    question: 'Why did my standard X-ray appear normal despite persistent hip or groin pain?',
    answer: 'In Stage 1 AVN, bone marrow edema and ischemia develop inside the bone without causing calcium changes visible on regular X-rays. As a result, standard X-rays are frequently normal. An MRI of the Pelvis with both Hips is the definitive diagnostic investigation to detect early-stage avascular necrosis months before any irreversible structural collapse takes place.'
  },
  {
    id: 'avn-faq-3',
    question: 'What is the Bisphosphonate medical protocol for early AVN?',
    answer: 'Pioneered by Dr. Sanjay Agarwala at P. D. Hinduja Hospital, Mumbai (where Dr. Harshil Shah completed fellowship training), this protocol uses oral or intravenous bisphosphonates (such as Alendronate or Zoledronic Acid). These medications temporarily inhibit osteoclastic bone resorption, protecting the internal bone scaffolding while allowing natural bone remodeling and new capillary formation.'
  },
  {
    id: 'avn-faq-4',
    question: 'How does Core Decompression with BMAC work?',
    answer: 'Core decompression is a precise, 15 to 20 minute keyhole procedure performed under real-time fluoroscopic guidance. A small micro-channel is introduced into the necrotic zone of the femoral head to reduce high intra-osseous pressure and restore blood circulation. It is combined with Bone Marrow Aspirate Concentrate (BMAC) rich in autologous stem cells and growth factors harvested from the pelvis to stimulate biological bone repair.'
  },
  {
    id: 'avn-faq-5',
    question: 'Who is most commonly affected by hip AVN?',
    answer: 'AVN predominantly affects young and middle-aged adults (between 20 and 45 years). The most frequent clinical triggers include corticosteroid use (prescribed for severe respiratory infections, post-COVID-19 care, or autoimmune conditions), regular alcohol intake, and hip trauma. Early evaluation with an MRI is recommended for anyone in these categories experiencing groin discomfort.'
  },
  {
    id: 'avn-faq-6',
    question: 'When is Total Hip Replacement (THR) necessary?',
    answer: 'When AVN progresses to Stage 3 or 4—where the femoral head has already flattened or collapsed, resulting in secondary osteoarthritis, joint stiffness, and severe limp—joint preservation is no longer clinically viable. In these advanced stages, muscle-sparing, robotic-assisted total hip replacement delivers reliable, lifelong pain relief and restores natural walking.'
  }
];

export default function AVNPreservationPage() {
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleFaq = (idx) => {
    setOpenFaq((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="avn-page-wrapper">
      <SEO
        title="AVN Early-Stage Joint Preservation | Dr. Harshil Shah"
        description="Preserve your natural hip joint and avoid total hip replacement with early AVN diagnosis, medical bisphosphonate therapy, and core decompression with BMAC in Ahmedabad."
        canonicalUrl="/treatments/avn-joint-preservation"
        keywords="AVN hip treatment, avascular necrosis joint preservation, Dr Sanjay Agarwala AVN protocol, Dr Harshil Shah hip specialist Ahmedabad, core decompression BMAC hip, steroid induced AVN hip"
        schema={{
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'MedicalWebPage',
              name: 'Avascular Necrosis (AVN) Early-Stage Joint Preservation',
              description: 'Comprehensive clinical guide and treatment pathways for preserving the natural hip joint in early-stage avascular necrosis without joint replacement.',
              url: 'https://www.drharshilshah.com/treatments/avn-joint-preservation',
              specialty: 'Orthopaedic Surgery'
            },
            {
              '@type': 'FAQPage',
              mainEntity: AVN_CLINICAL_FAQS.map((faq) => ({
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
                  item: 'https://www.drharshilshah.com/'
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Treatments',
                  item: 'https://www.drharshilshah.com/treatments'
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: 'AVN Joint Preservation',
                  item: 'https://www.drharshilshah.com/treatments/avn-joint-preservation'
                }
              ]
            }
          ]
        }}
      />

      {/* =========================================================================
          1. HERO & CLINICAL OVERVIEW (Matches HomePage clean typography & palette)
          ========================================================================= */}
      <section className="avn-intro-section" aria-label="AVN Joint Preservation Overview">
        <div className="mock-shell">
          {/* Breadcrumbs */}




          <h1 className="avn-hero-title-main">
            Avascular Necrosis (AVN) of the Hip: <br />
            <span>Early-Stage Joint Preservation</span>
          </h1>



          {/* Fellowship Heritage Callout (Dr. Sanjay Agarwala reference) */}
          <div className="avn-heritage-card">

            <div className="avn-heritage-text">
              <p>
                <strong>Clinical Fellowship Heritage:</strong> Dr. Harshil Shah completed his fellowship training in joint replacement and preservation at <strong>P. D. Hinduja Hospital, Mumbai under Dr. Sanjay Agarwala</strong>, the pioneer who established the landmark medical protocol (bisphosphonate therapy) for non-surgical joint preservation in avascular necrosis.
              </p>
            </div>
          </div>

          {/* Action Buttons (Matches HomePage buttons) */}
          <div className="avn-hero-action-buttons">
            <Link to="/appointment" className="mock-btn-primary">
              <span>Book a Consultation</span>
              <span className="mock-btn-primary-arrow">&rarr;</span>
            </Link>

            <a
              href="https://wa.me/919316753985?text=Hello%20Dr.%20Harshil%20Shah,%20I%20have%20an%20MRI%20report%20for%20AVN%20hip%20and%20would%20like%20a%20joint%20preservation%20consultation."
              target="_blank"
              rel="noreferrer"
              className="mock-btn-whatsapp"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style={{ flexShrink: 0 }}>
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.02c-.24.68-1.39 1.3-1.92 1.38-.5.08-1.14.11-3.66-.93-3.23-1.33-5.32-4.6-5.48-4.82-.16-.22-1.32-1.75-1.32-3.34 0-1.59.83-2.37 1.12-2.7.29-.33.64-.41.85-.41.21 0 .43 0 .61.01.2.01.47-.08.73.55.27.64.91 2.22.99 2.38.08.16.14.36.03.58-.11.22-.16.36-.33.55-.16.2-.35.44-.5.59-.16.16-.33.33-.14.66.19.33.84 1.38 1.8 2.24 1.24 1.1 2.28 1.44 2.61 1.6.33.16.52.14.72-.09.2-.23.83-.97 1.05-1.3.22-.33.44-.28.74-.16.3.11 1.93.91 2.26 1.07.33.16.55.25.63.38.08.14.08.8-.16 1.48z" />
              </svg>
              <span>Share MRI on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. UNDERSTANDING THE STAGES (Unified Theme - No AI Rainbow Colors)
          ========================================================================= */}
      <section className="avn-stages-section" id="stages" aria-label="Stages of Avascular Necrosis">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: 0 }}>

              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>Clinical Progression Stages of AVN</h2>
              <p className="mock-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
                Avascular necrosis develops when microvascular blood supply to the femoral head is interrupted. Preserving your native joint depends on making an accurate diagnosis <strong>before</strong> structural bone collapse occurs.
              </p>
            </div>
          </div>



          {/* 4-Stage Matrix (Consistent with HomePage design system) */}
          <div className="avn-stages-row">
            {/* Stage 1 */}
            <div className="avn-stage-box is-preservation">
              <div className="avn-stage-box-header">
                <span className="avn-stage-step-num">01</span>
                <span className="avn-stage-pill-tag">Pre-Collapse</span>
              </div>
              <h3 className="avn-stage-box-title">Normal X-ray, Positive MRI</h3>
              <p className="avn-stage-box-desc">
                Bone marrow edema and cellular ischemia are present, while the femoral head retains its completely spherical shape.
              </p>
              <div className="avn-stage-box-status">
                Preservation Candidate: Medical Protocol
              </div>
            </div>

            {/* Stage 2 */}
            <div className="avn-stage-box is-preservation">
              <div className="avn-stage-box-header">
                <span className="avn-stage-step-num">02</span>
                <span className="avn-stage-pill-tag">Pre-Collapse</span>
              </div>
              <h3 className="avn-stage-box-title">Bone Sclerosis &amp; Cysts</h3>
              <p className="avn-stage-box-desc">
                Demarcation lines and sclerosis appear on imaging, but the articular surface of the bone has not collapsed.
              </p>
              <div className="avn-stage-box-status">
                Preservation Candidate: Medical + Core Decompression
              </div>
            </div>

            {/* Stage 3 */}
            <div className="avn-stage-box">
              <div className="avn-stage-box-header">
                <span className="avn-stage-step-num">03</span>
                <span className="avn-stage-pill-tag">Early Collapse</span>
              </div>
              <h3 className="avn-stage-box-title">Subchondral Crescent Sign</h3>
              <p className="avn-stage-box-desc">
                Micro-fractures under the joint cartilage result in initial flattening of the femoral head and articular step-off.
              </p>
              <div className="avn-stage-box-status is-advanced">
                Selective / Case-by-Case Assessment
              </div>
            </div>

            {/* Stage 4 */}
            <div className="avn-stage-box">
              <div className="avn-stage-box-header">
                <span className="avn-stage-step-num">04</span>
                <span className="avn-stage-pill-tag">Advanced</span>
              </div>
              <h3 className="avn-stage-box-title">Secondary Osteoarthritis</h3>
              <p className="avn-stage-box-desc">
                Loss of joint sphericity, joint space narrowing, severe bone friction, and restricted, painful walking.
              </p>
              <div className="avn-stage-box-status is-advanced">
                Total Hip Replacement Recommended
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. JOINT PRESERVATION PATHWAYS (3 Columns with HomePage Checklists)
          ========================================================================= */}
      <section className="avn-pathways-section" id="pathways" aria-label="Treatment Pathways">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: 0 }}>

              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>How We Preserve Your Hip Joint</h2>
              <p className="mock-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
                Applying protocols learned directly from Dr. Sanjay Agarwala alongside modern orthopaedic techniques, treatment is structured to halt necrosis and support natural bone regeneration.
              </p>
            </div>
          </div>

          <div className="avn-pathways-grid">
            {/* Pillar 1: Medical Protocol */}
            <div className="avn-pathway-card">

              <h3 className="avn-pathway-card-title">1. Bisphosphonate Medical Therapy</h3>
              <p className="avn-pathway-card-desc">
                A structured non-surgical protocol using targeted bisphosphonates (oral Alendronate or annual Zoledronic acid) to temporarily suppress osteoclastic resorption.
              </p>

              <ul className="mock-checklist" style={{ margin: 0 }}>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Protects internal bone structure while bone tissue heals.</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Significant pain reduction typically observed within 4 to 8 weeks.</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Supports long-term joint survival in Stage 1 and 2 hips.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Core Decompression & BMAC */}
            <div className="avn-pathway-card">

              <h3 className="avn-pathway-card-title">2. Core Decompression &amp; BMAC</h3>
              <p className="avn-pathway-card-desc">
                A 20-minute minimally invasive procedure performed through a tiny keyhole puncture to decompress bone marrow hypertension.
              </p>

              <ul className="mock-checklist" style={{ margin: 0 }}>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Drills a micro-channel into dead bone to restore healthy vascular inflow.</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Injects autologous Bone Marrow Aspirate Concentrate (BMAC) cells.</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Day-care or overnight stay with rapid initial recovery.</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Protected Weight-Bearing */}
            <div className="avn-pathway-card">
              <h3 className="avn-pathway-card-title">3. Protected Loading &amp; Follow-up</h3>
              <p className="avn-pathway-card-desc">
                Temporary mechanical offloading allows weakened trabecular bone time to remodel safely without fracturing under weight.
              </p>

              <ul className="mock-checklist" style={{ margin: 0 }}>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Temporary partial weight-bearing with crutches or walker as advised.</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Low-impact exercises (stationary cycling and pool walking).</span>
                </li>
                <li className="mock-checklist-item">
                  <span className="mock-check-icon">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  <span>Serial follow-up MRI scans at 6 and 12 months to track bone remodeling.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. COMPARISON MATRIX (Preservation vs Replacement)
          ========================================================================= */}
      <section className="avn-matrix-section" id="comparison" aria-label="Joint Preservation vs Replacement">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: 0 }}>
              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>Joint Preservation vs. Total Hip Replacement</h2>
              <p className="mock-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
                Understanding the clinical difference between preserving your own biological joint versus undergoing prosthetic joint replacement.
              </p>
            </div>
          </div>

          <div className="avn-table-container">
            <table className="avn-clinical-table">
              <thead>
                <tr>
                  <th style={{ width: '24%' }}>Clinical Feature</th>
                  <th style={{ width: '38%' }} className="avn-table-highlight-col">Early Joint Preservation (Stage 1 &amp; 2)</th>
                  <th style={{ width: '38%' }}>Total Hip Replacement (Stage 3 &amp; 4)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Joint Status</strong></td>
                  <td className="avn-table-highlight-col">Pre-collapse; natural femoral head retains spherical shape</td>
                  <td>Post-collapse; femoral head flattened with cartilage loss</td>
                </tr>
                <tr>
                  <td><strong>Primary Goal</strong></td>
                  <td className="avn-table-highlight-col">Save your native bone and prevent future reconstructive surgery</td>
                  <td>Eliminate severe arthritic pain and restore natural walking mobility</td>
                </tr>
                <tr>
                  <td><strong>Clinical Approach</strong></td>
                  <td className="avn-table-highlight-col">Bisphosphonate medical protocol + Core decompression with BMAC</td>
                  <td>Muscle-sparing robotic or direct anterior total hip arthroplasty</td>
                </tr>
                <tr>
                  <td><strong>Invasiveness</strong></td>
                  <td className="avn-table-highlight-col">Non-surgical medical care OR 15-minute keyhole procedure</td>
                  <td>Definitive open reconstructive joint replacement procedure</td>
                </tr>
                <tr>
                  <td><strong>Target Patient</strong></td>
                  <td className="avn-table-highlight-col">Young and active adults (20 to 50 years) wishing to retain native joint</td>
                  <td>Patients of any age with collapsed joint and disabling stiffness</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. RISK FACTORS (Who is at Risk?)
          ========================================================================= */}
      <section className="avn-risks-section" id="risks" aria-label="Risk Factors">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'flex-start', textAlign: 'left' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'left', alignItems: 'flex-start', marginLeft: 0 }}>
              
              <h2 className="mock-title" style={{ textAlign: 'left', marginLeft: 0 }}>Who is at Risk of Developing Hip AVN?</h2>
              <p className="mock-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
                AVN is not an age-related wear condition. It most commonly occurs in younger adults following specific microvascular disruptions.
              </p>
            </div>
          </div>

          <div className="avn-risks-grid">
            <div className="avn-risk-card">
              <div className="avn-risk-icon-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M10.5 20.5 3 13a4.95 4.95 0 1 1 7-7l7.5 7.5a4.95 4.95 0 1 1-7 7Z" />
                </svg>
              </div>
              <div>
                <strong className="avn-risk-title">Corticosteroid Use (Post-COVID / Autoimmune)</strong>
                <p className="avn-risk-text">Steroids alter lipid metabolism and elevate marrow fat pressure, compromising femoral head micro-circulation.</p>
              </div>
            </div>

            <div className="avn-risk-card">
              <div className="avn-risk-icon-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <strong className="avn-risk-title">Alcohol Consumption</strong>
                <p className="avn-risk-text">Prolonged or heavy alcohol intake causes fat micro-emboli, leading to microvascular occlusion in hip bone.</p>
              </div>
            </div>

            <div className="avn-risk-card">
              <div className="avn-risk-icon-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
              </div>
              <div>
                <strong className="avn-risk-title">Previous Hip Trauma or Dislocation</strong>
                <p className="avn-risk-text">Fractures of the femoral neck or traumatic hip dislocations can tear the delicate retinacular blood supply.</p>
              </div>
            </div>

            <div className="avn-risk-card">
              <div className="avn-risk-icon-box">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <div>
                <strong className="avn-risk-title">Deep Groin or Buttock Pain</strong>
                <p className="avn-risk-text">Persistent pain radiating along the front thigh to the knee, often aggravated by walking, weight-bearing, or sitting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          6. FAQS (Matches exact HomePage mock-faqs structure)
          ========================================================================= */}
      <section className="mock-faqs-section" id="faqs" aria-label="Frequently Asked Questions">
        <div className="mock-shell">
          <div className="mock-section-header" style={{ alignItems: 'center', textAlign: 'center', justifyContent: 'center' }}>
            <div className="mock-section-header-left" style={{ textAlign: 'center', alignItems: 'center', margin: '0 auto' }}>
              <h2 className="mock-title" style={{ textAlign: 'center' }}>Frequently Asked Questions on AVN Care</h2>
              <p className="mock-subtitle" style={{ textAlign: 'center', margin: '0 auto' }}>
                Clear, evidence-based answers to the questions patients ask most often when newly diagnosed with hip avascular necrosis.
              </p>
            </div>
          </div>

          <div className="mock-faqs-list" style={{ maxWidth: '900px', margin: '0 auto' }}>
            {AVN_CLINICAL_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.id || idx}
                  className={`mock-faq-row ${isOpen ? 'is-open' : ''}`}
                  onClick={() => toggleFaq(idx)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      toggleFaq(idx);
                    }
                  }}
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
        </div>
      </section>

      {/* =========================================================================
          7. CONSULTATION & MRI REVIEW CTA (Matches HomePage unified consult card)
          ========================================================================= */}


    </div>
  );
}
