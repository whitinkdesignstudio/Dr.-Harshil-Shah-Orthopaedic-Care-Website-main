import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import '../styles/contactPage.css';
import '../styles/appointmentPage.css';

export default function AppointmentPage() {
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Knee Care & Arthroscopy',
    consultType: 'In-Clinic Consultation',
    date: '',
    time: '',
    reason: '',
    consent: true
  });

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const el = document.getElementById(targetId);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, [location]);

  const [honeypot, setHoneypot] = useState('');
  const [secondOpinionPdf, setSecondOpinionPdf] = useState(null);
  const [submittedData, setSubmittedData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [serviceOpen, setServiceOpen] = useState(false);
  const serviceDropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (serviceDropdownRef.current && !serviceDropdownRef.current.contains(event.target)) {
        setServiceOpen(false);
      }
    }
    if (serviceOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [serviceOpen]);

  const handleSelectService = (srv) => {
    setFormData((prev) => ({ ...prev, service: srv }));
    setServiceOpen(false);
    if (fieldErrors.service) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.service;
        return next;
      });
    }
  };

  const serviceOptions = [
    'Knee Care & Arthroscopy',
    'Total Knee Replacement (Robotic / Fast-Track)',
    'Hip Preservation & Replacement',
    'Shoulder Arthroscopy & Rotator Cuff Repair',
    'Sports Ligament Reconstruction (ACL / PCL)',
    'Joint Pain & Arthritis Evaluation',
    'Second Opinion on Orthopaedic Surgery'
  ];

  const consultTypes = [
    'In-Clinic Consultation',
    'Second Opinion Review',
    'Post-Surgery Follow-up'
  ];

  // 30-Minute Consultation Slots from 10:30 AM to 07:00 PM
  const APPOINTMENT_SLOTS = [
    { time: '10:30', label: '10:30 AM', period: 'Morning', hour: 10, minute: 30 },
    { time: '11:00', label: '11:00 AM', period: 'Morning', hour: 11, minute: 0 },
    { time: '11:30', label: '11:30 AM', period: 'Morning', hour: 11, minute: 30 },
    { time: '12:00', label: '12:00 PM', period: 'Morning', hour: 12, minute: 0 },
    { time: '12:30', label: '12:30 PM', period: 'Morning', hour: 12, minute: 30 },
    { time: '13:00', label: '01:00 PM', period: 'Afternoon', hour: 13, minute: 0 },
    { time: '13:30', label: '01:30 PM', period: 'Afternoon', hour: 13, minute: 30 },
    { time: '14:00', label: '02:00 PM', period: 'Afternoon', hour: 14, minute: 0 },
    { time: '14:30', label: '02:30 PM', period: 'Afternoon', hour: 14, minute: 30 },
    { time: '15:00', label: '03:00 PM', period: 'Afternoon', hour: 15, minute: 0 },
    { time: '15:30', label: '03:30 PM', period: 'Afternoon', hour: 15, minute: 30 },
    { time: '16:00', label: '04:00 PM', period: 'Afternoon', hour: 16, minute: 0 },
    { time: '16:30', label: '04:30 PM', period: 'Afternoon', hour: 16, minute: 30 },
    { time: '17:00', label: '05:00 PM', period: 'Evening', hour: 17, minute: 0 },
    { time: '17:30', label: '05:30 PM', period: 'Evening', hour: 17, minute: 30 },
    { time: '18:00', label: '06:00 PM', period: 'Evening', hour: 18, minute: 0 },
    { time: '18:30', label: '06:30 PM', period: 'Evening', hour: 18, minute: 30 },
    { time: '19:00', label: '07:00 PM', period: 'Evening', hour: 19, minute: 0 }
  ];

  // Timezone-safe local date for min date attribute
  const getTodayLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Check if a time slot has already passed for the given date
  const isSlotDisabled = (slot, dateValue) => {
    if (!dateValue) return false;
    const today = getTodayLocal();
    if (dateValue < today) return true;
    if (dateValue > today) return false;

    // Date is today: check if time has already finished/passed
    const now = new Date();
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();

    if (slot.hour < currentHour || (slot.hour === currentHour && slot.minute <= currentMin)) {
      return true;
    }
    return false;
  };

  // Format date to readable string (e.g. 28 August 2026) for EmailJS
  const formatAppointmentDate = (dateValue) => {
    if (!dateValue) return 'Date to be coordinated';
    try {
      const [year, month, day] = dateValue.split('-');
      const date = new Date(Number(year), Number(month) - 1, Number(day));
      return date.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    } catch {
      return dateValue;
    }
  };

  // Format time value to user-friendly 12h format (e.g. 10:30 AM)
  const formatAppointmentTime = (timeValue) => {
    if (!timeValue) return 'Time to be coordinated';
    const matchedSlot = APPOINTMENT_SLOTS.find((s) => s.time === timeValue || s.label === timeValue);
    if (matchedSlot) return matchedSlot.label;
    if (timeValue.includes('AM') || timeValue.includes('PM')) return timeValue;
    try {
      const [hourStr, minuteStr] = timeValue.split(':');
      let hour = parseInt(hourStr, 10);
      if (isNaN(hour)) return timeValue;
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      const min = minuteStr ? minuteStr.padStart(2, '0') : '00';
      return `${hour}:${min} ${ampm}`;
    } catch {
      return timeValue;
    }
  };

  const normalizePhone = (phone) => phone.replace(/[\s()-]/g, '');

  const validateForm = () => {
    const errors = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.name = 'Please enter your full name.';
    }

    const cleanPhone = normalizePhone(formData.phone);
    const phoneRegex = /^(\+?\d{1,4})?[6-9]\d{9}$/;
    if (!cleanPhone || (!phoneRegex.test(cleanPhone) && cleanPhone.length < 10)) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formData.date) {
      errors.date = 'Please select a preferred date.';
    } else if (formData.date < getTodayLocal()) {
      errors.date = 'Date cannot be in the past.';
    }

    if (!formData.time) {
      errors.time = 'Please select a preferred consultation slot.';
    } else {
      const chosenSlot = APPOINTMENT_SLOTS.find(
        (s) => s.time === formData.time || s.label === formData.time
      );
      if (chosenSlot && isSlotDisabled(chosenSlot, formData.date)) {
        errors.time = 'The selected slot time has already passed for today. Please choose an upcoming slot.';
      }
    }

    if (!formData.service) {
      errors.service = 'Please select a service.';
    }

    if (!formData.consent) {
      errors.consent = 'Please confirm consent to proceed.';
    }

    return errors;
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setFormData((prev) => {
      let updatedTime = prev.time;
      if (prev.time) {
        const matchedSlot = APPOINTMENT_SLOTS.find(
          (s) => s.time === prev.time || s.label === prev.time
        );
        if (matchedSlot && isSlotDisabled(matchedSlot, newDate)) {
          updatedTime = '';
        }
      }
      return {
        ...prev,
        date: newDate,
        time: updatedTime
      };
    });

    if (fieldErrors.date || fieldErrors.time) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.date;
        delete next.time;
        return next;
      });
    }
  };

  const handleSlotSelect = (slot) => {
    if (isSlotDisabled(slot, formData.date || getTodayLocal())) return;
    setFormData((prev) => ({
      ...prev,
      time: slot.time
    }));

    if (fieldErrors.time) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next.time;
        return next;
      });
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSecondOpinionPdfChange = (e) => {
    const file = e.target.files?.[0] || null;
    if (!file) {
      setSecondOpinionPdf(null);
      return;
    }

    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    if (!isPdf) {
      setSecondOpinionPdf(null);
      setErrorMessage('Please attach a PDF file only.');
      e.target.value = '';
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setSecondOpinionPdf(null);
      setErrorMessage('Please attach a PDF smaller than 10 MB.');
      e.target.value = '';
      return;
    }

    setErrorMessage('');
    setSecondOpinionPdf(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot) {
      console.warn('Bot submission blocked.');
      return;
    }

    if (loading) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMessage('Please complete all required fields correctly.');
      return;
    }

    setFieldErrors({});
    setErrorMessage('');
    setLoading(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8d1fhan';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_eaqfqj4';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pGa_19T2bUwL6yFQN';

    const formattedDate = formatAppointmentDate(formData.date);
    const formattedTime = formatAppointmentTime(formData.time);
    const referenceId = `DHS-${Math.floor(1000 + Math.random() * 9000)}`;

    const templateParams = {
      patient_name: formData.name.trim(),
      patient_phone: formData.phone.trim(),
      patient_email: formData.email.trim(),
      appointment_date: formattedDate,
      appointment_time: formattedTime,
      service: `${formData.service} (${formData.consultType})`,
      message: formData.reason.trim() || 'No additional notes provided.'
    };

    try {
      if (serviceId && templateId && publicKey && publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        // Send SINGLE EmailJS request (linked Auto-Reply handles patient confirmation)
        await emailjs.sendForm(serviceId, templateId, e.currentTarget, {
          publicKey: publicKey
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmittedData({
        ...templateParams,
        referenceId,
        rawDate: formData.date
      });
      setSubmitted(true);

      // Reset form fields
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Knee Care & Arthroscopy',
        consultType: 'In-Clinic Consultation',
        date: '',
        time: '',
        reason: '',
        consent: true
      });
      setSecondOpinionPdf(null);
    } catch (error) {
      console.error('EmailJS appointment submission failed:', error);
      setErrorMessage(
        'Unable to submit your request at this moment. Please call the clinic directly at +91 78749 04030 for immediate booking.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appt-page-container contact-page-wrapper">
      {/* 1. CONTACT & APPOINTMENT HERO SECTION */}
      <section className="contact-hero-redesign" aria-label="Contact &amp; Appointment Header">
        <div className="contact-hero-shell">
          {/* Left Side: Editorial Typography & Quick Support Items */}
          <div className="contact-hero-content">
            <h1 className="contact-hero-title">Get in Touch &amp; Book an Appointment</h1>
            <p className="contact-hero-desc">
              Have questions about treatment, surgery, or recovery?
              <br />
              I am here to help you with clear guidance, thorough evaluation, and personalized care. Schedule your consultation online below or reach out directly.
            </p>


            {/* Three Quick Support Items */}

          </div>

          {/* Right Side: Single Doctor Image Only */}

        </div>
      </section>

      {/* 3. INTERACTIVE APPOINTMENT BOOKING SECTION */}
      <section className="appt-booking-section" id="appointment-booking" style={{ padding: '30px 0 60px', borderBottom: '1px solid #edf4f4', background: '#f7fafb' }}>
        <div className="appt-shell">
          <div className="appt-two-column-layout">
            {/* LEFT COLUMN: Doctor Authority & Consultation Guide */}
            <aside className="appt-info-column">

            {/* Doctor Credentials Card */}
            <div className="appt-doctor-card">
              <div className="appt-doctor-avatar">
                <span>HS</span>
              </div>
              <div className="appt-doctor-meta">
                <strong>Dr. Harshil Shah</strong>
                <span>M.S. (Orthopaedics) · Arthroscopy & Joint Replacement Surgeon</span>
                <div className="appt-badge-row">

                </div>
              </div>
            </div>

            {/* Urgent Phone Help Box */}
            <div className="appt-direct-call-box">
              <div className="appt-call-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div className="appt-call-copy">
                <small>Need urgent scheduling assistance?</small>
                <a href="tel:+917874904030" className="appt-call-link">
                  +91 78749 04030
                </a>
              </div>
            </div>

            {/* Email Box */}
            <div className="appt-direct-call-box">
              <div className="appt-call-icon-wrap">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div className="appt-call-copy" style={{ minWidth: 0 }}>
                <small>Email consultation & reports</small>
                <a href="mailto:harshilshah199706@gmail.com" className="appt-call-link appt-email-link" title="Email Dr. Harshil Shah">
                  harshilshah199706@gmail.com
                </a>
              </div>
            </div>

            {/* Location Box */}
            <div className="appt-direct-call-box" style={{ alignItems: 'flex-start' }}>
              <div className="appt-call-icon-wrap" style={{ marginTop: '2px' }}>
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="appt-call-copy">
                <small>Clinic location</small>
                <div className="appt-location-name">
                  Curis Hospitals
                </div>
                <p className="appt-location-address">
                  Sindhubhavan Road, Bodakdev, Ahmedabad, Gujarat 380054
                </p>
                <a
                  href="https://maps.app.goo.gl/v94sN3JMwJMwKZYi6?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="appt-location-map-btn"
                  title="Open Curis Hospitals in Google Maps"
                >
                  <span>Open in Google Maps</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Location in Map Box */}
            <div className="appt-map-card">
              <div className="appt-map-header">
                <div className="appt-map-header-left">
                  <span className="appt-map-header-dot"></span>
                  <span className="appt-map-header-title">Location Map</span>
                </div>
                <a
                  href="https://maps.app.goo.gl/v94sN3JMwJMwKZYi6?g_st=iw"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="appt-map-directions-link"
                  title="Get directions to Curis Hospitals"
                >
                  <span>Directions</span>
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </a>
              </div>
              <div className="appt-map-frame-container">
                <iframe
                  title="Curis Hospitals Location Map"
                  src="https://maps.google.com/maps?q=Curis%20Hospitals,%20Sindhubhavan%20Road,%20Bodakdev,%20Ahmedabad,%20Gujarat%20380054&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: 'block' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Senior-Level Form Card / Success Receipt */}
          <main className="appt-form-column">
            <div className="appt-card-surface">
              {/* Form Top Header */}
              <header className="appt-card-header">
                <div>
                  <h2 className="appt-card-title">Book an Appointment</h2>
                </div>
                
              </header>

              {/* Inline Error Notice */}
              {errorMessage && (
                <div className="appt-alert-banner" role="alert">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#dc2626" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* SUCCESS RECEIPT STATE (Apple / Stripe Grade) */}
              {submitted && submittedData ? (
                <div className="appt-receipt-view" role="status">
                  <div className="appt-receipt-icon-wrap">
                    <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#059669" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>

                  <div className="appt-receipt-headline">
                    <h3>Appointment Request Received</h3>
                    <p>
                      Thank you, <strong>{submittedData.patient_name}</strong>. Your consultation details have been sent to my clinical desk.
                    </p>
                  </div>

                  {/* Summary Breakdown Card */}
                  <div className="appt-receipt-breakdown">
                    <div className="appt-receipt-row">
                      <span className="appt-receipt-label">Reference ID</span>
                      <span className="appt-receipt-ref">{submittedData.referenceId}</span>
                    </div>

                    <div className="appt-receipt-divider" />

                    <div className="appt-receipt-row">
                      <span className="appt-receipt-label">Specialty / Service</span>
                      <span className="appt-receipt-val">{submittedData.service}</span>
                    </div>

                    <div className="appt-receipt-row">
                      <span className="appt-receipt-label">Preferred Date & Time</span>
                      <span className="appt-receipt-val">
                        {submittedData.appointment_date} · {submittedData.appointment_time}
                      </span>
                    </div>

                    <div className="appt-receipt-row">
                      <span className="appt-receipt-label">Contact Registered</span>
                      <span className="appt-receipt-val">
                        {submittedData.patient_phone}
                      </span>
                    </div>

                    <div className="appt-receipt-row">
                      <span className="appt-receipt-label">Confirmation Email</span>
                      <span className="appt-receipt-val">
                        {submittedData.patient_email}
                      </span>
                    </div>
                  </div>

                  {/* Clarification Box */}
                  <div className="appt-receipt-next-note">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#146c72" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                    <p>
                      A confirmation email has been dispatched. I or my clinic desk will contact you on <strong>{submittedData.patient_phone}</strong> to confirm your final consultation schedule.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="appt-receipt-actions">
                    <button
                      type="button"
                      className="appt-btn-primary"
                      onClick={() => {
                        setSubmitted(false);
                        setSubmittedData(null);
                      }}
                    >
                      <span>Book Another Appointment</span>
                      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M23 4v6h-6M1 20v-6h6" />
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                      </svg>
                    </button>
                    <a
                      href="https://wa.me/917874904030"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="appt-btn-secondary"
                    >
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </div>
              ) : (
                /* INTAKE FORM (Executive Design) */
                <form className="appt-intake-form" onSubmit={handleSubmit} noValidate>
                  {/* Honeypot anti-spam */}
                  <input
                    type="text"
                    name="website_url"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex="-1"
                    autoComplete="off"
                    aria-hidden="true"
                    className="appt-honeypot"
                  />

                  {/* Row 0: Consultation Type Selector */}
                  <div className="appt-form-field">
                    <span className="appt-field-label">Consultation Type</span>
                    <div className="appt-type-segment">
                      {consultTypes.map((type) => (
                        <button
                          key={type}
                          type="button"
                          className={`appt-type-btn ${formData.consultType === type ? 'is-active' : ''}`}
                          onClick={() => setFormData((prev) => ({ ...prev, consultType: type }))}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {formData.consultType === 'Second Opinion Review' && (
                    <div className="appt-form-field">
                      <label htmlFor="second_opinion_pdf" className="appt-field-label">
                        Attach medical report (PDF, optional)
                      </label>
                      <div className="appt-input-container">
                        <input
                          id="second_opinion_pdf"
                          name="second_opinion_pdf"
                          type="file"
                          accept="application/pdf,.pdf"
                          onChange={handleSecondOpinionPdfChange}
                          className="appt-text-input"
                        />
                      </div>
                      <span className="appt-field-help">
                        Attach one PDF up to 10 MB.
                        {secondOpinionPdf ? ` Selected: ${secondOpinionPdf.name}` : ''}
                      </span>
                    </div>
                  )}

                  <input type="hidden" name="patient_name" value={formData.name.trim()} readOnly />
                  <input type="hidden" name="patient_phone" value={formData.phone.trim()} readOnly />
                  <input type="hidden" name="patient_email" value={formData.email.trim()} readOnly />
                  <input type="hidden" name="appointment_date" value={formatAppointmentDate(formData.date)} readOnly />
                  <input type="hidden" name="appointment_time" value={formatAppointmentTime(formData.time)} readOnly />
                  <input type="hidden" name="service" value={`${formData.service} (${formData.consultType})`} readOnly />
                  <input type="hidden" name="message" value={formData.reason.trim() || 'No additional notes provided.'} readOnly />

                  {/* Row 1: Full Name & Mobile */}
                  <div className="appt-grid-row">
                    <div className="appt-form-field">
                      <label htmlFor="patient_name" className="appt-field-label">
                        Full Name <span className="appt-req-star">*</span>
                      </label>
                      <div className={`appt-input-container ${fieldErrors.name ? 'is-invalid' : ''}`}>
                        <svg className="appt-field-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                        <input
                          id="patient_name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          placeholder="e.g. Rajesh Patel"
                          value={formData.name}
                          onChange={handleChange}
                          className="appt-text-input"
                          aria-invalid={Boolean(fieldErrors.name)}
                        />
                      </div>
                      {fieldErrors.name && <span className="appt-error-hint">{fieldErrors.name}</span>}
                    </div>

                    <div className="appt-form-field">
                      <label htmlFor="patient_phone" className="appt-field-label">
                        Mobile Number <span className="appt-req-star">*</span>
                      </label>
                      <div className={`appt-input-container ${fieldErrors.phone ? 'is-invalid' : ''}`}>
                        <svg className="appt-field-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                        <input
                          id="patient_phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          required
                          autoComplete="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          className="appt-text-input"
                          aria-invalid={Boolean(fieldErrors.phone)}
                        />
                      </div>
                      {fieldErrors.phone && <span className="appt-error-hint">{fieldErrors.phone}</span>}
                    </div>
                  </div>

                  {/* Row 2: Email & Area of Concern */}
                  <div className="appt-grid-row">
                    <div className="appt-form-field">
                      <label htmlFor="patient_email" className="appt-field-label">
                        Email Address <span className="appt-req-star">*</span>
                      </label>
                      <div className={`appt-input-container ${fieldErrors.email ? 'is-invalid' : ''}`}>
                        <svg className="appt-field-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                          <polyline points="22,6 12,13 2,6" />
                        </svg>
                        <input
                          id="patient_email"
                          name="email"
                          type="email"
                          inputMode="email"
                          required
                          autoComplete="email"
                          placeholder="rajesh@example.com"
                          value={formData.email}
                          onChange={handleChange}
                          className="appt-text-input"
                          aria-invalid={Boolean(fieldErrors.email)}
                        />
                      </div>
                      {fieldErrors.email && <span className="appt-error-hint">{fieldErrors.email}</span>}
                    </div>

                    <div className="appt-form-field" ref={serviceDropdownRef}>
                      <label id="patient_service_label" className="appt-field-label">
                        Area of Concern / Specialty <span className="appt-req-star">*</span>
                      </label>
                      <div className={`appt-input-container appt-select-container ${fieldErrors.service ? 'is-invalid' : ''} ${serviceOpen ? 'is-open' : ''}`}>
                        <svg className="appt-field-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>

                        <button
                          type="button"
                          id="patient_service"
                          aria-haspopup="listbox"
                          aria-expanded={serviceOpen}
                          aria-labelledby="patient_service_label patient_service"
                          className="appt-text-input appt-custom-select-trigger"
                          onClick={() => setServiceOpen((prev) => !prev)}
                        >
                          <span className="appt-selected-service-text">
                            {formData.service || 'Select Specialty'}
                          </span>
                          <svg
                            className={`appt-select-chevron ${serviceOpen ? 'is-rotated' : ''}`}
                            viewBox="0 0 24 24"
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>

                        <input type="hidden" name="service" value={formData.service} />

                        {serviceOpen && (
                          <div className="appt-custom-select-menu" role="listbox" aria-labelledby="patient_service_label">
                            {serviceOptions.map((srv) => {
                              const isSelected = formData.service === srv;
                              return (
                                <button
                                  type="button"
                                  key={srv}
                                  role="option"
                                  aria-selected={isSelected}
                                  className={`appt-custom-select-item ${isSelected ? 'is-selected' : ''}`}
                                  onClick={() => handleSelectService(srv)}
                                >
                                  <span className="appt-option-text">{srv}</span>
                                  {isSelected && (
                                    <svg className="appt-option-check" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                      {fieldErrors.service && <span className="appt-error-hint">{fieldErrors.service}</span>}
                    </div>
                  </div>

                  {/* Row 3: Date & 30-min Consultation Time Slots */}
                  <div className="appt-form-field">
                    <label htmlFor="patient_date" className="appt-field-label">
                      Preferred Date <span className="appt-req-star">*</span>
                    </label>
                    <div className={`appt-input-container ${fieldErrors.date ? 'is-invalid' : ''}`}>
                      <svg className="appt-field-icon" viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                        <line x1="16" y1="2" x2="16" y2="6" />
                        <line x1="8" y1="2" x2="8" y2="6" />
                        <line x1="3" y1="10" x2="21" y2="10" />
                      </svg>
                      <input
                        id="patient_date"
                        type="date"
                        name="date"
                        min={getTodayLocal()}
                        value={formData.date}
                        onChange={handleDateChange}
                        className="appt-text-input"
                        aria-invalid={Boolean(fieldErrors.date)}
                      />
                    </div>
                    {fieldErrors.date && <span className="appt-error-hint">{fieldErrors.date}</span>}
                  </div>

                  {/* Slot Selection Grid (10:30 AM to 7:00 PM · 30 min intervals) */}
                  <div className="appt-form-field appt-slots-section-wrap">
                    <div className="appt-slot-header-row">
                      <label className="appt-field-label">
                        Preferred Time Slot (30 Min) <span className="appt-req-star">*</span>
                      </label>
                    </div>

                    {formData.date &&
                      formData.date === getTodayLocal() &&
                      APPOINTMENT_SLOTS.every((s) => isSlotDisabled(s, formData.date)) && (
                        <div className="appt-slot-all-passed-alert" role="alert">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                          </svg>
                          <span>All consultation slots for today are finished. Please select tomorrow or a later date.</span>
                        </div>
                      )}

                    {/* Ultra Pro Max Active Selection Preview Ribbon */}
                    {formData.time && (
                      <div className="appt-selected-slot-banner" role="status" aria-live="polite">
                        <div className="appt-selected-slot-pulse-icon">
                          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <div className="appt-selected-slot-info">
                          <span className="appt-selected-slot-sub">Selected Slot</span>
                          <strong className="appt-selected-slot-main">
                            {formatAppointmentDate(formData.date || getTodayLocal())} · {formatAppointmentTime(formData.time)}
                          </strong>
                        </div>
                        <div className="appt-selected-slot-badge">
                          <span>RESERVED</span>
                        </div>
                      </div>
                    )}

                    <div className={`appt-slots-container ${fieldErrors.time ? 'is-invalid' : ''}`}>
                      {['Morning', 'Afternoon', 'Evening'].map((period) => {
                        const periodSlots = APPOINTMENT_SLOTS.filter((s) => s.period === period);
                        return (
                          <div key={period} className="appt-slots-group">
                            <div className="appt-slots-group-label">
                              {period === 'Morning' && 'Morning (10:30 AM – 12:30 PM)'}
                              {period === 'Afternoon' && 'Afternoon (01:00 PM – 04:30 PM)'}
                              {period === 'Evening' && 'Evening (05:00 PM – 07:00 PM)'}
                            </div>
                            <div className="appt-slots-grid">
                              {periodSlots.map((slot, index) => {
                                const disabled = isSlotDisabled(slot, formData.date || getTodayLocal());
                                const isSelected = formData.time === slot.time;
                                return (
                                  <button
                                    key={slot.time}
                                    type="button"
                                    disabled={disabled}
                                    style={{ '--slot-delay': `${index * 0.03}s` }}
                                    className={`appt-slot-btn ${isSelected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
                                    onClick={() => handleSlotSelect(slot)}
                                    title={disabled ? 'This slot time has already passed for today' : `Select ${slot.label}`}
                                    aria-pressed={isSelected}
                                  >
                                    <span className="appt-slot-btn-text">{slot.label}</span>
                                    {isSelected && (
                                      <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="appt-slot-check-icon">
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                    {isSelected && <span className="appt-slot-shimmer-glow" aria-hidden="true" />}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    {fieldErrors.time && <span className="appt-error-hint">{fieldErrors.time}</span>}
                  </div>

                  {/* Row 4: Medical Symptoms & Notes */}
                  <div className="appt-form-field">
                    <label htmlFor="patient_reason" className="appt-field-label">
                      Describe Your Symptoms or Medical History <span className="appt-opt-tag">(Optional)</span>
                    </label>
                    <div className="appt-input-container appt-textarea-container">
                      <textarea
                        id="patient_reason"
                        name="reason"
                        rows="3"
                        placeholder="e.g. Left knee stiffness after walking for 15 mins; prior ligament tear history or MRI available..."
                        value={formData.reason}
                        onChange={handleChange}
                        className="appt-text-input appt-textarea-input"
                      />
                    </div>
                  </div>

                  {/* Row 5: Consent */}
                  <div className="appt-consent-group">
                    <label className="appt-consent-item">
                      <input
                        type="checkbox"
                        required
                        name="consent"
                        checked={formData.consent}
                        onChange={handleChange}
                        className="appt-custom-check"
                      />
                      <span className="appt-consent-text">
                        I consent to Dr. Harshil Shah's clinic contacting me via Phone / WhatsApp to verify and coordinate my consultation appointment.
                      </span>
                    </label>
                    {fieldErrors.consent && <span className="appt-error-hint">{fieldErrors.consent}</span>}
                  </div>

                  {/* Row 6: Submit Button */}
                  <button
                    className="appt-btn-primary appt-submit-btn"
                    type="submit"
                    disabled={loading}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {loading ? (
                      <>
                        <span className="appt-spinner" aria-hidden="true" />
                        <span style={{ whiteSpace: 'nowrap' }}>Sending Request to Clinic...</span>
                      </>
                    ) : (
                      <span style={{ whiteSpace: 'nowrap' }}>Submit Appointment Request</span>
                    )}
                  </button>

                  {/* Security Guarantee */}
                  <footer className="appt-security-seal">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#146c72" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span>Confidential Medical Intake · Direct Clinic Desk · No Third-Party Data Sharing</span>
                  </footer>
                </form>
              )}
            </div>
          </main>
        </div>
      </div>
      </section>

      {/* 4. Patient Preparation / Visiting Section */}
      <section className="visit-section">
        <div className="visit-container">
          <div className="cp-consult-layout">
            {/* Left Column: Heading and Guidance */}
            <div className="cp-consult-left">
              <h2 className="contact-support-main-heading">
                Prepare for Your Consultation
              </h2>

              <p className="visit-intro-lead">
                A few simple preparation steps allow me to provide an accurate clinical assessment and guide you toward a targeted recovery pathway from day one.
              </p>
            </div>

            {/* Step 01 */}
            <div className="visit-step-card">
              <div className="visit-step-top">
                <span className="visit-step-num">STEP 01</span>

              </div>
              <h3 className="visit-step-title">Bring Previous Reports &amp; Scans</h3>
              <p className="visit-step-desc">
                Prior X-rays, MRI scans, CT reports, or blood tests help compare progression and avoid repeating unnecessary scans.
              </p>

            </div>

            {/* Step 02 */}
            <div className="visit-step-card">
              <div className="visit-step-top">
                <span className="visit-step-num">STEP 02</span>

              </div>
              <h3 className="visit-step-title">List Ongoing Medications</h3>
              <p className="visit-step-desc">
                Note down daily medicines, blood thinners, past surgeries, and any known drug or analgesic allergies.
              </p>

            </div>

            {/* Step 03 */}
            <div className="visit-step-card">
              <div className="visit-step-top">
                <span className="visit-step-num">STEP 03</span>

              </div>
              <h3 className="visit-step-title">Note Your Key Questions</h3>
              <p className="visit-step-desc">
                Write down when pain triggers, daily activities affected, and what outcome goals you want to achieve.
              </p>

            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
