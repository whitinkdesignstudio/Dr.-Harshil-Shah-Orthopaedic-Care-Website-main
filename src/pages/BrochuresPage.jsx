import React from 'react';
import { Link } from 'react-router-dom';

const PATIENT_BROCHURES = [
  {
    id: 'knee-replacement',
    number: '01',
    title: 'Knee Replacement & Robotic Surgery',
    logo: '/icons/knee-pain.webp',
    fileUrl: '/galleri/brochure/01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf',
    fileName: '01_Understanding_Knee_Replacement_Guide_Dr_Harshil_Shah.pdf',
    fileSize: '3.0 MB PDF',
    description: 'Detailed insights on knee arthritis grading, robotic-assisted surgical precision, prehab routines, implant longevity, and safe recovery.',
    topics: ['Robotic Knee Replacement', 'Pre-Op Fasting & Prehab', 'Same-Day Walking (ERAS)', 'Home Recovery Protocol'],
    accent: '#146c72'
  },
  {
    id: 'hip-replacement',
    number: '02',
    title: 'Hip Replacement & Joint Restoration',
    logo: '/icons/hip-pain.webp',
    fileUrl: '/galleri/brochure/02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf',
    fileName: '02_Understanding_Hip_Replacement_Guide_Dr_Harshil_Shah.pdf',
    fileSize: '2.9 MB PDF',
    description: 'Complete guidance on hip arthritis, avascular necrosis (AVN), muscle-sparing approaches, ceramic implants, and mobility milestones.',
    topics: ['Minimally Invasive Hip Surgery', 'AVN Hip Management', 'Dislocation Precautions', 'Stair Climbing & Walking'],
    accent: '#0d9488'
  },
  {
    id: 'knee-sports-injury',
    number: '03',
    title: 'Knee Sports Injury & Arthroscopy',
    logo: '/icons/sports-injuries.webp',
    fileUrl: '/galleri/brochure/03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf',
    fileName: '03_Understanding_Sports_Injuries_Arthroscopy_Guide_Dr_Harshil_Shah.pdf',
    fileSize: '3.2 MB PDF',
    description: 'Athletic recovery protocol covering keyhole ligament reconstruction (ACL/PCL/MCL), meniscal repair, cartilage restoration, and return to sports.',
    topics: ['Keyhole Arthroscopic Repair', 'ACL & Meniscus Treatment', 'Sports Rehabilitation Phases', 'Safe Return to Athletics'],
    accent: '#1e7e85'
  },
  {
    id: 'shoulder-arthroscopy',
    number: '04',
    title: 'Shoulder Arthroscopy & Rotator Cuff Guide',
    logo: '/icons/shoulder-pain.webp',
    fileUrl: '/galleri/brochure/04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf',
    fileName: '04_Understanding_Shoulder_Arthroscopy_Guide_Dr_Harshil_Shah.pdf',
    fileSize: '3.3 MB PDF',
    description: 'Specialist patient guide covering rotator cuff repair, shoulder dislocations, Bankart repair & remplissage, SLAP tears, reverse replacement, and rehab.',
    topics: ['Rotator Cuff & Labral Repairs', 'Instability & Bankart Repair', 'Reverse Shoulder Replacement', 'Post-Op Rehabilitation Phases'],
    accent: '#146c72'
  }
];

export default function BrochuresPage() {
  return (
    <div className="brochures-page">
      {/* Hero Header */}
      <section className="brochures-hero-section">
        <div className="shell">
          <div className="brochures-hero-header">
            <h1 className="brochures-hero-title">
              Downloadable <span className="text-highlight-blue">Patient Brochures</span>
            </h1>
            <p className="brochures-hero-desc">
              I have authored these clinical guides to help you and your family understand joint procedures, surgical techniques, pre-surgery preparation, and day-by-day rehabilitation.
            </p>
          </div>
        </div>
      </section>

      {/* Brochures Grid Section */}
      <section className="section patient-brochures-section" style={{ paddingTop: '10px' }}>
        <div className="shell">
          <div className="patient-brochures-grid">
            {PATIENT_BROCHURES.map((brochure) => (
              <article key={brochure.id} className="patient-brochure-card">
                <div className="brochure-card-header">
                  <div className="brochure-logo-box">
                    <img
                      src={brochure.logo}
                      alt={brochure.title}
                      className="brochure-logo-img"
                      loading="lazy"
                    />
                  </div>
                  <span className="brochure-num-pill">{brochure.number}</span>
                </div>

                <div className="brochure-card-body">
                  <h3 className="brochure-title">{brochure.title}</h3>
                  <p className="brochure-desc">{brochure.description}</p>

                  <div className="brochure-topics-box">
                    <strong className="brochure-topics-title">Key Topics Covered:</strong>
                    <ul className="brochure-topics-list">
                      {brochure.topics.map((topic, i) => (
                        <li key={i}>
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke={brochure.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          <span>{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="brochure-card-footer">
                  <div className="brochure-file-meta">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                    <span>{brochure.fileSize}</span>
                  </div>

                  <div className="brochure-card-actions">
                    {brochure.fileUrl ? (
                      <a
                        href={brochure.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="button button-small button-outline brochure-view-btn"
                        title={`Read ${brochure.title} in new tab`}
                      >
                        <span>Read Online</span>
                      </a>
                    ) : (
                      <span className="button button-small button-outline brochure-view-btn" aria-disabled="true">
                        <span>Read Online</span>
                      </span>
                    )}
                    {brochure.fileUrl ? (
                      <a
                        href={brochure.fileUrl}
                        download={brochure.fileName}
                        className="button button-small button-primary brochure-dl-btn"
                        title={`Download ${brochure.title} PDF`}
                      >
                        <span>Download</span>
                      </a>
                    ) : (
                      <span className="button button-small button-primary brochure-dl-btn" aria-disabled="true">
                        <span>Download</span>
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Consultation Assistance Banner */}
          <div className="care-help-banner" style={{ marginTop: '50px' }}>
            <div className="care-help-left">
              <div className="care-help-text">
                <h3>Have questions about your condition or procedure?</h3>
                <p>Schedule a consultation with me so we can review your scan reports and discuss a personalized treatment plan.</p>
              </div>
            </div>
            <div className="care-help-divider" />
            <Link to="/appointment" className="care-help-btn">
              <span>Book Consultation</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

