import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogType = 'website',
  ogImage = 'https://www.drharshilshah.com/doctor-hero-office.webp',
  schema
}) {
  const defaultTitle = 'Dr. Harshil Shah | Orthopaedic Surgeon in Ahmedabad';
  let fullTitle = title || defaultTitle;
  if (title && !title.toLowerCase().includes('harshil shah')) {
    if (title.length + 18 <= 60) {
      fullTitle = `${title} | Dr. Harshil Shah`;
    }
  }

  const cleanPath = canonicalUrl
    ? (canonicalUrl.startsWith('/') ? canonicalUrl : `/${canonicalUrl}`)
    : typeof window !== 'undefined' && window.location?.pathname
      ? (window.location.pathname.replace(/\/+$/, '') || '/')
      : '/';

  const canonical = `https://www.drharshilshah.com${cleanPath === '/' ? '/' : cleanPath}`;

  const metaDescription =
    description ||
    'Dr. Harshil Shah, M.S. (Orth.), is a fellowship-trained orthopaedic surgeon in Ahmedabad specialising in knee, hip & shoulder care, arthroscopy, and joint replacement.';

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
    if (canonicalLinks.length > 0) {
      canonicalLinks[0].setAttribute('href', canonical);
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
  }, [fullTitle, metaDescription, keywords, canonical]);

  return (
    <Helmet>
      {/* Title & Standard Meta */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="robots" content="index, follow" />
      <meta http-equiv="X-Robots-Tag" content="index, follow" />
      <meta name="publisher" content="Dr. Harshil Shah" />
      <link rel="publisher" href="https://www.drharshilshah.com/" />
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

