import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://drharshilshah.com/doctor-hero-office.png',
  schema
}) {
  const defaultTitle = 'Dr. Harshil Shah | Orthopaedic Surgeon in Ahmedabad';
  let fullTitle = title || defaultTitle;
  if (title && !title.toLowerCase().includes('harshil shah')) {
    if (title.length + 18 <= 60) {
      fullTitle = `${title} | Dr. Harshil Shah`;
    }
  }

  const canonical = canonicalUrl ? `https://drharshilshah.com${canonicalUrl}` : 'https://drharshilshah.com/';
  const metaDescription =
    description ||
    'Dr. Harshil Shah is a leading orthopaedic surgeon in Ahmedabad specializing in knee, hip & shoulder care, arthroscopy, and robotic joint replacement.';

  return (
    <Helmet>
      {/* Title & Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph Meta */}
      <meta property="og:site_name" content="Dr. Harshil Shah Orthopaedics" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data / JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

