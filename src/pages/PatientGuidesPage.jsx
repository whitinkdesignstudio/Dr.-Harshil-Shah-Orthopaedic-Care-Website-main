import React, { useEffect } from 'react';
import '../styles/patientGuide.css';
import {
  ClipboardCheckLogo,
  HospitalLogo,
  StethoscopeLogo,
  MedicineLogo,
  CalendarLogo
} from '../components/GuideStepIcons';

const PATIENT_GUIDE_STEPS = [
  {
    step: 1,
    title: 'Before Treatment',
    subtitle: 'Prepare well for a smooth and safe treatment experience.',
    LogoComponent: ClipboardCheckLogo,
    photo: '/guide-assets/2x-step-1-checklist.png',
    alt: 'Before Treatment Checklist and Notes',
    points: [
      'Carry your medical reports & previous scans (if any).',
      'List your current medicines and allergies.',
      'Wear comfortable, loose clothing.'
    ]
  },
  {
    step: 2,
    title: 'On the Day of Treatment',
    subtitle: 'Arrive on time and get ready for your procedure.',
    LogoComponent: HospitalLogo,
    photo: '/guide-assets/2x-step-2-reception.png',
    alt: 'Clinic Reception and Check-In Desk',
    points: [
      'Reach the clinic 15 minutes early.',
      'Complete the registration and paperwork.',
      'Meet the doctor and discuss your concerns.'
    ]
  },
  {
    step: 3,
    title: 'During Treatment',
    subtitle: 'Your treatment is planned for your comfort and safety.',
    LogoComponent: StethoscopeLogo,
    photo: '/guide-assets/2x-step-3-during.png',
    alt: 'Professional Orthopaedic Care and Procedure',
    points: [
      "You'll be guided by the medical team throughout.",
      'The procedure is done using safe and modern techniques.',
      "You'll be monitored until you are stable."
    ]
  },
  {
    step: 4,
    title: 'After Treatment',
    subtitle: 'Take care and follow the instructions for a safe recovery.',
    LogoComponent: MedicineLogo,
    photo: '/guide-assets/2x-step-4-medicine.png',
    alt: 'Prescribed Medications and Post-treatment Recovery',
    points: [
      'Use prescribed medicines as directed.',
      'Keep the treated area clean and protected.',
      'Avoid heavy activity and follow activity limits.'
    ]
  },
  {
    step: 5,
    title: 'Follow-Up & Recovery',
    subtitle: 'Stay on track for the best long-term results.',
    LogoComponent: CalendarLogo,
    photo: '/guide-assets/2x-step-5-recovery.png',
    alt: 'Rehabilitation and Physiotherapy Exercises',
    points: [
      'Do your home exercises and physiotherapy (if advised).',
      'Attend follow-up appointments as scheduled.',
      'Contact the doctor if you notice increased pain, swelling or fever.'
    ]
  }
];

export default function PatientGuidesPage() {
  useEffect(() => {
    document.title = 'Patient Guide | Dr. Harshil Shah - Orthopaedic Surgeon';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="patient-guide-page">
      {/* Hero Section */}
      <section className="pg-hero-section">
        <div className="pg-hero-container">
          <div className="pg-hero-content">
            <div className="pg-hero-kicker">

            </div>
            <h1 className="pg-hero-title">Patient Guide</h1>
            <p className="pg-hero-desc">
              Simple guidance for every step of your treatment.
            </p>
          </div>
        </div>
      </section>

      {/* Stepper Timeline Section */}
      <section className="pg-timeline-section" aria-label="Treatment Journey Timeline">
        <div className="pg-timeline-container">
          {/* Continuous vertical line */}
          <div className="pg-timeline-track" aria-hidden="true" />

          {/* Steps List */}
          <div className="pg-timeline-steps">
            {PATIENT_GUIDE_STEPS.map((step) => {
              const StepLogo = step.LogoComponent;
              return (
                <div key={step.step} className="pg-step-row">
                  {/* Number Badge */}
                  <div className="pg-step-badge" aria-label={`Step ${step.step}`}>
                    <span>{step.step}</span>
                  </div>

                  {/* Main Card */}
                  <article className="pg-step-card">
                    {/* Left: Step Logo (matching reference icons) */}
                    <div className="pg-card-icon-wrap">
                      <StepLogo className="pg-card-icon-svg" />
                    </div>

                    {/* Center: Content & Checklist */}
                    <div className="pg-card-body">
                      <h2 className="pg-card-title">{step.title}</h2>
                      <p className="pg-card-subtitle">{step.subtitle}</p>
                      <ul className="pg-card-checklist">
                        {step.points.map((point, pIdx) => (
                          <li key={pIdx} className="pg-card-point">
                            <svg
                              className="pg-point-check"
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path
                                d="M4 10.5L8 14.5L16 6.5"
                                stroke="currentColor"
                                strokeWidth="2.6"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                            <span className="pg-point-text">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Right: Photo Preview */}
                    <div className="pg-card-media">
                      <img
                        src={step.photo}
                        alt={step.alt}
                        className="pg-card-photo"
                        loading="lazy"
                      />
                    </div>
                  </article>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
