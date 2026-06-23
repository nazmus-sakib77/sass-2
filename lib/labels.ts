import type { LeadStatus, ProjectStatus } from "@prisma/client";

export const STATUS_LABEL: Record<ProjectStatus, string> = {
  DISCOVERY: "Discovery",
  DESIGN: "Design",
  BUILD: "Build",
  REVIEW: "Review",
  LAUNCHED: "Launched",
};

export const PROJECT_STATUSES: ProjectStatus[] = [
  "DISCOVERY",
  "DESIGN",
  "BUILD",
  "REVIEW",
  "LAUNCHED",
];

export const LEAD_STATUS_LABEL: Record<LeadStatus, string> = {
  NEW: "New",
  CONTACTED: "Contacted",
  QUOTED: "Quoted",
  WON: "Won",
  LOST: "Lost",
};

export const LEAD_STATUSES: LeadStatus[] = [
  "NEW",
  "CONTACTED",
  "QUOTED",
  "WON",
  "LOST",
];
