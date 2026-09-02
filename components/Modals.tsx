"use client";

import { useRef } from "react";
import Image from "next/image";
import { Article, RecruitmentRole } from "@/lib/data";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
  CustomEase.create("gsapEase", "M0,0 C0.65,0 0.35,1 1,1");
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalCardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!isOpen || !modalCardRef.current || !overlayRef.current) return;

      const overlay = overlayRef.current;
      const modal = modalCardRef.current;
      const modalElements = modal.querySelectorAll(
        "h2, h3, .modal-stagger-item, img, p, button"
      );

      // Lock body scrolling when modal is open
      document.body.style.overflow = "hidden";

      // GSAP Next-Level 3D Morph & Elastic Entrance Timeline
      const tl = gsap.timeline();

      // 1. Overlay backdrop fade + blur
      tl.fromTo(
        overlay,
        { opacity: 0, backdropFilter: "blur(0px)" },
        {
          opacity: 1,
          backdropFilter: "blur(18px)",
          duration: 0.4,
          ease: "power2.out",
        }
      );

      // 2. Modal 3D Perspective Flip & Elastic Scale Lift Entrance
      tl.fromTo(
        modal,
        {
          opacity: 0,
          scale: 0.75,
          y: 70,
          rotateX: -30,
          rotateY: 10,
          transformPerspective: 1200,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotateX: 0,
          rotateY: 0,
          duration: 0.75,
          ease: "elastic.out(1.05, 0.6)",
          transformPerspective: 1200,
        },
        "-=0.25"
      );

      // 3. Staggered reveal for inner title, image, and text blocks
      if (modalElements.length > 0) {
        tl.fromTo(
          modalElements,
          { opacity: 0, y: 25, rotateX: -15 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            stagger: 0.06,
            duration: 0.5,
            ease: "gsapEase",
          },
          "-=0.4"
        );
      }

      // 4. Interactive 3D Mouse Parallax Tilt on Modal Card
      const handleMouseMove = (e: MouseEvent) => {
        const rect = modal.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(modal, {
          rotateY: (x / rect.width) * 10,
          rotateX: -(y / rect.height) * 10,
          duration: 0.4,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(modal, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      };

      modal.addEventListener("mousemove", handleMouseMove);
      modal.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        document.body.style.overflow = "auto";
        modal.removeEventListener("mousemove", handleMouseMove);
        modal.removeEventListener("mouseleave", handleMouseLeave);
      };
    },
    { dependencies: [isOpen], scope: containerRef }
  );

  const handleClose = () => {
    if (!modalCardRef.current || !overlayRef.current) {
      onClose();
      return;
    }

    // Next-Level GSAP 3D Exit Animation
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "auto";
        onClose();
      },
    });

    tl.to(modalCardRef.current, {
      opacity: 0,
      scale: 0.8,
      y: -50,
      rotateX: 20,
      duration: 0.35,
      ease: "power3.in",
    });

    tl.to(
      overlayRef.current,
      { opacity: 0, backdropFilter: "blur(0px)", duration: 0.3 },
      "-=0.2"
    );
  };

  if (!isOpen) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto perspective-[1200px]"
    >
      {/* Overlay Backdrop */}
      <div
        ref={overlayRef}
        onClick={handleClose}
        className="fixed inset-0 bg-navy-950/85 backdrop-blur-xl"
      />

      {/* 3D Morphing Modal Card */}
      <div
        ref={modalCardRef}
        className="relative w-full max-w-2xl bg-[#0F1322] border border-purple-500/30 rounded-3xl p-6 sm:p-9 shadow-[0_25px_80px_rgba(0,0,0,0.85)] z-10 my-8 overflow-hidden transform-gpu will-change-transform"
      >
        {/* Glowing Top Pride Edge Line */}
        <div className="pride-bar absolute top-0 left-0 right-0 h-1" />

        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <h3 className="modal-stagger-item font-heading font-[700] text-xl sm:text-2xl text-[#F5F6F8] tracking-wide">
            {title}
          </h3>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-teal hover:text-navy-950 transition-colors flex items-center justify-center text-white text-base shadow-lg"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

