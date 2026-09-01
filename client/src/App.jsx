import React, { useState, useEffect } from 'react';

// Layout Components
import TopBar from './components/layout/TopBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Views
import HomeView from './components/views/HomeView';
import ServicesView from './components/views/ServicesView';
import EstimatorView from './components/views/EstimatorView';
import TeamView from './components/views/TeamView';
import ContactView from './components/views/ContactView';
import InquiriesView from './components/views/InquiriesView';

import './App.css';

export default function App() {
  // Navigation & Core State
  const [activeTab, setActiveTab] = useState('home');
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
  const [formBudget, setFormBudget] = useState('$1,000 - $2,500');
  const [formTimeline, setFormTimeline] = useState('Within 2 Weeks');
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
    const interval = setInterval(checkHealth, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (activeTab === 'inquiries') {
      fetchInquiries();
    }
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

  // Calculate Instant Estimate
  const getEstimatedPrice = () => {
    let basePrice = 500;
    if (selectedService === 'web-dev') basePrice = 499;
    if (selectedService === 'android-dev') basePrice = 799;
    if (selectedService === 'cloud-solutions') basePrice = 599;
    if (selectedService === 'promo-videos') basePrice = 349;

    let scaleMultiplier = 1;
    if (projectScale === 'medium') scaleMultiplier = 1.8;
    if (projectScale === 'enterprise') scaleMultiplier = 3.2;

    let urgencyMultiplier = 1;
    if (timelineUrgency === 'rush') urgencyMultiplier = 1.3;
    if (timelineUrgency === 'relaxed') urgencyMultiplier = 0.9;

    const estimatedTotal = Math.round(basePrice * scaleMultiplier * urgencyMultiplier);
    return `$${estimatedTotal.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] text-slate-900 flex flex-col font-sans relative selection:bg-indigo-500/15 selection:text-indigo-900">
      {/* Background Animated Ambient Mesh */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* Top System Status Bar */}
      <TopBar serverHealth={serverHealth} />

      {/* Main Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content View Container */}
      <main className="flex-grow relative z-10">
        {activeTab === 'home' && (
          <HomeView stats={stats} setActiveTab={setActiveTab} />
        )}

        {activeTab === 'services' && (
          <ServicesView
            services={services}
            setFormService={setFormService}
            setActiveTab={setActiveTab}
          />
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

        {activeTab === 'team' && (
          <TeamView teamMembers={teamMembers} />
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
      </main>

      {/* Footer */}
<<<<<<< HEAD
      <footer className="bg-slate-950 border-t border-slate-800/80 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-lg text-white">SolveSpace Technologies</span>
            </div>
            <p className="text-slate-400 text-xs max-w-md leading-relaxed">
              Full-service digital engineering startup specializing in Web Development, Android App Development, Cloud Architecture, and Promotional Video Reels.
            </p>
            <div className="text-xs font-mono text-indigo-400">Domain: solvespace.online</div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Founders</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Aditya Gaikwad – Cloud Solution Provider</li>
              <li>Mayur Choudhary – Android Developer</li>
              <li>Manish Mali – Backend Developer</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-white tracking-wider">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 text-[11px] text-slate-300">
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">React 18</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Tailwind CSS</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Node / Express</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Docker</span>
              <span className="px-2 py-1 bg-slate-900 border border-slate-800 rounded">Nginx</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} SolveSpace Technologies. All rights reserved. Powered by Docker & EC2 & Aditya Gaikwad.
        </div>
      </footer>
=======
      <Footer setActiveTab={setActiveTab} />
>>>>>>> 9c7fa30 (upgrade design)
    </div>
  );
}
