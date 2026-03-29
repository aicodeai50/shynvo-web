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
  | "it-core"
  | "software"
  | "data"
  | "ai"
  | "cybersecurity"
  | "math"
  | "finance"
  | "marketing"
  | "management"
  | "accounting"
  | "law-core"
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
  areas: string[];
  tracks: UniTrack[];
};

export const FACULTIES: UniFaculty[] = [
  {
    key: "it",
    title: "IT & Computer Science",
    subtitle: "Computing, software, systems, data, and security — built for serious learners.",
    areas: ["Algorithms", "Systems", "Mathematics", "Data", "Engineering"],
    tracks: [
      { key: "cs", title: "Computer Science", subtitle: "Theory and practice of computation.", tags: ["Algorithms", "Programming", "Systems"] },
      { key: "it-core", title: "Information Technology", subtitle: "Infrastructure, platforms, and technical operations.", tags: ["Networks", "Cloud", "Support"] },
      { key: "software", title: "Software Engineering", subtitle: "Designing and building reliable software systems.", tags: ["Architecture", "Testing", "DevOps"] },
      { key: "data", title: "Data Science", subtitle: "Analysis, statistics, and intelligent decision systems.", tags: ["Statistics", "ML", "Pipelines"] },
      { key: "ai", title: "Artificial Intelligence", subtitle: "Models, reasoning, and applied intelligent systems.", tags: ["LLMs", "Agents", "ML"] },
      { key: "cybersecurity", title: "Cybersecurity", subtitle: "Defense, secure systems, and threat awareness.", tags: ["Security", "Risk", "Threats"] },
      { key: "math", title: "Mathematics for Computing", subtitle: "Mathematical foundation for CS, AI, and engineering.", tags: ["Calculus", "Linear Algebra", "Discrete Math"] }
    ]
  },
  {
    key: "business",
    title: "Business & Management",
    subtitle: "Professional decision-making, markets, leadership, and execution.",
    areas: ["Strategy", "Markets", "Operations", "Leadership", "Analysis"],
    tracks: [
      { key: "finance", title: "Finance", subtitle: "Capital, valuation, and financial analysis.", tags: ["Valuation", "Risk", "Accounting"] },
      { key: "marketing", title: "Marketing", subtitle: "Growth, positioning, and customer strategy.", tags: ["Brand", "Growth", "Research"] },
      { key: "management", title: "Management", subtitle: "People, execution, and organizational systems.", tags: ["Leadership", "Ops", "Teams"] },
      { key: "accounting", title: "Accounting", subtitle: "Reporting, controls, and financial structure.", tags: ["Reporting", "Audit", "Controls"] }
    ]
  },
  {
    key: "law",
    title: "Law & Politics",
    subtitle: "Legal reasoning, governance, and public institutions.",
    areas: ["Law", "Policy", "Governance", "Ethics", "Institutions"],
    tracks: [
      { key: "law-core", title: "Law", subtitle: "Case reasoning, contracts, liability, and rights.", tags: ["Cases", "Contracts", "Ethics"] },
      { key: "politics", title: "Politics & Policy", subtitle: "Government, institutions, and public strategy.", tags: ["Policy", "Governance", "Debate"] }
    ]
  },
  {
    key: "health",
    title: "Health Sciences",
    subtitle: "Clinical learning, patient-centered knowledge, and public health.",
    areas: ["Clinical", "Research", "Public Health", "Practice", "Ethics"],
    tracks: [
      { key: "nursing", title: "Nursing", subtitle: "Patient care, safety, and applied clinical practice.", tags: ["Care", "Clinical", "Practice"] },
      { key: "medicine", title: "Medicine", subtitle: "Medical sciences and patient reasoning.", tags: ["Diagnosis", "Systems", "Clinical"] },
      { key: "public-health", title: "Public Health", subtitle: "Population health and prevention systems.", tags: ["Prevention", "Policy", "Epidemiology"] }
    ]
  },
  {
    key: "engineering",
    title: "Engineering",
    subtitle: "Design, mechanics, systems thinking, and practical engineering work.",
    areas: ["Design", "Systems", "Mechanics", "Electrics", "Materials"],
    tracks: [
      { key: "mechanical", title: "Mechanical Engineering", subtitle: "Mechanics, design, and production systems.", tags: ["Mechanics", "Design", "Thermo"] },
      { key: "electrical", title: "Electrical Engineering", subtitle: "Circuits, signals, and power systems.", tags: ["Circuits", "Signals", "Power"] },
      { key: "civil", title: "Civil Engineering", subtitle: "Structures, infrastructure, and the built environment.", tags: ["Structures", "Cities", "Infrastructure"] }
    ]
  },
  {
    key: "education",
    title: "Education",
    subtitle: "Teaching science, pedagogy, assessment, and learning design.",
    areas: ["Pedagogy", "Assessment", "Classroom", "Learning Design", "Research"],
    tracks: [
      { key: "teacher-ed", title: "Teacher Education", subtitle: "Professional teaching methods and curriculum practice.", tags: ["Teaching", "Curriculum", "Assessment"] }
    ]
  },
  {
    key: "arts",
    title: "Creative Arts",
    subtitle: "Craft, media, design, and creative production with professional standards.",
    areas: ["Design", "Media", "Production", "Critique", "Portfolio"],
    tracks: [
      { key: "design", title: "Design", subtitle: "Visual systems, digital design, and interaction work.", tags: ["UX", "Visual", "Systems"] },
      { key: "media", title: "Media & Production", subtitle: "Storytelling, production, and creative communication.", tags: ["Video", "Audio", "Narrative"] }
    ]
  },
  {
    key: "interdisciplinary",
    title: "Interdisciplinary Studies",
    subtitle: "Cross-disciplinary thinking for modern problems.",
    areas: ["Systems", "Human Behavior", "Reasoning", "Ethics", "Research"],
    tracks: [
      { key: "psychology", title: "Psychology", subtitle: "Mind, behavior, and research methods.", tags: ["Behavior", "Methods", "Cognition"] },
      { key: "philosophy", title: "Philosophy", subtitle: "Logic, ethics, and argument quality.", tags: ["Logic", "Ethics", "Debate"] }
    ]
  }
];

export function getFaculty(key: string) {
  return FACULTIES.find((f) => f.key === key) ?? null;
}

export function getTrack(facultyKey: string, trackKey: string) {
  const faculty = getFaculty(facultyKey);
  if (!faculty) return null;
  return faculty.tracks.find((t) => t.key === trackKey) ?? null;
}