// 1. Sign Up Modal
export function SignUpModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for joining the campaign! We will keep you updated.");
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Join the Carcino Pride Campaign">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="modal-stagger-item">
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            Full Name
          </label>
          <input
            type="text"
            required
            placeholder="Jordan Lee"
            className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="modal-stagger-item">
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            Email Address
          </label>
          <input
            type="email"
            required
            placeholder="jordan@example.com"
            className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
          />
        </div>

        <div className="modal-stagger-item">
          <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
            Affiliation / Role
          </label>
          <select className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none">
            <option>Student / Youth Volunteer</option>
            <option>Healthcare Professional / Oncologist</option>
            <option>Patient / Advocate</option>
            <option>Community Supporter</option>
          </select>
        </div>

        <button type="submit" className="btn-teal w-full modal-stagger-item mt-2">
          Sign Up for Updates & Guides
        </button>
      </form>
    </BaseModal>
  );
}

// 2. Next-Level GSAP Article Reader Modal
export function ArticleReaderModal({ article, onClose }: { article: Article | null; onClose: () => void }) {
  if (!article) return null;

  return (
    <BaseModal isOpen={!!article} onClose={onClose} title={article.eyebrow}>
      <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
        <h2 className="modal-stagger-item font-heading font-[800] text-2xl sm:text-3xl text-white leading-tight tracking-wide">
          {article.title}
        </h2>
        <div className="modal-stagger-item flex items-center gap-3 text-xs text-teal font-heading font-[600]">
          <span>{article.author}</span>
          <span>•</span>
          <span>{article.readTime}</span>
        </div>

        {/* 3D Zoom Hero Image */}
        <div className="modal-stagger-item relative w-full h-60 sm:h-72 rounded-2xl overflow-hidden my-4 border border-white/15 shadow-2xl group">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-transparent to-transparent opacity-60" />
        </div>

        <div className="text-muted leading-relaxed space-y-4 text-sm sm:text-base font-body">
          <p className="modal-stagger-item text-[#F5F6F8] font-[500] italic border-l-4 border-teal pl-4 py-1.5 bg-teal/10 rounded-r-xl">
            &quot;{article.excerpt}&quot;
          </p>
          <p className="modal-stagger-item text-[#E2E8F0]">{article.fullText}</p>
          <p className="modal-stagger-item text-[#CBD5E1]">
            Education is the cornerstone of early detection. At The Carcino Foundation, all of our clinical research breakdowns are reviewed by medical advisory panel members before publication to ensure rigorous accuracy and accessible language.
          </p>
        </div>

        <div className="modal-stagger-item pt-4 border-t border-white/10 flex justify-between items-center">
          <span className="text-xs text-purple-300/70">Published for Carcino Pride Campaign 2026</span>
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
        <div className="modal-stagger-item bg-navy-950 p-4 rounded-2xl border border-white/[0.08]">
          <h4 className="font-heading font-[600] text-teal text-sm">{role.title}</h4>
          <p className="text-xs text-muted mt-1">{role.description}</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {role.skillsNeeded.map((skill) => (
              <span key={skill} className="text-[0.7rem] bg-teal/10 text-teal px-2.5 py-1 rounded-full">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="modal-stagger-item">
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Alex Johnson"
              className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
            />
          </div>

          <div className="modal-stagger-item">
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Email / Student Contact
            </label>
            <input
              type="email"
              required
              placeholder="alex@university.edu"
              className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none"
            />
          </div>

          <div className="modal-stagger-item">
            <label className="block text-xs font-heading font-[600] uppercase tracking-wider text-muted mb-1">
              Brief Statement of Interest
            </label>
            <textarea
              rows={3}
              required
              placeholder="Tell us why you want to contribute to cancer education and health equity..."
              className="w-full bg-navy-950 border border-white/[0.1] rounded-xl px-4 py-3 text-sm text-[#F5F6F8] focus:border-teal focus:outline-none resize-none"
            />
          </div>

          <button type="submit" className="btn-teal w-full modal-stagger-item">
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
        <div className="modal-stagger-item p-4 rounded-2xl pride-gradient-overlay border border-white/[0.1]">
          <h4 className="font-heading font-[700] text-lg pride-text-gradient mb-2">
            Honoring LGBTQ+ Cancer Advocates & Caregivers
          </h4>
          <p className="text-xs text-[#F5F6F8]/90">
            Cancer does not discriminate, but access to compassionate, affirming healthcare has historically been unequal.
          </p>
        </div>

        <p className="modal-stagger-item">
          The Carcino Foundation dedicates our annual campaign to LGBTQ+ individuals, researchers, and community champions who advocate for equitable screening, trauma-informed clinical settings, and open dialogue.
        </p>

        <h5 className="modal-stagger-item font-heading font-[600] text-[#F5F6F8] text-sm pt-2">Our Key Campaign Commitments:</h5>
      </div>
    </BaseModal>
  );
}
