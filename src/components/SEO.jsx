import React, { useEffect } from 'react';
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

  const canonical =
    typeof window !== 'undefined' && window.location?.href
      ? window.location.href
      : canonicalUrl
        ? `https://drharshilshah.com${canonicalUrl}`
        : 'https://drharshilshah.com/';

  const metaDescription =
    description ||
    'Dr. Harshil Shah is a leading orthopaedic surgeon in Ahmedabad specializing in knee, hip & shoulder care, arthroscopy, and robotic joint replacement.';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    if (canonicalLinks.length > 0 && window.location?.href) {
      canonicalLinks[0].setAttribute('href', window.location.href);
      for (let i = 1; i < canonicalLinks.length; i++) {
        canonicalLinks[i].parentNode?.removeChild(canonicalLinks[i]);
      }
    }

    const descTags = document.querySelectorAll('meta[name="description"]');
    if (descTags.length > 0) {
      descTags[0].setAttribute('content', metaDescription);
      for (let i = 1; i < descTags.length; i++) {
        descTags[i].parentNode?.removeChild(descTags[i]);
      }
    }

    if (keywords) {
      const kwTags = document.querySelectorAll('meta[name="keywords"]');
      if (kwTags.length > 0) {
        kwTags[0].setAttribute('content', keywords);
        for (let i = 1; i < kwTags.length; i++) {
          kwTags[i].parentNode?.removeChild(kwTags[i]);
        }
      }
    }
  }, [fullTitle, metaDescription, keywords, canonicalUrl]);

  return (
    <Helmet>
      {/* Title & Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="X-Robots-Tag" content="index, follow" />
      <meta name="publisher" content="Dr. Harshil Shah" />
      <link rel="publisher" href="https://drharshilshah.com/" />
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

