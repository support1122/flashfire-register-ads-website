export interface HeroSectionData {
  badges: string[];
  headlineLine1: string;
  headlineLine2: string;
  headlineHighlight: string;
  headlineSuffix: string;
  description: string;
  cta: { label: string; href: string };
  trustText: string;
  universityHeading: string;
  universities: { name: string; domain: string }[];
}
