import type { HeroSectionData } from "@/src/types/heroSectionData";

export const registerHeroData: HeroSectionData = {
  badges: ["LAND INTERVIEW IN 1 WEEK", "50 USERS LANDED JOB"],
  headlineMain: "Land 15+ Interview Calls with",
  headlineHighlight: "Flashfire",
  headlineSuffix: "AI Copilot",
  description:
    "We apply to 1200 USA job applications & track everything while you focus on winning the interview.",
  cta: { label: "Get Started →", href: "/register/book-a-free-demo" },
  trustText: "Trusted by 560+ Users",
  universityHeading:
    "Trusted by students and graduates from top global universities.",
  universities: [
    { name: "Harvard University", domain: "harvard.edu" },
    { name: "Stanford University", domain: "stanford.edu" },
    { name: "UC Berkeley", domain: "berkeley.edu" },
    { name: "Carnegie Mellon University", domain: "cmu.edu" },
    { name: "University of Michigan", domain: "umich.edu" },
    { name: "Princeton University", domain: "princeton.edu" },
    { name: "Yale University", domain: "yale.edu" },
    { name: "Columbia University", domain: "columbia.edu" },
    { name: "Cornell University", domain: "cornell.edu" },
    { name: "University of Pennsylvania", domain: "upenn.edu" },
    { name: "Duke University", domain: "duke.edu" },
    { name: "Northwestern University", domain: "northwestern.edu" },
    { name: "University of Chicago", domain: "uchicago.edu" },
    { name: "Caltech", domain: "caltech.edu" },
  ],
};

export const UNIVERSITY_LOGOS: Record<string, string> = {
  "Harvard University": "https://logo.clearbit.com/harvard.edu",
  "Stanford University": "https://logo.clearbit.com/stanford.edu",
  "UC Berkeley": "https://logo.clearbit.com/berkeley.edu",
  "Carnegie Mellon University": "https://logo.clearbit.com/cmu.edu",
  "University of Michigan": "https://logo.clearbit.com/umich.edu",
  "Princeton University": "https://logo.clearbit.com/princeton.edu",
  "Yale University": "https://logo.clearbit.com/yale.edu",
  "Columbia University": "https://logo.clearbit.com/columbia.edu",
  "Cornell University": "https://logo.clearbit.com/cornell.edu",
  "University of Pennsylvania": "https://logo.clearbit.com/upenn.edu",
  "Duke University": "https://logo.clearbit.com/duke.edu",
  "Northwestern University": "https://logo.clearbit.com/northwestern.edu",
  "University of Chicago": "https://logo.clearbit.com/uchicago.edu",
  Caltech: "https://logo.clearbit.com/caltech.edu",
};
