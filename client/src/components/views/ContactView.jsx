import React from 'react';
import { Send, CheckCircle2, User, Mail as MailIcon, Sparkles } from 'lucide-react';
import Card from '../ui/Card';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Textarea from '../ui/Textarea';
import Button from '../ui/Button';
import Badge from '../ui/Badge';

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
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-up">
      {/* Header */}
      <div className="text-center space-y-3">
        <Badge variant="indigo" dot>
          Direct Founder Access
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-heading">Start Your Project</h2>
        <p className="text-slate-600 text-xs sm:text-sm">
          Submit your requirements for direct engineering review by Aditya, Mayur, and Manish.
        </p>
      </div>

      {/* Success Notification Alert */}
      {submitSuccess && (
        <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-900 space-y-3 animate-fade-up shadow-xs">
          <div className="flex items-center gap-2.5 font-bold text-sm sm:text-base font-heading">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Inquiry Received Successfully! (ID: {submitSuccess.id})</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-800 leading-relaxed">
            Thank you, <strong>{submitSuccess.clientName}</strong>! Our founder team will review your inquiry for{' '}
            <strong>{submitSuccess.serviceTitle}</strong> and respond to <strong>{submitSuccess.clientEmail}</strong> within 24 hours.
          </p>
          <button
            type="button"
            onClick={() => setSubmitSuccess(null)}
            className="text-xs underline text-emerald-700 hover:text-emerald-900 font-semibold pt-1"
          >
            Submit Another Request
          </button>
        </div>
      )}

      {/* Project Request Form */}
      <Card padding="p-6 sm:p-8">
        <form onSubmit={handleSubmitInquiry} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Input
              label="Your Full Name"
              required
              placeholder="e.g. Alex Johnson"
              icon={User}
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />

            <Input
              label="Email Address"
              type="email"
              required
              placeholder="alex@techventures.io"
              icon={MailIcon}
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Select
              label="Service Category"
              value={formService}
              onChange={(e) => setFormService(e.target.value)}
            >
              <option value="web-dev">Website Development</option>
              <option value="android-dev">Android App Development</option>
              <option value="cloud-solutions">Cloud Solutions & DevOps</option>
              <option value="promo-videos">Promotional Video Production</option>
            </Select>

            <Select
              label="Budget Range"
              value={formBudget}
              onChange={(e) => setFormBudget(e.target.value)}
            >
              <option value="$350 - $1,000">$350 - $1,000</option>
              <option value="$1,000 - $2,500">$1,000 - $2,500</option>
              <option value="$2,500 - $5,000">$2,500 - $5,000</option>
              <option value="$5,000+">$5,000+</option>
            </Select>

            <Select
              label="Target Timeline"
              value={formTimeline}
              onChange={(e) => setFormTimeline(e.target.value)}
            >
              <option value="Urgent (1 Week)">Urgent (1 Week)</option>
              <option value="Within 2 Weeks">Within 2 Weeks</option>
              <option value="1 Month">1 Month</option>
              <option value="Flexible">Flexible</option>
            </Select>
          </div>

          <Textarea
            label="Project Requirements"
            required
            rows={5}
            placeholder="Describe your project goals, tech stack preferences, target audience, or specific features needed..."
            value={formDetails}
            onChange={(e) => setFormDetails(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={formSubmitting}
            icon={Send}
            iconPosition="left"
            className="w-full"
          >
            Send Project Request
          </Button>
        </form>
      </Card>
    </div>
  );
}
