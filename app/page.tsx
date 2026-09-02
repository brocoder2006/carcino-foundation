"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import KineticMarquee from "@/components/KineticMarquee";
import CustomCursor from "@/components/CustomCursor";
import PageLoader from "@/components/PageLoader";
import ScrollProgressBar from "@/components/ScrollProgressBar";
import AwwwardsFloatingWidget from "@/components/AwwwardsFloatingWidget";
import DuplicateTextRevealSection from "@/components/DuplicateTextRevealSection";
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
    <div className="relative min-h-screen bg-[#0F0A1C] text-[#F5F6F8] selection:bg-purple-500/30 selection:text-white">
      {/* Awwwards GSAP Preloader Curtain Entrance */}
      <PageLoader />

      {/* Dynamic Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Gen Z Interactive Spring Trailing Custom Cursor */}
      <CustomCursor />

      {/* Floating Awwwards Quick Navigation & Status Widget */}
      <AwwwardsFloatingWidget />

      {/* GSAP ScrollTrigger, SplitText, ScrambleText & 3D Tilt Animations */}
      <GsapAnimations />

      {/* Low-opacity noise/grain texture overlay across entire page */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Ambient background glow shapes */}
      <div className="fixed top-20 left-10 w-72 h-72 sm:w-96 sm:h-96 bg-purple-600/10 rounded-full blur-[130px] pointer-events-none z-0 overflow-hidden" />
      <div className="fixed top-1/2 right-0 w-72 h-72 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-[150px] pointer-events-none z-0 overflow-hidden" />

      {/* 1. Sticky Navigation Bar with Observer & ScrollTrigger */}
      <Navbar onOpenSignUp={() => setIsSignUpOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* 2. Hero Section with ScrambleText & Floating Parallax Shapes */}
        <HeroSection />

        {/* High-Velocity Kinetic Marquee Ticker */}
        <KineticMarquee />

        {/* 3. Duplicate-Layer Text Reveal (Scroll-Pinned) */}
        <DuplicateTextRevealSection />

        {/* High-Velocity Reverse Kinetic Marquee Ticker */}
        <KineticMarquee
          reverse
          items={[
            "🎗️ THE CARCINO FOUNDATION",
            "✨ STUDENT-LED CANCER RESEARCH",
            "🎗️ CANCER EDUCATION FOR ALL",
            "⚡ HEALTH EQUITY & PRIDE",
            "🎓 STUDENT ADVOCACY",
          ]}
        />

        {/* 4. Showcase Article Gallery Section */}
        <ArticleGallery />

        {/* 5. Recruitment / Contribution CTA Section */}
        <RecruitmentCTA />

        {/* 6. Pull-Quote Block #1 (Maya Rodriguez) */}
        <PullQuoteBlock
          quote={FIRST_PULL_QUOTE.quote}
          author={FIRST_PULL_QUOTE.author}
          title={FIRST_PULL_QUOTE.title}
        />

        {/* 7. Mission Section */}
        <MissionSection />

        {/* Subtle Pride Bar Divider */}
        <div className="max-w-7xl mx-auto px-6 opacity-30">
          <div className="pride-bar rounded-full" />
        </div>

        {/* 8. Repeat Quote Block + "Meet the team" Button (Dr. Aisha Patel) */}
        <PullQuoteBlock
          quote={SECOND_PULL_QUOTE.quote}
          author={SECOND_PULL_QUOTE.author}
          title={SECOND_PULL_QUOTE.title}
          buttonText={SECOND_PULL_QUOTE.buttonText}
          buttonHref={SECOND_PULL_QUOTE.buttonHref}
        />

        {/* 9. Oncologist Advisory Panel */}
        <OncologistPanel />

        {/* 10. Recruitment CTA Section */}
        <RecruitmentCTA />
      </main>

      {/* 11. Footer */}
      <Footer />

      {/* Interactive Modals */}
      <SignUpModal isOpen={isSignUpOpen} onClose={() => setIsSignUpOpen(false)} />
      <ArticleReaderModal article={selectedArticle} onClose={() => setSelectedArticle(null)} />
      <ApplicationModal role={selectedRole} onClose={() => setSelectedRole(null)} />
      <TributeModal isOpen={isTributeOpen} onClose={() => setIsTributeOpen(false)} />
    </div>
  );
}
