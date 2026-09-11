import React from 'react';
import { Award, Shield, CheckCircle2, Download, X, Printer } from 'lucide-react';
import { Course, User } from '../types';

interface CertificateModalProps {
  isOpen: boolean;
  course: Course;
  user: User;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  isOpen,
  course,
  user,
  onClose,
}) => {
  if (!isOpen) return null;

  const certId = `RHM-${course.id.toUpperCase().replace('-', '')}-${user.username.toUpperCase()}-2026`;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Card */}
        <div 
          id="printable-certificate"
          className="bg-slate-950 border-4 border-double border-emerald-500/50 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden shadow-inner"
        >
          {/* Subtle watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Shield className="w-96 h-96 text-emerald-400" />
          </div>

          {/* Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <Shield className="w-7 h-7" />
            </div>
            <div className="text-left">
              <div className="text-xl font-extrabold font-mono text-white tracking-widest">
                RAJHACKME <span className="text-emerald-400">ACADEMY</span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 tracking-wider">
                CYBERSECURITY CERTIFICATION AUTHORITY
              </div>
            </div>
          </div>

          <div className="text-xs font-mono text-emerald-400 uppercase tracking-widest mb-3">
            CERTIFICATE OF COMPLETION
          </div>

          <p className="text-xs font-mono text-slate-400 mb-2">
            This operational credential confirms that
          </p>

          {/* Student Name */}
          <h2 className="text-2xl sm:text-3xl font-extrabold font-mono text-white underline decoration-emerald-500/60 underline-offset-8 mb-4">
            {user.fullName || user.username}
          </h2>

          <p className="text-xs font-mono text-slate-300 max-w-lg mx-auto mb-6">
            has successfully completed all required modules, verified labs, and capstone assessments for
          </p>

          {/* Course Name */}
          <div className="inline-block px-6 py-2 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 font-mono text-lg font-bold mb-8">
            {course.title}
          </div>

          {/* Verification details */}
          <div className="grid grid-cols-2 gap-4 border-t border-slate-800/80 pt-6 text-xs font-mono text-slate-400 max-w-md mx-auto">
            <div>
              <span className="text-slate-500 block text-[10px]">ISSUED DATE</span>
              <span className="text-slate-200">{today}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">VERIFICATION ID</span>
              <span className="text-emerald-400 font-mono font-bold text-[11px]">{certId}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <button
            onClick={handlePrint}
            className="px-6 py-2.5 rounded-xl font-bold font-mono text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] text-xs flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            PRINT / SAVE PDF
          </button>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl font-medium font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 text-xs transition-colors"
          >
            CLOSE
          </button>
        </div>
      </div>
    </div>
  );
};
