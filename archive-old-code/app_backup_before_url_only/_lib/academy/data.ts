export type AcademyBadge = {
  title: string;
  desc: string;
};

export type AcademySubject = {
  key: string;
  title: string;
  subtitle: string;
  tags: string[];
  badges: AcademyBadge[];
};

export type AcademyLevel = {
  key: string;
  title: string;
  subtitle: string;
  redirectLabel: string;
  levelBadge: string;
  subjects: AcademySubject[];
};

export const ACADEMY_LEVELS: AcademyLevel[] = [
  {
    key: "junior",
    title: "Junior Secondary",
    subtitle: "Foundational secondary school learning with patient guidance and step-by-step support.",
    redirectLabel: "Senior Secondary",
    levelBadge: "Foundation Level",
    subjects: [
      {
        key: "mathematics",
        title: "Mathematics",
        subtitle: "Numbers, algebra, geometry, measurement, and problem-solving.",
        tags: ["Algebra", "Geometry", "Practice"],
        badges: [
          { title: "Problem Solver", desc: "Complete practice tasks and guided examples." },
          { title: "Math Builder", desc: "Understand key foundations step by step." }
        ]
      },
      {
        key: "english-language",
        title: "English Language",
        subtitle: "Grammar, comprehension, writing, and communication.",
        tags: ["Grammar", "Writing", "Comprehension"],
        badges: [
          { title: "Grammar Keeper", desc: "Build stronger grammar and sentence structure." },
          { title: "Reading Builder", desc: "Improve comprehension and writing confidence." }
        ]
      },
      {
        key: "basic-science",
        title: "Basic Science",
        subtitle: "Introductory science concepts, observation, and experiments.",
        tags: ["Science", "Experiments", "Concepts"],
        badges: [
          { title: "Science Explorer", desc: "Understand science ideas with simple examples." },
          { title: "Experiment Starter", desc: "Practice observation and explanation skills." }
        ]
      },
      {
        key: "social-studies",
        title: "Social Studies",
        subtitle: "Society, citizenship, relationships, and human systems.",
        tags: ["Society", "Citizenship", "Culture"],
        badges: [
          { title: "Community Thinker", desc: "Understand people, society, and citizenship." },
          { title: "Culture Learner", desc: "Build awareness of social systems and values." }
        ]
      },
      {
        key: "basic-technology",
        title: "Basic Technology",
        subtitle: "Tools, design, processes, and technical foundations.",
        tags: ["Tools", "Design", "Processes"],
        badges: [
          { title: "Tech Starter", desc: "Learn technical foundations with simple steps." },
          { title: "Design Learner", desc: "Practice basic design and process thinking." }
        ]
      },
      {
        key: "civic-education",
        title: "Civic Education",
        subtitle: "Rights, duties, values, and responsible citizenship.",
        tags: ["Rights", "Duties", "Citizenship"],
        badges: [
          { title: "Civic Voice", desc: "Understand rights, duties, and shared values." },
          { title: "Responsible Citizen", desc: "Build awareness of civic responsibility." }
        ]
      },
      {
        key: "business-studies",
        title: "Business Studies",
        subtitle: "Money, trade, office basics, and simple enterprise concepts.",
        tags: ["Trade", "Money", "Enterprise"],
        badges: [
          { title: "Trade Starter", desc: "Learn basic business and trade concepts." },
          { title: "Money Thinker", desc: "Understand simple commercial systems." }
        ]
      },
      {
        key: "christian-religious-studies",
        title: "Christian Religious Studies",
        subtitle: "Bible lessons, values, teachings, and moral understanding.",
        tags: ["Bible", "Values", "Faith"],
        badges: [
          { title: "Faith Learner", desc: "Study Christian teachings with patience and care." },
          { title: "Value Builder", desc: "Reflect on lessons, values, and moral understanding." }
        ]
      },
      {
        key: "islamic-religious-studies",
        title: "Islamic Religious Studies",
        subtitle: "Islamic teachings, values, history, and moral guidance.",
        tags: ["Islam", "Values", "History"],
        badges: [
          { title: "Islamic Learner", desc: "Study Islamic teachings clearly and respectfully." },
          { title: "Ethics Builder", desc: "Build understanding of values and guidance." }
        ]
      },
      {
        key: "cultural-creative-arts",
        title: "Cultural & Creative Arts",
        subtitle: "Art, music, culture, performance, and creative expression.",
        tags: ["Art", "Music", "Culture"],
        badges: [
          { title: "Creative Spark", desc: "Develop creative confidence and expression." },
          { title: "Culture Maker", desc: "Explore arts, performance, and culture." }
        ]
      }
    ]
  },
  {
    key: "senior",
    title: "Senior Secondary",
    subtitle: "Exam-focused subject support for advanced secondary school preparation.",
    redirectLabel: "University Hub",
    levelBadge: "Exam Preparation Level",
    subjects: [
      {
        key: "mathematics",
        title: "Mathematics",
        subtitle: "Algebra, calculus foundations, trigonometry, and exam practice.",
        tags: ["Algebra", "Trigonometry", "Exams"],
        badges: [
          { title: "Math Mastery", desc: "Strengthen exam skills and mathematical reasoning." },
          { title: "Exam Builder", desc: "Prepare with structured math revision." }
        ]
      },
      {
        key: "english-language",
        title: "English Language",
        subtitle: "Essay writing, comprehension, grammar, and language mastery.",
        tags: ["Essay", "Grammar", "Comprehension"],
        badges: [
          { title: "Essay Builder", desc: "Improve writing structure and expression." },
          { title: "Language Mastery", desc: "Strengthen grammar and comprehension." }
        ]
      },
      {
        key: "physics",
        title: "Physics",
        subtitle: "Motion, energy, electricity, waves, and quantitative science.",
        tags: ["Motion", "Energy", "Electricity"],
        badges: [
          { title: "Physics Explorer", desc: "Understand physics concepts step by step." },
          { title: "Calculation Ready", desc: "Improve problem-solving and formula use." }
        ]
      },
      {
        key: "chemistry",
        title: "Chemistry",
        subtitle: "Matter, reactions, bonding, calculations, and laboratory science.",
        tags: ["Reactions", "Bonding", "Calculations"],
        badges: [
          { title: "Reaction Builder", desc: "Learn reactions, bonding, and chemical ideas." },
          { title: "Lab Thinker", desc: "Strengthen chemistry understanding and calculations." }
        ]
      },
      {
        key: "biology",
        title: "Biology",
        subtitle: "Life processes, organisms, genetics, and ecosystems.",
        tags: ["Life", "Genetics", "Ecosystems"],
        badges: [
          { title: "Life Scientist", desc: "Understand living systems and key biology topics." },
          { title: "Biology Revision Star", desc: "Build strong recall and exam confidence." }
        ]
      },
      {
        key: "government",
        title: "Government",
        subtitle: "Political systems, institutions, public authority, and civic reasoning.",
        tags: ["Politics", "Institutions", "Authority"],
        badges: [
          { title: "Civic Analyst", desc: "Understand institutions and government systems." },
          { title: "Policy Reader", desc: "Build stronger political understanding." }
        ]
      },
      {
        key: "literature-in-english",
        title: "Literature in English",
        subtitle: "Poetry, drama, prose, interpretation, and literary appreciation.",
        tags: ["Poetry", "Drama", "Prose"],
        badges: [
          { title: "Literature Reader", desc: "Read and interpret literary texts with confidence." },
          { title: "Text Analyst", desc: "Strengthen literary explanation and analysis." }
        ]
      },
      {
        key: "economics",
        title: "Economics",
        subtitle: "Markets, scarcity, production, and economic reasoning.",
        tags: ["Markets", "Scarcity", "Production"],
        badges: [
          { title: "Market Thinker", desc: "Understand economic ideas and structures." },
          { title: "Economics Builder", desc: "Prepare for questions and revision." }
        ]
      },
      {
        key: "commerce",
        title: "Commerce",
        subtitle: "Trade, business systems, distribution, and commercial structure.",
        tags: ["Trade", "Business", "Distribution"],
        badges: [
          { title: "Commerce Learner", desc: "Understand trade and business systems." },
          { title: "Business Flow", desc: "Build stronger understanding of commercial processes." }
        ]
      },
      {
        key: "geography",
        title: "Geography",
        subtitle: "Environment, maps, population, climate, and human geography.",
        tags: ["Maps", "Climate", "Population"],
        badges: [
          { title: "Geo Explorer", desc: "Learn geography with maps and clear explanations." },
          { title: "Climate Reader", desc: "Understand environment and population systems." }
        ]
      },
      {
        key: "history",
        title: "History",
        subtitle: "Past events, causation, continuity, and interpretation.",
        tags: ["Events", "Causation", "Interpretation"],
        badges: [
          { title: "History Reader", desc: "Understand historical events and why they matter." },
          { title: "Timeline Thinker", desc: "Build stronger historical interpretation." }
        ]
      },
      {
        key: "agricultural-science",
        title: "Agricultural Science",
        subtitle: "Farming systems, crops, livestock, and agricultural practice.",
        tags: ["Crops", "Livestock", "Practice"],
        badges: [
          { title: "Agri Learner", desc: "Understand farming systems and agricultural practice." },
          { title: "Farm Systems", desc: "Improve agricultural knowledge and revision." }
        ]
      },
      {
        key: "christian-religious-studies",
        title: "Christian Religious Studies",
        subtitle: "Christian teachings, scripture, ethics, and exam preparation.",
        tags: ["Scripture", "Ethics", "Faith"],
        badges: [
          { title: "Scripture Reader", desc: "Study Christian teachings with clarity and care." },
          { title: "Ethics Focus", desc: "Build stronger revision in faith and values." }
        ]
      },
      {
        key: "islamic-religious-studies",
        title: "Islamic Religious Studies",
        subtitle: "Islamic teachings, texts, ethics, and exam preparation.",
        tags: ["Texts", "Ethics", "Faith"],
        badges: [
          { title: "Islamic Scholar", desc: "Strengthen Islamic studies understanding patiently." },
          { title: "Faith Revision", desc: "Prepare clearly for subject revision and exams." }
        ]
      }
    ]
  }
];

export function getAcademyLevel(levelKey: string) {
  return ACADEMY_LEVELS.find((level) => level.key === levelKey);
}
