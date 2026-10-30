import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';

export default function ContactView({
  formName,
  setFormName,
  formEmail,
  setFormEmail,
  formService,
  setFormService,
  formBudget,
  setFormBudget,
  formTimeline,
  setFormTimeline,
  formDetails,
  setFormDetails,
  formSubmitting,
  submitSuccess,
  setSubmitSuccess,
  handleSubmitInquiry
}) {
  const standardBudgetOptions = [
    { value: '₹50,000 - ₹1,00,000', label: '₹50,000 - ₹1,00,000' },
    { value: '₹1,00,000 - ₹2,50,000', label: '₹1,00,000 - ₹2,50,000' },
    { value: '₹2,50,000 - ₹5,00,000', label: '₹2,50,000 - ₹5,00,000' },
    { value: '₹5,00,000+', label: '₹5,00,000+ (Scale)' }
  ];

  // Dynamic budget options supporting custom estimate transfers from the Estimator view
  const budgetOptions = React.useMemo(() => {
    if (formBudget && !standardBudgetOptions.some((opt) => opt.value === formBudget)) {
      return [
        { value: formBudget, label: `Estimated: ${formBudget}` },
        ...standardBudgetOptions
      ];
    }
    return standardBudgetOptions;
  }, [formBudget]);
  return (
    <div className="max-w-2xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-12 page-transition">
      {/* Editorial Header */}
      <div className="space-y-4">
        <span className="eyebrow-minimal block">CONTACT & ENQUIRY</span>
        <h1 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#171717] font-heading leading-tight">
          Start a project with us.
        </h1>
        <p className="text-sm sm:text-base text-[#777777] leading-relaxed">
          Tell us about what you want to build. Our founding team will review your requirements and reach out within 24 hours.
        </p>
      </div>

      {/* Success Notification */}
      {submitSuccess && (
        <div className="p-6 bg-[#F7F6F2] border border-[#E7E7E7] rounded-md space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-[#171717]">
            <Check className="w-4 h-4 text-[#171717]" />
            <span>Enquiry Received (ID: {submitSuccess.id})</span>
          </div>
          <p className="text-xs text-[#777777]">
            Thank you, {submitSuccess.clientName}. We will email you at <strong>{submitSuccess.clientEmail}</strong> with an initial scoping review.
          </p>
          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="text-xs text-[#171717] underline pt-1 cursor-pointer"
          >
            Submit another message
          </button>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmitInquiry} className="space-y-6 border-t border-[#E7E7E7] pt-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Your Name"
            placeholder="Rahul Sharma"
            required
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
          <Input
            label="Email Address"
            type="email"
            placeholder="rahul@example.com"
            required
            value={formEmail}
            onChange={(e) => setFormEmail(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Service"
            value={formService}
            onChange={(e) => setFormService(e.target.value)}
            options={[
              { value: 'web-dev', label: 'Web Platform' },
              { value: 'android-dev', label: 'Android Application' },
              { value: 'cloud-solutions', label: 'Cloud & DevOps' },
              { value: 'promo-videos', label: 'Promotional Media' },
              { value: 'custom', label: 'Custom Architecture' }
            ]}
          />
          <Select
            label="Budget"
            value={formBudget}
            onChange={(e) => setFormBudget(e.target.value)}
            options={budgetOptions}
          />
          <Select
            label="Target Timeline"
            value={formTimeline}
            onChange={(e) => setFormTimeline(e.target.value)}
            options={[
              { value: 'Within 2 Weeks', label: 'Within 2 Weeks' },
              { value: 'Within 1 Month', label: 'Within 1 Month' },
              { value: '1-3 Months', label: '1-3 Months' },
              { value: 'Flexible', label: 'Flexible' }
            ]}
          />
        </div>

        <Textarea
          label="Project Overview & Requirements"
          rows={5}
          required
          placeholder="Briefly describe your product goals, technical stack preferences, and any existing infrastructure..."
          value={formDetails}
          onChange={(e) => setFormDetails(e.target.value)}
        />

        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={formSubmitting}
            className="w-full sm:w-auto"
          >
            {formSubmitting ? 'Submitting...' : 'Send Enquiry'}
          </Button>
        </div>
      </form>

      {/* Direct Email */}
      <div className="border-t border-[#E7E7E7] pt-8 text-xs font-mono text-[#777777]">
        Direct Founder Contact:{' '}
        <a href="mailto:aditya@solvespace.online" className="text-[#171717] hover:underline font-medium">
          aditya@solvespace.online
        </a>
      </div>
    </div>
  );
}
