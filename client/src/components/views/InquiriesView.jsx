import React, { useState } from 'react';
import { Search, Eye, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import { CardSkeleton } from '../ui/Skeleton';

export default function InquiriesView({
  inquiries = [],
  loadingInquiries = false,
  fetchInquiries
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

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
    <div className="max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-24 space-y-12 page-transition">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#E7E7E7] pb-6">
        <div>
          <span className="eyebrow-minimal block">PORTAL</span>
          <h1 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#171717] font-heading mt-1">
            Client Inquiries & Telemetry
          </h1>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={RefreshCw}
          onClick={fetchInquiries}
          loading={loadingInquiries}
        >
          Refresh Data
        </Button>
      </div>

      {/* Filter and Search */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search by name, email, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
        </div>

        <div className="flex gap-1.5 text-xs">
          {['ALL', 'Pending Review', 'In Review', 'Contacted'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-[4px] font-mono transition-colors cursor-pointer ${
                statusFilter === status
                  ? 'bg-[#171717] text-white'
                  : 'bg-[#F7F6F2] text-[#777777] hover:text-[#171717] border border-[#E7E7E7]'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Inquiries List */}
      {loadingInquiries ? (
        <div className="space-y-4">
          <CardSkeleton />
          <CardSkeleton />
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="p-12 border border-[#E7E7E7] rounded-lg text-center space-y-2 text-[#777777]">
          <p className="text-sm">No inquiries match your criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredInquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className="mono-card p-5 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-medium text-[#171717]">
                    {inquiry.id}
                  </span>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#F7F6F2] text-[#777777] border border-[#E7E7E7]">
                    {inquiry.status}
                  </span>
                </div>
                <div className="text-sm font-medium text-[#171717]">
                  {inquiry.clientName}
                  <span className="font-normal text-[#777777] ml-2 text-xs font-mono">
                    {inquiry.clientEmail}
                  </span>
                </div>
                <div className="text-xs text-[#777777]">
                  {inquiry.serviceTitle} • {inquiry.budgetRange}
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInquiry(inquiry)}
                className="text-xs text-[#171717] font-medium hover:underline flex items-center gap-1 cursor-pointer shrink-0"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Details</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Details */}
      {selectedInquiry && (
        <Modal
          isOpen={!!selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry ${selectedInquiry.id}`}
          subtitle={`Submitted on ${new Date(selectedInquiry.createdAt).toLocaleDateString()}`}
        >
          <div className="space-y-4 text-xs sm:text-sm text-[#777777]">
            <div className="p-4 bg-[#F7F6F2] border border-[#E7E7E7] rounded-md grid grid-cols-2 gap-4">
              <div>
                <span className="font-mono text-[10px] uppercase text-[#777777] block">Client</span>
                <strong className="text-[#171717]">{selectedInquiry.clientName}</strong>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-[#777777] block">Email</span>
                <span className="text-[#171717] font-mono">{selectedInquiry.clientEmail}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-[#777777] block">Service</span>
                <span className="text-[#171717]">{selectedInquiry.serviceTitle}</span>
              </div>
              <div>
                <span className="font-mono text-[10px] uppercase text-[#777777] block">Budget</span>
                <span className="text-[#171717] font-mono">{selectedInquiry.budgetRange}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="font-mono text-xs uppercase text-[#171717] block">Project Details</span>
              <div className="p-3 bg-white border border-[#E7E7E7] rounded-md font-mono text-xs leading-relaxed whitespace-pre-wrap text-[#171717]">
                {selectedInquiry.projectDetails}
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSelectedInquiry(null)}
              >
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
