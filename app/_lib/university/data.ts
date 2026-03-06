export type FacultyKey =
  | "it"
  | "business"
  | "law"
  | "health"
  | "engineering"
  | "education"
  | "arts"
  | "interdisciplinary";

export type TrackKey =
  | "cs"
  | "it"
  | "software"
  | "data"
  | "ai"
  | "cybersecurity"
  | "math"
  | "finance"
  | "marketing"
  | "management"
  | "accounting"
  | "law"
  | "politics"
  | "nursing"
  | "medicine"
  | "public-health"
  | "mechanical"
  | "electrical"
  | "civil"
  | "teacher-ed"
  | "design"
  | "media"
  | "psychology"
  | "philosophy";

export type UniRole = "teacher" | "tutor" | "assistant";

export type UniTrack = {
  key: TrackKey;
  title: string;
  subtitle: string;
  tags: string[];
};

export type UniFaculty = {
  key: FacultyKey;
  title: string;
  subtitle: string;
  areas: string[];     // left-side “areas” like Algorithms/Systems/Data…
  tracks: UniTrack[];  // right-side “fields” like CS/AI/Cybersecurity…
};

export const FACULTIES: UniFaculty[] = [
  {
    key: "it",
    title: "IT & Computer Science",
    subtitle: "Computing, software, systems, data, and security — built for serious learners.",
    areas: ["Algorithms", "Systems", "Mathematics", "Data", "Engineering"],
    tracks: [
      { key: "cs", title: "Computer Science", subtitle: "Theory + practice of computation.", tags: ["Algorithms", "Complexity", "Systems"] },
      { key: "it", title: "Information Technology", subtitle: "Infrastructure, platforms, and operations.", tags: ["Cloud", "Networks", "Ops"] },
      { key: "software", title: "Software Engineering", subtitle: "Building robust products and systems.", tags: ["Architecture", "Testing", "DevOps"] },
      { key: "data", title: "Data Science", subtitle: "Statistics, analysis, and decision intelligence.", tags: ["ML", "Stats", "Pipelines"] },
      { key: "ai", title: "Artificial Intelligence", subtitle: "Models, reasoning, and applied AI.", tags: ["LLMs", "Agents", "ML"] },
      { key: "cybersecurity", title: "Cybersecurity", subtitle: "Defense, offense, and secure design.", tags: ["Threats", "Security", "Risk"] },
      { key: "math", title: "Mathematics", subtitle: "Foundations for CS, AI, and engineering.", tags: ["Linear Algebra", "Calculus", "Discrete Math"] },
    ],
  },
  {
    key: "business",
    title: "Business & Management",
    subtitle: "Professional decision-making, strategy, markets, and execution.",
    areas: ["Strategy", "Markets", "Operations", "Leadership", "Analysis"],
    tracks: [
      { key: "finance", title: "Finance", subtitle: "Capital, valuation, and financial analysis.", tags: ["Valuation", "Accounting", "Risk"] },
      { key: "marketing", title: "Marketing", subtitle: "Brand, growth, research, and positioning.", tags: ["Research", "Growth", "Brand"] },
      { key: "management", title: "Management", subtitle: "Teams, execution, and organizational design.", tags: ["Leadership", "Ops", "Systems"] },
      { key: "accounting", title: "Accounting", subtitle: "Reporting, auditing, and financial truth.", tags: ["Reporting", "Auditing", "Controls"] },
    ],
  },
  {
    key: "law",
    title: "Law & Politics",
    subtitle: "Legal reasoning, governance, and public institutions.",
    areas: ["Law", "Policy", "Governance", "Ethics", "Institutions"],
    tracks: [
      { key: "law", title: "Law", subtitle: "Contracts, rights, liability, and case reasoning.", tags: ["Contracts", "Casework", "Ethics"] },
      { key: "politics", title: "Politics & Policy", subtitle: "Institutions, strategy, and policy design.", tags: ["Policy", "Governance", "Debate"] },
    ],
  },
  {
    key: "health",
    title: "Health Sciences",
    subtitle: "Clinical learning, public health, and patient-centered knowledge.",
    areas: ["Clinical", "Research", "Public Health", "Practice", "Ethics"],
    tracks: [
      { key: "nursing", title: "Nursing", subtitle: "Patient care, practice, and clinical excellence.", tags: ["Clinical", "Care", "Practice"] },
      { key: "medicine", title: "Medicine", subtitle: "Core medical sciences and patient reasoning.", tags: ["Clinical", "Diagnosis", "Systems"] },
      { key: "public-health", title: "Public Health", subtitle: "Population health and prevention systems.", tags: ["Epidemiology", "Policy", "Prevention"] },
    ],
  },
  {
    key: "engineering",
    title: "Engineering",
    subtitle: "Design, systems thinking, and real-world engineering practice.",
    areas: ["Design", "Systems", "Mechanics", "Electrics", "Materials"],
    tracks: [
      { key: "mechanical", title: "Mechanical Engineering", subtitle: "Mechanics, design, and manufacturing.", tags: ["Design", "Thermo", "CAD"] },
      { key: "electrical", title: "Electrical Engineering", subtitle: "Circuits, signals, and power.", tags: ["Circuits", "Signals", "Power"] },
      { key: "civil", title: "Civil Engineering", subtitle: "Structures, cities, and infrastructure.", tags: ["Structures", "Infrastructure", "Planning"] },
    ],
  },
  {
    key: "education",
    title: "Education",
    subtitle: "Teaching science, pedagogy, and learning design.",
    areas: ["Pedagogy", "Assessment", "Classroom", "Learning Design", "Research"],
    tracks: [
      { key: "teacher-ed", title: "Teacher Education", subtitle: "Professional teaching methods and curriculum.", tags: ["Curriculum", "Assessment", "Practice"] },
    ],
  },
  {
    key: "arts",
    title: "Creative Arts",
    subtitle: "Craft, design, media, and creative production with professional standards.",
    areas: ["Design", "Media", "Production", "Critique", "Portfolio"],
    tracks: [
      { key: "design", title: "Design", subtitle: "Visual systems, product design, and interaction.", tags: ["UX", "Systems", "Portfolio"] },
      { key: "media", title: "Media & Production", subtitle: "Storytelling and production pipelines.", tags: ["Video", "Audio", "Narrative"] },
    ],
  },
  {
    key: "interdisciplinary",
    title: "Interdisciplinary Studies",
    subtitle: "Cross-disciplinary thinking for modern problems.",
    areas: ["Systems", "Human Behavior", "Reasoning", "Ethics", "Research"],
    tracks: [
      { key: "psychology", title: "Psychology", subtitle: "Mind, behavior, and research methods.", tags: ["Behavior", "Methods", "Cognition"] },
      { key: "philosophy", title: "Philosophy", subtitle: "Reasoning, ethics, and argument quality.", tags: ["Logic", "Ethics", "Debate"] },
    ],
  },
];

