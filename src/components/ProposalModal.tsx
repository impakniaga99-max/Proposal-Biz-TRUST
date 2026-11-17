import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  code: string;
  title: string;
  rootCauseLabel: string;
  detail: string;
  interventionLabel: string;
  intervention: string;
  closeLabel: string;
}

export function ProposalModal({
  isOpen,
  onClose,
  code,
  title,
  rootCauseLabel,
  detail,
  interventionLabel,
  intervention,
  closeLabel,
}: ProposalModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#1C1917]/65 backdrop-blur-xs p-4 no-print"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="proposal-modal-title"
    >
      <div
        className="bg-[#FBF9F5] border border-[#D6CEBE] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-[#E2D9C5] pb-4">
          <div className="space-y-1">
            <span className="font-mono-num text-xs font-medium tracking-widest uppercase text-[#0F5149]">
              {code}
            </span>
            <h3 id="proposal-modal-title" className="font-display text-xl sm:text-2xl font-semibold text-[#1C1917]">
              {title}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="w-10 h-10 rounded-lg border border-[#E2D9C5] flex items-center justify-center text-[#57534E] hover:text-[#1C1917] hover:bg-[#F4EFE6] transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-[#0F5149]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-4 text-sm leading-relaxed">
          <div className="space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#57534E]">
              {rootCauseLabel}
            </p>
            <p className="text-[#292524]">{detail}</p>
          </div>

          <div className="p-4 rounded-xl bg-[#F4EFE6] border border-[#E2D9C5] space-y-1.5">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#0F5149]">
              {interventionLabel}
            </p>
            <p className="text-[#1C1917] font-medium">{intervention}</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#0F5149] text-white text-xs font-semibold rounded-lg hover:bg-[#0B3D37] transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0F5149]"
          >
            {closeLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
