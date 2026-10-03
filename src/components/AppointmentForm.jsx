import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Knee Care & Arthroscopy',
    date: '',
    time: 'Morning',
    reason: '',
    consent: true
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  const serviceOptions = [
    'Knee Care & Arthroscopy',
    'Total Knee Replacement (TKR)',
    'Hip Preservation & Replacement',
    'Shoulder Arthroscopy & Rotator Cuff',
    'Sports Injury & Ligament Repair (ACL/PCL)',
    'Joint Pain & Arthritis Consultation',
    'Second Opinion on Orthopaedic Surgery'
  ];

  const getTodayLocal = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatAppointmentDate = (dateValue) => {
    if (!dateValue) return 'To be coordinated';
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

  const normalizePhone = (phone) => phone.replace(/[\s()-]/g, '');

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please enter your full name (minimum 2 characters).';
    }
    const cleanPhone = normalizePhone(formData.phone);
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please enter a valid 10-digit mobile number.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.date) {
      errors.date = 'Please select a preferred appointment date.';
    } else if (formData.date < getTodayLocal()) {
      errors.date = 'Appointment date cannot be in the past.';
    }
    if (!formData.consent) {
      errors.consent = 'Please confirm consent.';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setErrorMessage('');
    setSubmitting(true);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_8d1fhan';
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_eaqfqj4';
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'pGa_19T2bUwL6yFQN';

    const templateParams = {
      patient_name: formData.name.trim(),
      patient_phone: formData.phone.trim(),
      patient_email: formData.email.trim(),
      appointment_date: formatAppointmentDate(formData.date),
      appointment_time: formData.time,
      service: formData.service,
      message: formData.reason.trim() || 'No additional message provided.'
    };

    try {
      if (serviceId && templateId && publicKey && publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY') {
        // Send ONLY ONE EmailJS request
        await emailjs.send(serviceId, templateId, templateParams, {
          publicKey: publicKey
        });
      } else {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setSubmittedData(templateParams);
      setSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'Knee Care & Arthroscopy',
        date: '',
        time: 'Morning',
        reason: '',
        consent: true
      });
    } catch (error) {
      console.error('EmailJS submission failed:', error);
      setErrorMessage('Unable to send appointment request. Please check connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-panel">
      <div className="form-heading">
        <span>Request consultation</span>
        <p>Private &amp; confidential</p>
      </div>

      {errorMessage && (
        <div className="ultra-error-banner" style={{ marginTop: '16px' }} role="alert">
          <span>{errorMessage}</span>
        </div>
      )}

      {submitted && submittedData ? (
        <div className="form-success-banner" style={{ marginTop: '24px' }}>
          <div>
            <strong style={{ display: 'block', fontSize: '16px', color: 'var(--teal-dark)' }}>
              Appointment Request Received
            </strong>
            <p style={{ margin: '8px 0 0', color: 'var(--ink)', fontSize: '14px', lineHeight: '1.6' }}>
              Thank you, <strong>{submittedData.patient_name}</strong>. Your appointment request for <strong>{submittedData.service}</strong> on <strong>{submittedData.appointment_date} ({submittedData.appointment_time})</strong> has been received.
            </p>
            <p style={{ margin: '8px 0 0', color: '#64748b', fontSize: '13px' }}>
              A confirmation has been sent to your email ({submittedData.patient_email}). The clinic desk will contact you at <strong>{submittedData.patient_phone}</strong> to confirm your slot.
            </p>
            <button
              type="button"
              className="button button-small"
              style={{ marginTop: '16px', background: 'var(--teal)' }}
              onClick={() => {
                setSubmitted(false);
                setSubmittedData(null);
              }}
            >
              Book Another Appointment
            </button>
          </div>
        </div>
      ) : (
        <form className="appointment-form" onSubmit={handleSubmit} noValidate>
          <div className="form-row">
            <label>
              <span>Your Name *</span>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Rajesh Patel"
                value={formData.name}
                onChange={handleChange}
              />
              {fieldErrors.name && <small style={{ color: '#ef4444' }}>{fieldErrors.name}</small>}
            </label>
            <label>
              <span>Mobile Number *</span>
              <input
                type="tel"
                name="phone"
                required
                placeholder="+91 98765 43210"
                value={formData.phone}
                onChange={handleChange}
              />
              {fieldErrors.phone && <small style={{ color: '#ef4444' }}>{fieldErrors.phone}</small>}
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Email Address *</span>
              <input
                type="email"
                name="email"
                required
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleChange}
              />
              {fieldErrors.email && <small style={{ color: '#ef4444' }}>{fieldErrors.email}</small>}
            </label>
            <label>
              <span>Service / Consultation *</span>
              <select
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                {serviceOptions.map((srv) => (
                  <option key={srv} value={srv}>
                    {srv}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              <span>Preferred Date *</span>
              <input
                type="date"
                name="date"
                min={getTodayLocal()}
                value={formData.date}
                onChange={handleChange}
              />
              {fieldErrors.date && <small style={{ color: '#ef4444' }}>{fieldErrors.date}</small>}
            </label>
            <label>
              <span>Preferred Slot</span>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
              >
                <option value="Morning">Morning (10:00 AM - 1:00 PM)</option>
                <option value="Afternoon">Afternoon (2:00 PM - 5:00 PM)</option>
                <option value="Evening">Evening (5:30 PM - 8:30 PM)</option>
              </select>
            </label>
          </div>

          <label>
            <span>Message / Concern (Optional)</span>
            <textarea
              name="reason"
              rows="3"
              placeholder="Briefly describe symptoms, MRI reports, or joint condition..."
              value={formData.reason}
              onChange={handleChange}
            />
          </label>

          <label className="consent">
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
              required
            />
            <span>
              I agree to be contacted by Dr. Harshil Shah's clinic via phone / WhatsApp regarding my consultation request.
            </span>
          </label>
          {fieldErrors.consent && <small style={{ color: '#ef4444', display: 'block', marginBottom: '8px' }}>{fieldErrors.consent}</small>}

          <button
            type="submit"
            className="button form-submit"
            disabled={submitting}
            style={{ width: '100%', marginTop: '10px' }}
          >
            {submitting ? 'Sending Request...' : 'Book an Appointment'}
          </button>

          <div className="privacy-line">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <p>Your medical information is held strictly confidential and never shared.</p>
          </div>
        </form>
      )}
    </div>
  );
}