export function getFaculty(key: string) {
  return FACULTIES.find((f) => f.key === key) ?? null;
}

export function getTrack(facultyKey: string, trackKey: string) {
  const f = getFaculty(facultyKey);
  if (!f) return null;
  return f.tracks.find((t) => t.key === trackKey) ?? null;
}

export const ROLE_LABELS: Record<UniRole, { title: string; subtitle: string; responsibilities: string[] }> = {
  teacher: {
    title: "Teacher",
    subtitle: "Teaches the full course material like a professional educator.",
    responsibilities: [
      "Explain concepts step-by-step with structure",
      "Build complete lesson plans from provided materials",
      "Teach fundamentals → advanced",
      "Use examples and practice questions",
    ],
  },
  tutor: {
    title: "Tutor",
    subtitle: "Helps with assignments, exam preparation, and targeted understanding.",
    responsibilities: [
      "Solve problems with the student (guided)",
      "Review assignments and improve reasoning",
      "Prepare exam-style drills and feedback",
      "Spot weaknesses and fix them",
    ],
  },
  assistant: {
    title: "Assistant",
    subtitle: "Fast helper for study workflows: summaries, notes, planning, and quick support.",
    responsibilities: [
      "Summarize notes/material quickly",
      "Create study plans and checklists",
      "Generate flashcards and quizzes",
      "Help with formatting and clarity",
    ],
  },
};
