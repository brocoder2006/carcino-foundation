"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Article, RecruitmentRole } from "@/lib/data";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-navy-950/80 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-2xl bg-navy-900 border border-white/[0.12] rounded-2xl p-6 sm:p-8 shadow-2xl z-10 my-8 overflow-hidden"
          >
            {/* Top Pride Accent Line */}
            <div className="pride-bar absolute top-0 left-0 right-0" />

            <div className="flex items-center justify-between pb-4 border-b border-white/[0.08] mb-6">
              <h3 className="font-heading font-[600] text-xl text-[#F5F6F8]">{title}</h3>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/[0.06] hover:bg-teal hover:text-navy-950 transition-colors flex items-center justify-center text-muted"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div>{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 1. Sign Up Modal
export function SignUpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for signing up with The Carcino Foundation! Check your inbox soon.");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Join The Carcino Foundation">
      <p className="text-muted text-sm mb-6">
        Sign up to receive free cancer education guides, event invites, and Pride campaign updates directly in your inbox.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Jane Doe"
            className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="jane@example.com"
            className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            I am a...
          </label>
          <select className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none transition-colors">
            <option value="student">Student / Campus Advocate</option>
            <option value="patient">Patient / Family Member</option>
            <option value="healthcare">Healthcare Professional</option>
            <option value="supporter">Community Supporter</option>
          </select>
        </div>

        <button type="submit" className="btn-teal w-full mt-2">
          Subscribe to Newsletter & Updates
        </button>
      </form>
    </BaseModal>
  );
}

// 2. Article Reader Modal
export function ArticleReaderModal({ article, onClose }: { article: Article | null; onClose: () => void }) {
  if (!article) return null;

  return (
    <BaseModal isOpen={!!article} onClose={onClose} title={article.eyebrow}>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
        <h2 className="font-heading font-[700] text-2xl text-[#F5F6F8] leading-tight">
          {article.title}
        </h2>
        <div className="flex items-center gap-3 text-xs text-teal font-heading font-[500]">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        <div className="relative w-full h-56 rounded-xl overflow-hidden my-4 border border-white/[0.08]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="text-muted leading-relaxed space-y-4 text-sm sm:text-base font-body">
          <p className="text-[#F5F6F8] font-[500] italic border-l-2 border-teal pl-4 py-1">
            &quot;{article.excerpt}&quot;
          </p>
          <p>{article.fullText}</p>
          <p>
            Education is the cornerstone of early detection. At The Carcino Foundation, all of our clinical research breakdowns are reviewed by medical advisory panel members before publication to ensure rigorous accuracy and accessible language.
          </p>
        </div>

        <div className="pt-4 border-t border-white/[0.08] flex justify-between items-center">
          <span className="text-xs text-muted">Published for Carcino Pride Campaign 2026</span>
          <button onClick={onClose} className="btn-teal-outline !px-4 !py-2 text-xs">
            Close Article
          </button>
        </div>
      </div>
    </BaseModal>
  );
}

// 3. Recruitment Application Modal
export function ApplicationModal({ role, onClose }: { role: RecruitmentRole | null; onClose: () => void }) {
  if (!role) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Application submitted for the ${role.team} team! We will reach out within 48 hours.`);
    onClose();
  };

  return (
    <BaseModal isOpen={!!role} onClose={onClose} title={`Apply for ${role.team} Team`}>
      <div className="space-y-4">
        <div className="bg-navy-950 p-4 rounded-xl border border-white/[0.06]">
          <h4 className="font-heading font-[600] text-teal text-sm">{role.title}</h4>
          <p className="text-xs text-muted mt-1">{role.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {role.skillsNeeded.map((skill) => (
              <span key={skill} className="text-[0.7rem] bg-teal/10 text-teal px-2 py-0.5 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Alex Johnson"
              className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Email / Student Contact
            </label>
            <input
              type="email"
              required
              placeholder="alex@university.edu"
              className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Brief Statement of Interest
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us why you want to contribute to cancer education and health equity..."
              className="w-full bg-navy-950 border border-white/[0.1] rounded-lg px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none resize-none"
            />
          </div>

          <button type="submit" className="btn-teal w-full">
            Submit Application for {role.team}
          </button>
        </form>
      </div>
    </BaseModal>
  );
}

// 4. Pride Month Tribute Modal
export function TributeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Our Tribute — Pride Month Campaign">
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 font-body text-sm text-muted leading-relaxed">
        <div className="p-4 rounded-xl pride-gradient-overlay border border-white/[0.1]">
          <h4 className="font-heading font-[700] text-lg pride-text-gradient mb-2">
            Honoring LGBTQ+ Cancer Advocates & Caregivers
          </h4>
          <p className="text-xs text-[#F5F6F8]/90">
            Cancer does not discriminate, but access to compassionate, affirming healthcare has historically been unequal.
          </p>
        </div>

        <p>
          The Carcino Foundation dedicates our annual campaign to LGBTQ+ individuals, researchers, and community champions who advocate for equitable screening, trauma-informed clinical settings, and open dialogue.
        </p>

        <h5 className="font-heading font-[600] text-[#F5F6F8] text-sm pt-2">Our Key Campaign Commitments:</h5>
        <ul className="list-disc list-inside space-y-2 text-xs">
          <li>Publishing free, gender-affirming screening guides for all bodily anatomy.</li>
          <li>Fundraising for rural clinic transportation grants for vulnerable patients.</li>
          <li>Mentoring LGBTQ+ high school and university students pursuing oncology research.</li>
        </ul>

        <div className="pt-4 border-t border-white/[0.08] flex justify-end">
          <button onClick={onClose} className="btn-teal !px-6 !py-2 text-xs">
            Back to Campaign
          </button>
        </div>
      </div>
    </BaseModal>
  );
}
