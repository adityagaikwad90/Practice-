import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import LogoMonogram from './components/ui/LogoMonogram';

// Views
import HomeView from './components/views/HomeView';
import ServicesView from './components/views/ServicesView';
import WorkView from './components/views/WorkView';
import CareersView from './components/views/CareersView';
import EstimatorView from './components/views/EstimatorView';
import TeamView from './components/views/TeamView';
import ContactView from './components/views/ContactView';
import InquiriesView from './components/views/InquiriesView';

import './App.css';

export default function App() {
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState('home');
  const [initialLoading, setInitialLoading] = useState(() => {
    try {
      return !sessionStorage.getItem('solvespace_welcomed');
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (initialLoading) {
      const timer = setTimeout(() => {
        setInitialLoading(false);
        try {
          sessionStorage.setItem('solvespace_welcomed', 'true');
        } catch {}
      }, 750);
      return () => clearTimeout(timer);
    }
  }, [initialLoading]);

  const [serverHealth, setServerHealth] = useState({ status: 'checking', message: 'Connecting to server...' });
  const [teamMembers, setTeamMembers] = useState([]);
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState({
    projectsCompleted: 54,
    happyClients: 42,
    cloudDeployments: 88,
    systemUptime: '99.98%'
  });
  const [inquiries, setInquiries] = useState([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);

  // Estimator State
  const [selectedService, setSelectedService] = useState('web-dev');
  const [projectScale, setProjectScale] = useState('medium');
  const [timelineUrgency, setTimelineUrgency] = useState('standard');

  // Inquiry Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formService, setFormService] = useState('web-dev');
  const [formBudget, setFormBudget] = useState('₹1,00,000 - ₹2,50,000');
  const [formTimeline, setFormTimeline] = useState('Within 1 Month');
  const [formDetails, setFormDetails] = useState('');
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Check Backend Health & Fetch Data
  const checkHealth = async () => {
    try {
      const res = await fetch('/api/health');
      if (res.ok) {
        const data = await res.json();
        setServerHealth({
          status: 'online',
          message: `${data.app || 'Express API'} online`,
          uptime: data.uptime
        });
      } else {
        setServerHealth({ status: 'offline', message: 'Server error response' });
      }
    } catch (err) {
      setServerHealth({ status: 'offline', message: 'Unable to reach backend API' });
    }
  };

  const fetchInitialData = async () => {
    try {
      const [teamRes, servicesRes, statsRes] = await Promise.all([
        fetch('/api/team'),
        fetch('/api/services'),
        fetch('/api/stats')
      ]);

      if (teamRes.ok) setTeamMembers(await teamRes.json());
      if (servicesRes.ok) setServices(await servicesRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (err) {
      console.error('Error loading startup data:', err);
    }
  };

  const fetchInquiries = async () => {
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/inquiries');
      if (res.ok) {
        setInquiries(await res.json());
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchInitialData();
  }, []);

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
    // Scroll to top on navigation change
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Handle Form Submission
  const handleSubmitInquiry = async (e) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formDetails.trim()) return;

    setFormSubmitting(true);
    setSubmitSuccess(null);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formName,
          clientEmail: formEmail,
          serviceId: formService,
          budgetRange: formBudget,
          timeline: formTimeline,
          projectDetails: formDetails
        })
      });

      if (res.ok) {
        const data = await res.json();
        setSubmitSuccess(data.inquiry);
        setFormName('');
        setFormEmail('');
        setFormDetails('');
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (err) {
      console.error('Inquiry error:', err);
      alert('Error connecting to server.');
    } finally {
      setFormSubmitting(false);
    }
  };

  // Calculate Instant Estimate in INR
  const getEstimatedPrice = () => {
    let basePrice = 40000;
    if (selectedService === 'web-dev') basePrice = 40000;
    if (selectedService === 'android-dev') basePrice = 65000;
    if (selectedService === 'cloud-solutions') basePrice = 50000;
    if (selectedService === 'promo-videos') basePrice = 30000;

    let scaleMultiplier = 1;
    if (projectScale === 'medium') scaleMultiplier = 1.8;
    if (projectScale === 'enterprise') scaleMultiplier = 3.2;

    let urgencyMultiplier = 1;
    if (timelineUrgency === 'rush') urgencyMultiplier = 1.25;
    if (timelineUrgency === 'relaxed') urgencyMultiplier = 0.9;

    const estimatedTotal = Math.round(basePrice * scaleMultiplier * urgencyMultiplier);
    return `₹${estimatedTotal.toLocaleString('en-IN')}`;
  };

  return (
    <div className="min-h-screen bg-white text-[#171717] flex flex-col font-sans relative selection:bg-[#171717] selection:text-white">
      {/* Initial Signature Monogram Entrance (Session-cached) */}
      <AnimatePresence>
        {initialLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center pointer-events-none"
          >
            <LogoMonogram size={48} animated={true} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area with Seamless Transitions */}
      <main className="flex-grow overflow-x-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            {activeTab === 'home' && (
              <HomeView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'services' && (
              <ServicesView
                services={services}
                setFormService={setFormService}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'work' && (
              <WorkView setActiveTab={setActiveTab} />
            )}

            {(activeTab === 'about' || activeTab === 'team') && (
              <TeamView teamMembers={teamMembers} setActiveTab={setActiveTab} />
            )}

            {activeTab === 'careers' && (
              <CareersView setActiveTab={setActiveTab} />
            )}

            {activeTab === 'estimator' && (
              <EstimatorView
                selectedService={selectedService}
                setSelectedService={setSelectedService}
                projectScale={projectScale}
                setProjectScale={setProjectScale}
                timelineUrgency={timelineUrgency}
                setTimelineUrgency={setTimelineUrgency}
                getEstimatedPrice={getEstimatedPrice}
                setFormService={setFormService}
                setFormBudget={setFormBudget}
                setActiveTab={setActiveTab}
              />
            )}

            {activeTab === 'contact' && (
              <ContactView
                formName={formName}
                setFormName={setFormName}
                formEmail={formEmail}
                setFormEmail={setFormEmail}
                formService={formService}
                setFormService={setFormService}
                formBudget={formBudget}
                setFormBudget={setFormBudget}
                formTimeline={formTimeline}
                setFormTimeline={setFormTimeline}
                formDetails={formDetails}
                setFormDetails={setFormDetails}
                formSubmitting={formSubmitting}
                submitSuccess={submitSuccess}
                setSubmitSuccess={setSubmitSuccess}
                handleSubmitInquiry={handleSubmitInquiry}
              />
            )}

            {activeTab === 'inquiries' && (
              <InquiriesView
                inquiries={inquiries}
                loadingInquiries={loadingInquiries}
                fetchInquiries={fetchInquiries}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Minimal Footer */}
      <Footer setActiveTab={setActiveTab} serverHealth={serverHealth} />
    </div>
  );
}
