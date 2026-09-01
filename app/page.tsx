"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ArticleGallery from "@/components/ArticleGallery";
import PullQuoteBlock from "@/components/PullQuoteBlock";
import MissionSection from "@/components/MissionSection";
import OncologistPanel from "@/components/OncologistPanel";
import RecruitmentCTA from "@/components/RecruitmentCTA";
import Footer from "@/components/Footer";
import GsapAnimations from "@/components/GsapAnimations";
import {
  SignUpModal,
  ArticleReaderModal,
  ApplicationModal,
  TributeModal,
} from "@/components/Modals";
import {
  FIRST_PULL_QUOTE,
  SECOND_PULL_QUOTE,
  Article,
  RecruitmentRole,
} from "@/lib/data";

export default function Home() {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedRole, setSelectedRole] = useState<RecruitmentRole | null>(null);
  const [isTributeOpen, setIsTributeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#0B0F1A] text-[#F5F6F8] selection:bg-teal/30 selection:text-white">
      {/* GSAP ScrollTrigger & Magnetic Animations */}
      <GsapAnimations />

      {/* Low-opacity noise/grain texture overlay across entire page */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Ambient background glow shapes */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-teal/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed top-1/2 right-10 w-96 h-96 bg-pride-purple/5 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* 1. Sticky Navigation Bar */}
      <Navbar onOpenSignUp={() => setIsSignUpOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 2. Hero Section */}
        <HeroSection />

        {/* Subtle Pride Bar Divider */}
        <div className="max-w-7xl mx-auto px-6 opacity-30">
          <div className="pride-bar rounded-full" />
        </div>

        {/* 3. Article Gallery Section */}
        <ArticleGallery />

        {/* 4. Pull-Quote Block #1 (Maya Rodriguez) */}
        <PullQuoteBlock
          quote={FIRST_PULL_QUOTE.quote}
          author={FIRST_PULL_QUOTE.author}
          title={FIRST_PULL_QUOTE.title}
        />

        {/* 5. Mission Section */}
        <MissionSection />

        {/* Subtle Pride Bar Divider */}
        <div className="max-w-7xl mx-auto px-6 opacity-30">
          <div className="pride-bar rounded-full" />
        </div>

        {/* 6. Repeat Quote Block + "Meet the team" Button (Dr. Aisha Patel) */}
        <PullQuoteBlock
          quote={SECOND_PULL_QUOTE.quote}
          author={SECOND_PULL_QUOTE.author}
          title={SECOND_PULL_QUOTE.title}
          buttonText={SECOND_PULL_QUOTE.buttonText}
          buttonHref={SECOND_PULL_QUOTE.buttonHref}
        />

        {/* 7. Oncologist Advisory Panel */}
        <OncologistPanel />

        {/* 8. Recruitment CTA Section */}
        <RecruitmentCTA />
      </main>

      {/* 9. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
      <ArticleReaderModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      <ApplicationModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      <TributeModal isOpen={isTributeOpen} onClose={() => setIsTributeOpen(false)} />
    </div>
  );
}
