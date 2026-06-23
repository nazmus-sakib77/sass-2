import siteData from "@/content/site.json";

export type Service = {
  title: string;
  icon: string;
  summary: string;
  points: string[];
};

export type ProcessStep = { step: string; title: string; body: string };
export type Stat = { num: string; label: string };
export type NavItem = { label: string; href: string };

export type PricingTier = {
  name: string;
  price: string;
  cadence: string;
  summary: string;
  features: string[];
  featured: boolean;
};

export type Faq = { q: string; a: string };

export type SiteContent = {
  name: string;
  tagline: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  social: { twitter: string; linkedin: string; github: string };
  nav: NavItem[];
  services: Service[];
  process: ProcessStep[];
  stats: Stat[];
  pricing: PricingTier[];
  faqs: Faq[];
};

export const site = siteData as SiteContent;

export const SITE_URL =
  process.env.AUTH_URL?.replace(/\/$/, "") ?? "http://localhost:3000";
