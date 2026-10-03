import React, { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';

// Helper to retry dynamic imports if network drops
function lazyWithRetry(componentImport) {
  return lazy(async () => {
    try {
      return await componentImport();
    } catch (error) {
      console.warn('Chunk load error, retrying...', error);
      // Wait 1 second and retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await componentImport();
    }
  });
}

// Eagerly load the home page for fastest initial render
import HomePage from './pages/HomePage';

// Lazy-load all secondary pages with resilient retry — each gets its own JS chunk
const AboutPage = lazyWithRetry(() => import('./pages/AboutPage'));
const TreatmentsPage = lazyWithRetry(() => import('./pages/TreatmentsPage'));
const BrochuresPage = lazyWithRetry(() => import('./pages/BrochuresPage'));
const GalleryPage = lazyWithRetry(() => import('./pages/GalleryPage'));
const SurgicalVideosPage = lazyWithRetry(() => import('./pages/SurgicalVideosPage'));
const FaqPage = lazyWithRetry(() => import('./pages/FaqPage'));
const ContactPage = lazyWithRetry(() => import('./pages/ContactPage'));
const AppointmentPage = lazyWithRetry(() => import('./pages/AppointmentPage'));

// Lazy-load non-critical UI overlays
const WelcomeModal = lazyWithRetry(() => import('./components/WelcomeModal'));
const FloatingSocialBar = lazyWithRetry(() => import('./components/FloatingSocialBar'));

// Graceful loading fallback — prevents jarring blank screens on slower devices
function PageShell() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: '16px',
      padding: '40px 20px',
      color: '#146c72'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        border: '3px solid rgba(20, 108, 114, 0.15)',
        borderTopColor: '#146c72',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <span style={{ fontSize: '0.9rem', color: '#64748b', fontWeight: 500 }}>Loading page...</span>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-container">
      <ScrollToTop />

      {/* Non-critical overlays — lazy, won't delay initial paint */}
      <Suspense fallback={null}>
        <WelcomeModal />
      </Suspense>
      <Suspense fallback={null}>
        <FloatingSocialBar />
      </Suspense>
      <Header />

      <main>
        <ErrorBoundary>
          <Suspense fallback={<PageShell />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/treatments" element={<TreatmentsPage />} />
              <Route path="/treatment" element={<Navigate to="/treatments" replace />} />
              <Route path="/brochures" element={<BrochuresPage />} />
              <Route path="/brochure" element={<Navigate to="/brochures" replace />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/operation-theatre" element={<SurgicalVideosPage />} />
              <Route path="/surgical-videos" element={<SurgicalVideosPage />} />
              <Route path="/gallery/operation" element={<SurgicalVideosPage />} />
              <Route path="/faq" element={<FaqPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              {/* Catch-all redirect to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
}
