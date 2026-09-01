export interface Article {
  id: number;
  eyebrow: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
  excerpt: string;
  fullText: string;
}

export interface MissionCard {
  id: string;
  icon: string;
  title: string;
  description: string;
  stats?: string;
}

export interface Oncologist {
  id: number;
  name: string;
  role: string;
  institution: string;
  image: string;
  bio: string;
  specialty: string;
}

export interface RecruitmentRole {
  team: string;
  title: string;
  description: string;
  skillsNeeded: string[];
  commitment: string;
}

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#mission" },
  { label: "Articles", href: "#articles" },
  { label: "Blogs", href: "#blogs" },
  { label: "Survivors", href: "#oncologists" },
] as const;

export const LANGUAGES = [
  { code: "EN", label: "English" },
  { code: "ES", label: "Español" },
  { code: "FR", label: "Français" },
] as const;

export const HERO_DATA = {
  eyebrow: "PRIDE MONTH CAMPAIGN · STUDENT-RUN HEALTH EQUITY",
  headline: "Breaking Down Cancer for Everyone, With Pride.",
  subtext: "The Carcino Foundation is a student-led organization providing peer-reviewed, plain-language cancer research and health literacy tools to underserved & LGBTQ+ communities nationwide.",
  primaryCTA: "Read Articles",
  secondaryCTA: "Our Mission",
  heroImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80",
};

export const ARTICLES: Article[] = [
  {
    id: 1,
    eyebrow: "research article",
    title: "GERM CELL TUMOR",
    author: "by Siran Pramanick",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=800&q=80",
    excerpt: "Understanding germ cell tumor development, early screening indicators, and treatment pathways.",
    fullText: "Germ cell tumors originate from reproductive cells and most commonly develop in the ovaries or testicles, though they can occur elsewhere in the body. Our writing team breaks down cellular pathology, genetic markers, and contemporary clinical guidelines in plain language for patients and advocates.",
  },
  {
    id: 2,
    eyebrow: "research article",
    title: "EWING SARCOMA",
    author: "by Jiya Haldar",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    excerpt: "A plain-language guide on Ewing Sarcoma diagnosis, targeted therapies, and adolescent oncology support.",
    fullText: "Ewing Sarcoma is a rare type of cancer that forms in bone or soft tissue, primarily affecting children and young adults. This guide translates complex oncological staging and multi-agent chemotherapy regimens into accessible knowledge.",
  },
  {
    id: 3,
    eyebrow: "research article",
    title: "LIVER CANCER",
    author: "by Soushree Chakraborty",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    excerpt: "Primary hepatic malignancies, risk factors, early detection screening, and surgical interventions.",
    fullText: "Hepatocellular carcinoma (HCC) is the most common form of primary liver cancer. Early detection through regular ultrasound screening and biomarker monitoring dramatically improves therapeutic outcomes.",
  },
  {
    id: 4,
    eyebrow: "research article",
    title: "CHILDHOOD CANCER",
    author: "by Siran Pramanick",
    readTime: "9 min read",
    image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80",
    excerpt: "Comprehensive overview of pediatric oncology, leukemias, brain tumors, and survivorship resources.",
    fullText: "Pediatric cancers differ significantly from adult malignancies in pathology and treatment response. Our student research team synthesizes pediatric clinical trial developments and family support networks.",
  },
  {
    id: 5,
    eyebrow: "research article",
    title: "GYNECOLOGIC CANCER",
    author: "by Siran Pramanick",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80",
    excerpt: "Ovarian, cervical, and uterine cancer screening standards, HPV vaccines, and reproductive health equity.",
    fullText: "Gynecologic cancers encompass any cancer that begins in a woman's reproductive organs. We examine prevention strategies, inclusive pap testing guidelines, and early warning sign education.",
  },
  {
    id: 6,
    eyebrow: "research article",
    title: "ANAL CANCER",
    author: "by Suditi Saha",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
    excerpt: "Breaking stigma around anal cancer, HPV prevention, high-resolution anoscopy, and patient advocacy.",
    fullText: "Anal cancer remains one of the most stigmatized oncology diagnoses. Our Pride campaign highlights affirmative healthcare environments, HPV vaccination awareness, and routine screening access for all genders and sexual orientations.",
  },
];

export const FIRST_PULL_QUOTE = {
  quote: "Cancer education should never be a privilege. It is a fundamental right that we are committed to delivering — with pride, with equity, and with urgency.",
  author: "MAYA RODRIGUEZ",
  title: "FOUNDER & EXECUTIVE DIRECTOR, THE CARCINO FOUNDATION",
};

