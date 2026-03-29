export type FacultyKey =
  | "stem-it"
  | "business-economics"
  | "medicine-health"
  | "law-social-sciences"
  | "arts-humanities"
  | "education"
  | "interdisciplinary";

export type FacultyTheme = {
  label: string;
  subtitle: string;
  // CSS background string for the "universe" frame
  background: string;
  // accent color (used for little highlights)
  accent: string;
};

export const FACULTY_THEMES: Record<FacultyKey, FacultyTheme> = {
  "stem-it": {
    label: "STEM & IT",
    subtitle: "CS, software, data/AI, cybersecurity, networks, cloud.",
    accent: "#22D3EE",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(34,211,238,0.22), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(163,230,53,0.18), transparent 55%),
      radial-gradient(900px circle at 50% 95%, rgba(168,85,247,0.14), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.75), rgba(0,0,0,0.94))
    `.trim(),
  },

  "business-economics": {
    label: "Business & Economics",
    subtitle: "Finance, accounting, marketing, strategy, entrepreneurship.",
    accent: "#F59E0B",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(245,158,11,0.20), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(34,211,238,0.14), transparent 55%),
      radial-gradient(900px circle at 55% 92%, rgba(244,114,182,0.10), transparent 60%),
      linear-gradient(180deg, rgba(10,10,15,0.80), rgba(0,0,0,0.94))
    `.trim(),
  },

  "medicine-health": {
    label: "Medicine & Health",
    subtitle: "Clinical reasoning, nursing, anatomy, public health, pharma.",
    accent: "#34D399",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(52,211,153,0.20), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(59,130,246,0.16), transparent 55%),
      radial-gradient(900px circle at 50% 95%, rgba(244,114,182,0.10), transparent 60%),
      linear-gradient(180deg, rgba(3,7,18,0.78), rgba(0,0,0,0.94))
    `.trim(),
  },

  "law-social-sciences": {
    label: "Law & Social Sciences",
    subtitle: "Law fundamentals, policy, psychology, sociology, research.",
    accent: "#A855F7",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(168,85,247,0.22), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(244,114,182,0.14), transparent 55%),
      radial-gradient(900px circle at 52% 92%, rgba(34,211,238,0.10), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.78), rgba(0,0,0,0.94))
    `.trim(),
  },

  "arts-humanities": {
    label: "Arts & Humanities",
    subtitle: "History, literature, languages, philosophy, writing, culture.",
    accent: "#F472B6",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(244,114,182,0.20), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(99,102,241,0.18), transparent 55%),
      radial-gradient(900px circle at 50% 95%, rgba(245,158,11,0.10), transparent 60%),
      linear-gradient(180deg, rgba(10,10,15,0.82), rgba(0,0,0,0.94))
    `.trim(),
  },

  education: {
    label: "Education",
    subtitle: "Pedagogy, lesson planning, learning science, assessment.",
    accent: "#60A5FA",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(96,165,250,0.20), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(52,211,153,0.14), transparent 55%),
      radial-gradient(900px circle at 50% 95%, rgba(168,85,247,0.10), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.78), rgba(0,0,0,0.94))
    `.trim(),
  },

  interdisciplinary: {
    label: "Custom / Interdisciplinary",
    subtitle: "Mix faculties and build a tailored learning track.",
    accent: "#A3E635",
    background: `
      radial-gradient(1100px circle at 18% 20%, rgba(163,230,53,0.20), transparent 55%),
      radial-gradient(1000px circle at 82% 18%, rgba(34,211,238,0.18), transparent 55%),
      radial-gradient(900px circle at 50% 95%, rgba(244,114,182,0.10), transparent 60%),
      linear-gradient(180deg, rgba(2,6,23,0.78), rgba(0,0,0,0.94))
    `.trim(),
  },
};

export function isFacultyKey(x: string): x is FacultyKey {
  return x in FACULTY_THEMES;
}
