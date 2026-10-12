import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function PrivacyPolicyPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Privacy Policy | Dr. Harshil Shah Orthopaedic Care',
    description: 'Patient privacy policy, medical confidentiality and data protection standards for Dr. Harshil Shah clinic.'
  };

  return (
    <div className="policy-page" style={{ padding: '60px 20px', maxWidth: '850px', margin: '0 auto', color: '#1f2937' }}>
      <SEO
        title="Privacy Policy — Patient Confidentiality & Data Protection"
        description="Learn how Dr. Harshil Shah's clinic safeguards your medical intake data, appointment submissions, and patient confidentiality."
        canonicalUrl="/privacy"
        schema={schema}
      />
      <h1 style={{ fontSize: '2.4rem', fontWeight: 700, color: '#0f2b30', marginBottom: '16px' }}>
        Privacy Policy
      </h1>
      <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '32px' }}>
        Last Updated: October 2026
      </p>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          1. Commitment to Patient Confidentiality
        </h2>
        <p>
          At the clinic of Dr. Harshil Shah, safeguarding your private health records and personal information is our highest priority. This policy outlines how information submitted through our online consultation desk, WhatsApp line, and appointment booking form is managed, stored, and protected.
        </p>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          2. Information We Collect
        </h2>
        <p>When you contact our clinic or request an appointment, we may collect:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li><strong>Personal Details:</strong> Full name, age, phone number, and email address.</li>
          <li><strong>Clinical Details:</strong> Primary joint concern (knee, hip, shoulder), pain symptoms, and uploaded medical diagnostic reports or MRI scans (for second opinion requests).</li>
          <li><strong>Appointment Preferences:</strong> Preferred dates, consultation slots, and hospital visit locations.</li>
        </ul>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          3. How Your Information Is Used
        </h2>
        <p>Your details are used strictly for clinical communication and care coordination:</p>
        <ul style={{ paddingLeft: '20px', marginTop: '10px' }}>
          <li>Coordinating appointment timings and sending visit confirmations.</li>
          <li>Assessing clinical suitability for in-clinic evaluations or second opinions.</li>
          <li>Responding to emergency inquiries and patient follow-ups.</li>
        </ul>
        <p style={{ marginTop: '10px' }}>
          <strong>We never sell, rent, or trade patient information to third-party marketing companies.</strong>
        </p>
      </section>

      <section style={{ marginBottom: '28px', lineHeight: 1.7 }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 600, color: '#146c72', marginBottom: '10px' }}>
          4. Contact Our Clinic Desk
        </h2>
        <p>
          If you have questions regarding your data or wish to update your records, please contact our clinic desk:
        </p>
        <p style={{ marginTop: '8px' }}>
          <strong>Address:</strong> Curis Hospitals, Sindhubhavan Road, Bodakdev, Ahmedabad, Gujarat 380054<br />
          <strong>Phone:</strong> <a href="tel:+917874904030" style={{ color: '#146c72' }}>+91 78749 04030</a><br />
          <strong>Email:</strong> <a href="mailto:harshilshah199706@gmail.com" style={{ color: '#146c72' }}>harshilshah199706@gmail.com</a>
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

