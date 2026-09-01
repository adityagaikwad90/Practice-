import React, { useState } from 'react';
import { Activity, Search, AlertCircle, Eye, Calendar, DollarSign, Clock, MessageSquare } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { CardSkeleton } from '../ui/Skeleton';

export default function InquiriesView({
  inquiries,
  loadingInquiries,
  fetchInquiries
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case 'In Review': return 'indigo';
      case 'Contacted': return 'emerald';
      case 'Pending Review': return 'amber';
      default: return 'sky';
    }
  };

  // Filter inquiries based on search term & status
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.clientEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === 'ALL' || inq.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-8 animate-fade-up">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="indigo" dot>
              Live API Storage
            </Badge>
            <span className="text-[11px] font-mono text-slate-500">GET /api/inquiries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1 font-heading">
            Client Portal & Live Inquiries
          </h2>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Activity}
          onClick={fetchInquiries}
          loading={loadingInquiries}
          className="self-start md:self-auto"
        >
          Refresh Feed
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by name, email, ID..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          {['ALL', 'Pending Review', 'In Review', 'Contacted'].map((status) => {
            const isActive = statusFilter === status;
            return (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 shadow-xs font-semibold'
                    : 'bg-slate-100 text-slate-600 border border-slate-200 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                {status}
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Feed */}
      {loadingInquiries ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <Card padding="p-12" className="text-center space-y-3">
          <AlertCircle className="w-8 h-8 text-slate-400 mx-auto animate-soft-pulse" />
          <h3 className="text-base font-bold text-slate-900 font-heading">No Inquiries Found</h3>
          <p className="text-slate-500 text-xs max-w-sm mx-auto">
            {searchTerm || statusFilter !== 'ALL'
              ? 'No project requests match your current search or status filter criteria.'
              : 'No project inquiries submitted yet. Submit a request from the Get Started tab!'}
          </p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInquiries.map((inq) => {
            const badgeVariant = getStatusBadgeVariant(inq.status);
            return (
              <Card key={inq.id} hover padding="p-6" className="space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono px-2 py-0.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded font-semibold">
                        {inq.id}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 mt-1.5 font-heading">{inq.clientName}</h3>
                      <p className="text-xs text-slate-500">{inq.clientEmail}</p>
                    </div>

                    <Badge variant={badgeVariant} dot size="sm">
                      {inq.status}
                    </Badge>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="text-slate-700">
                      Service: <strong className="text-slate-900 font-semibold">{inq.serviceTitle}</strong>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 font-mono text-[11px]">
                      <span>Budget: {inq.budgetRange}</span>
                      <span>•</span>
                      <span>Timeline: {inq.timeline}</span>
                    </div>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 border border-slate-200/80 line-clamp-3">
                    "{inq.projectDetails}"
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">
                    {new Date(inq.createdAt).toLocaleString()}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Eye}
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Inquiry Detail Modal */}
      <Modal
        isOpen={!!selectedInquiry}
        onClose={() => setSelectedInquiry(null)}
        title={`Inquiry Details - ${selectedInquiry?.id}`}
        subtitle={`Submitted by ${selectedInquiry?.clientName}`}
      >
        {selectedInquiry && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div>
                <span className="text-[11px] font-mono text-slate-500">Client Name</span>
                <p className="text-sm font-bold text-slate-900 font-heading">{selectedInquiry.clientName}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500">Email Address</span>
                <p className="text-sm font-medium text-indigo-700 font-mono">{selectedInquiry.clientEmail}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500">Service Category</span>
                <p className="text-sm font-medium text-slate-900">{selectedInquiry.serviceTitle}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-500">Status</span>
                <div className="mt-0.5">
                  <Badge variant={getStatusBadgeVariant(selectedInquiry.status)} dot>
                    {selectedInquiry.status}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <DollarSign className="w-4 h-4 text-indigo-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-500">Budget Range</div>
                  <div className="text-xs font-bold text-slate-900">{selectedInquiry.budgetRange}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                <div>
                  <div className="text-[10px] font-mono text-slate-500">Timeline</div>
                  <div className="text-xs font-bold text-slate-900">{selectedInquiry.timeline}</div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-700 font-mono">
                Project Requirements & Description
              </span>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 leading-relaxed font-sans">
                {selectedInquiry.projectDetails}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
              <span className="font-mono">Created: {new Date(selectedInquiry.createdAt).toUTCString()}</span>
              <Button variant="secondary" size="sm" onClick={() => setSelectedInquiry(null)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
