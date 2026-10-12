import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function MedicalDisclaimerPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Medical Disclaimer | Dr. Harshil Shah Orthopaedic Care',
    description: 'Medical and healthcare information disclaimer for Dr. Harshil Shah website.'
  };

  return (
    <div className="policy-page" style={{ padding: '60px 20px', maxWidth: '850px', margin: '0 auto', color: '#1f2937' }}>
      <SEO
        title="Medical Disclaimer — Healthcare Information Notice"
        description="Medical information provided on this website is for educational purposes only and cannot replace professional clinical consultation or diagnosis."
        canonicalUrl="/medical-disclaimer"
        schema={schema}
      />
      <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f2b30', marginBottom: '16px' }}>
        Medical & Healthcare Disclaimer
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>
        Last Updated: October 2026
      </p>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          1. General Educational Information Only
        </h2>
        <p>
          The contents of this website—including articles, videos, FAQs, guides, 3D anatomical models, and treatment descriptions—are published solely for patient education and informational purposes. The content is designed to help patients understand common orthopaedic conditions such as knee arthritis, ACL tears, hip avascular necrosis, and rotator cuff injuries.
        </p>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          2. No Doctor-Patient Relationship Formed Online
        </h2>
        <p>
          Viewing this website or submitting an inquiry via the online appointment form does not constitute a formal doctor-patient relationship with Dr. Harshil Shah. A formal medical relationship is established only upon an in-person clinical consultation, physical examination, and direct review of your medical diagnostics.
        </p>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          3. Emergency Medical Situations
        </h2>
        <p>
          Do not rely on this website or electronic inquiry forms for urgent, life-threatening, or acute trauma conditions. If you experience acute trauma, joint fractures, loss of limb sensation, or severe uncontrolled pain, please visit your nearest hospital emergency department or call emergency ambulance services immediately.
        </p>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          4. Individual Clinical Outcomes
        </h2>
        <p>
          Orthopaedic recovery times, surgical outcomes, and pain relief levels vary depending on individual patient anatomy, age, bone quality, adherence to physical therapy, and overall health status. Testimonials and recovery stories shared represent individual experiences and do not guarantee identical outcomes for every patient.
        </p>
      </section>

      <div style={{ marginTop: '40px', borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
        <Link to="/" style={{ color: '#146c72', fontWeight: 600, textDecoration: 'none' }}>
          &larr; Back to Homepage
        </Link>
      </div>
    </div>
  );
}