export const MISSION_CARDS: MissionCard[] = [
  {
    id: "rural-care",
    icon: "🌾",
    title: "Rural Care",
    description: "Bringing cancer education, diagnostic navigation, and screening resources directly to rural and isolated communities.",
    stats: "18+ Rural County Clinics",
  },
  {
    id: "healthcare-equity",
    icon: "⚖️",
    title: "Healthcare Equity",
    description: "Advocating for equal access to preventative screenings and culturally affirming medical care regardless of income or identity.",
    stats: "100% Free Resources",
  },
  {
    id: "run-by-students",
    icon: "🎓",
    title: "Run by Students",
    description: "Driven by university students combining academic rigor with passionate youth advocacy to transform public health literacy.",
    stats: "250+ Student Volunteers",
  },
  {
    id: "early-detection",
    icon: "🔬",
    title: "Early Detection",
    description: "Empowering everyday individuals with clear, plain-language warning signs and screening guidelines that save lives.",
    stats: "45,000+ Guides Distributed",
  },
];

export const SECOND_PULL_QUOTE = {
  quote: "Every community deserves to understand cancer prevention in a language and context that speaks directly to their lived experience. That is the heart of our mission.",
  author: "DR. AISHA PATEL",
  title: "HEAD OF RESEARCH & COMMUNITY OUTREACH",
  buttonText: "Meet the Advisory Panel",
  buttonHref: "#oncologists",
};

export const ONCOLOGISTS: Oncologist[] = [
  {
    id: 1,
    name: "Dr. Rachel Mitchell, MD, PhD",
    role: "Director of Community Oncology",
    institution: "Dana-Farber Cancer Institute & Harvard Medical School Advisor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
    bio: "20+ years specializing in health equity research, community-directed mammography screenings, and clinical trial inclusivity.",
    specialty: "Breast Cancer & Health Equity",
  },
  {
    id: 2,
    name: "Dr. David Osei, MD",
    role: "Lead Advisory Panelist, Health Disparities",
    institution: "Johns Hopkins Bloomberg School of Public Health",
    image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80",
    bio: "Published oncologist dedicated to breaking down systemic barriers in early detection and improving patient doctor communication.",
    specialty: "Colorectal & Gastrointestinal Oncology",
  },
];

export const RECRUITMENT_ROLES: RecruitmentRole[] = [
  {
    team: "Writing",
    title: "Research & Medical Science Writing",
    description: "Translate clinical research papers into engaging, plain-language articles, patient guides, and social education carousels.",
    skillsNeeded: ["Scientific Literacy", "Editing", "Empathy & Communication"],
    commitment: "3-5 hrs / week",
  },
  {
    team: "Tech",
    title: "Web Engineering & Product",
    description: "Develop accessible web tools, interactive health screening calculators, and maintain our global digital learning platform.",
    skillsNeeded: ["React / Next.js", "TypeScript", "UI/UX Accessibility"],
    commitment: "4-6 hrs / week",
  },
  {
    team: "Design",
    title: "Brand, Motion & Graphic Design",
    description: "Shape the visual identity of our Pride Month campaign, educational infographics, and campaign collateral for distribution.",
    skillsNeeded: ["Figma", "Illustrator / After Effects", "Visual Storytelling"],
    commitment: "3-5 hrs / week",
  },
  {
    team: "Marketing",
    title: "Digital Growth & Community Outreach",
    description: "Expand our reach across social platforms, build university campus chapters, and coordinate partner events.",
    skillsNeeded: ["Social Strategy", "Campus Engagement", "Event Coordination"],
    commitment: "3-5 hrs / week",
  },
];

export const FOOTER_DATA = {
  orgName: "The Carcino Foundation",
  tagline: "Cancer education for everyone, with pride.",
  email: "hello@carcino.foundation",
  phone: "+1 (555) 234-5678",
  address: "Campus Innovation Hub · Boston, MA 02115",
  socials: [
    { platform: "Instagram", icon: "IG", href: "https://instagram.com" },
    { platform: "X / Twitter", icon: "X", href: "https://x.com" },
    { platform: "YouTube", icon: "YT", href: "https://youtube.com" },
    { platform: "LinkedIn", icon: "IN", href: "https://linkedin.com" },
  ],
  legal: [
    { label: "Privacy Policy", href: "#privacy" },
    { label: "Terms of Service", href: "#terms" },
    { label: "Cookie Preferences", href: "#cookies" },
    { label: "501(c)(3) Tax Status", href: "#tax" },
  ],
};
