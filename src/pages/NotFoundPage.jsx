import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: '404 Page Not Found',
    description: 'The requested page could not be found on Dr. Harshil Shah Orthopaedic Care.'
  };

  return (
    <div className="not-found-page" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 20px',
      textAlign: 'center'
    }}>
      <SEO
        title="Page Not Found (404)"
        description="The page you are looking for does not exist or has been moved. Explore treatments or contact Dr. Harshil Shah's clinic."
        canonicalUrl="/404"
        schema={schema}
      />
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <span style={{
          fontSize: '5rem',
          fontWeight: 800,
          color: '#146c72',
          lineHeight: 1,
          display: 'block',
          marginBottom: '16px'
        }}>
          404
        </span>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: '#0f2b30',
          marginBottom: '16px'
        }}>
          Page Not Found
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: '#526e75',
          lineHeight: 1.6,
          marginBottom: '32px'
        }}>
          The page you requested could not be found. It may have been relocated or renamed. You can explore our orthopaedic treatments or return to the home page.
        </p>

        <div style={{
          display: 'flex',
          gap: '14px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 28px',
              backgroundColor: '#146c72',
              color: '#ffffff',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Go to Homepage
          </Link>
          <Link
            to="/treatments"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 28px',
              backgroundColor: '#e6f3f4',
              color: '#146c72',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            View Treatments
          </Link>
          <Link
            to="/appointment"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 28px',
              backgroundColor: '#ffffff',
              border: '1px solid #146c72',
              color: '#146c72',
              borderRadius: '8px',
              fontWeight: 600,
              textDecoration: 'none'
            }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}

