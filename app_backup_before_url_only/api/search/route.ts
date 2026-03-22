import { NextRequest, NextResponse } from "next/server";

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function hasAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function detectSearchReply(input: string) {
  const q = normalize(input);

  if (!q) {
    return {
      answer: "Search for environments, departments, or topics across Shynvo.",
    };
  }

  if (
    hasAny(q, [
      "price",
      "pricing",
      "plan",
      "plans",
      "cost",
      "subscription",
      "payment",
      "pay",
      "upgrade",
      "pro",
      "team",
      "enterprise",
    ])
  ) {
    return {
      answer: "Shynvo has Free, Pro, Team, and Enterprise options. Open Pricing to compare plans and upgrade paths.",
      href: "/pricing",
      label: "Open Pricing",
    };
  }

  if (
    hasAny(q, [
      "contact",
      "support",
      "email",
      "business",
      "help",
      "reach",
    ])
  ) {
    return {
      answer: "You can contact Shynvo through the Contact page or by email at hi@shynvo.app.",
      href: "/contact",
      label: "Open Contact",
    };
  }

  if (
    hasAny(q, [
      "docs",
      "documentation",
      "guide",
      "manual",
      "platform guide",
    ])
  ) {
    return {
      answer: "The Docs page gives an overview of the main Shynvo environments, routes, and platform structure.",
      href: "/docs",
      label: "Open Docs",
    };
  }

  if (
    hasAny(q, [
      "robot",
      "main ai",
      "assistant",
      "chat",
    ])
  ) {
    return {
      answer: "Shynvo Robot is the guided AI environment for questions, navigation, and support across the platform.",
      href: "/robot",
      label: "Open Robot",
    };
  }

  if (
    hasAny(q, [
      "university",
      "faculty",
      "medicine",
      "law",
      "engineering",
      "computer science",
      "higher education",
    ])
  ) {
    return {
      answer: "University Hub is the structured higher education environment with faculties, tracks, teachers, tutors, and assistants.",
      href: "/university",
      label: "Open University Hub",
    };
  }

  if (
    hasAny(q, [
      "academy",
      "school",
      "student",
      "subject",
      "classroom",
    ])
  ) {
    return {
      answer: "Shynvo Academy is the school learning environment for junior and senior students across subjects.",
      href: "/academy",
      label: "Open Academy",
    };
  }

  if (
    hasAny(q, [
      "enterprise",
      "business",
      "leadership",
      "operations",
      "organization",
      "team",
      "okr",
      "analytics",
    ])
  ) {
    return {
      answer: "Enterprise Suite is the organizational environment for teams, strategy, missions, analytics, and coordination.",
      href: "/enterprise",
      label: "Open Enterprise Suite",
    };
  }

  if (
    hasAny(q, [
      "os",
      "focus",
      "tasks",
      "mission",
      "productivity",
      "planning",
    ])
  ) {
    return {
      answer: "Shynvo OS is the personal execution environment for planning, focus, missions, and workflow structure.",
      href: "/os",
      label: "Open Shynvo OS",
    };
  }

  if (
    hasAny(q, [
      "experiments",
      "experiment",
      "simulation",
      "concept",
      "creative",
    ])
  ) {
    return {
      answer: "Experiments is where users explore simulations, concept worlds, and experimental system experiences.",
      href: "/experiments",
      label: "Open Experiments",
    };
  }

  if (
    hasAny(q, [
      "frontier",
      "coding",
      "programming",
      "code",
      "build",
      "engineer",
    ])
  ) {
    return {
      answer: "Frontier Lab is the engineering district for coding, logic, systems, and build-focused practice.",
      href: "/frontier",
      label: "Open Frontier Lab",
    };
  }

  if (
    hasAny(q, [
      "arcade",
      "game",
      "games",
      "challenge",
      "drill",
    ])
  ) {
    return {
      answer: "Arcade Sim is the interactive skill arena for drills, challenges, levels, and game-based practice.",
      href: "/arcade",
      label: "Open Arcade Sim",
    };
  }

  if (
    hasAny(q, [
      "account",
      "profile",
      "login",
      "log in",
      "sign in",
      "sign up",
      "create account",
      "register",
      "logout",
      "log out",
    ])
  ) {
    return {
      answer: "Users can create an account, verify email, sign in, and manage account access through the Shynvo account pages.",
      href: "/sign-in",
      label: "Open Sign In",
    };
  }

  return {
    answer: "Search supports Shynvo platform topics like pricing, docs, contact, accounts, Robot, University Hub, Academy, OS, Frontier Lab, Enterprise Suite, Experiments, and Arcade Sim.",
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const text = String(body?.message || body?.query || "").trim();
    return NextResponse.json(detectSearchReply(text), { status: 200 });
  } catch {
    return NextResponse.json(
      { answer: "Search could not respond right now." },
      { status: 200 }
    );
  }
}
