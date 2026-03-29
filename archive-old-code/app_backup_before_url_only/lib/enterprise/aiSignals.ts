export type EnterpriseSignal = {
  title: string;
  tone: "stable" | "watch" | "action";
  detail: string;
};

export type EnterpriseBriefing = {
  headline: string;
  summary: string;
  signals: EnterpriseSignal[];
  suggestions: string[];
};

const briefings: Record<string, EnterpriseBriefing> = {
  dashboard: {
    headline: "Enterprise AI Briefing",
    summary:
      "The workspace is stable overall. AI recommends attention on execution flow, permissions clarity, and onboarding consistency.",
    signals: [
      { title: "Mission health", tone: "watch", detail: "2 active workstreams may need sequencing review." },
      { title: "Team coordination", tone: "stable", detail: "Cross-team flow is healthy with minor schedule overlap." },
      { title: "Support load", tone: "watch", detail: "New-user guidance demand is increasing." },
    ],
    suggestions: [
      "Review mission sequencing",
      "Check onboarding support",
      "Confirm permissions coverage",
    ],
  },
  admin: {
    headline: "Administrative AI Summary",
    summary:
      "Administration looks ready, but AI suggests reviewing member status, role boundaries, and operational visibility.",
    signals: [
      { title: "Membership", tone: "watch", detail: "Some accounts may need ownership review." },
      { title: "Permissions", tone: "action", detail: "Sensitive modules should stay role-limited." },
      { title: "Billing posture", tone: "stable", detail: "Current workspace scale fits present usage." },
    ],
    suggestions: [
      "Review dormant members",
      "Audit role-to-team mapping",
      "Prepare governance checklist",
    ],
  },
  security: {
    headline: "Security AI Summary",
    summary:
      "Enterprise trust posture is improving. AI recommends strengthening sign-in policy, audit review, and workflow protection.",
    signals: [
      { title: "Identity readiness", tone: "watch", detail: "SSO planning should be prioritized." },
      { title: "Audit visibility", tone: "stable", detail: "Security review structure is present." },
      { title: "Workflow protection", tone: "action", detail: "Sensitive flows need stronger control defaults." },
    ],
    suggestions: [
      "Define SSO direction",
      "Review access boundaries",
      "Align AI policy with governance",
    ],
  },
  settings: {
    headline: "Workspace AI Summary",
    summary:
      "Settings are organized. AI suggests refining identity, notification rhythm, and automation defaults for a cleaner enterprise experience.",
    signals: [
      { title: "Identity consistency", tone: "watch", detail: "Workspace branding can be made more recognizable." },
      { title: "Automation defaults", tone: "action", detail: "Baseline trigger logic is still undefined." },
      { title: "Notification load", tone: "stable", detail: "Communication settings can be tuned without urgent risk." },
    ],
    suggestions: [
      "Set automation defaults",
      "Define identity rules",
      "Reduce notification noise",
    ],
  },
  help: {
    headline: "Support AI Summary",
    summary:
      "Help is useful but should become more proactive. AI suggests guiding onboarding, navigation understanding, and product support from one place.",
    signals: [
      { title: "Onboarding clarity", tone: "watch", detail: "New users may still need step-by-step support." },
      { title: "Navigation understanding", tone: "watch", detail: "Some enterprise routes need clearer user meaning." },
      { title: "Documentation value", tone: "stable", detail: "Docs can support guided adoption." },
    ],
    suggestions: [
      "Guide first-time users",
      "Link support to settings",
      "Surface recommended routes",
    ],
  },
  missions: {
    headline: "Mission AI Summary",
    summary:
      "Execution planning is active. AI recommends turning broad goals into measurable phases and linking them to schedule and ownership.",
    signals: [
      { title: "Goal clarity", tone: "watch", detail: "Some mission requests may still be too broad." },
      { title: "Execution flow", tone: "stable", detail: "Mission structure is usable and expandable." },
      { title: "Ownership mapping", tone: "action", detail: "Each mission should align with team responsibility." },
    ],
    suggestions: [
      "Clarify outcomes",
      "Assign mission ownership",
      "Link missions to schedule",
    ],
  },
  strategy: {
    headline: "Strategy AI Summary",
    summary:
      "Leadership reasoning is available. AI recommends stronger comparison flow, risk framing, and decision traceability.",
    signals: [
      { title: "Decision quality", tone: "watch", detail: "Input quality affects strategic output." },
      { title: "Tradeoff framing", tone: "stable", detail: "Comparative reasoning is ready to expand." },
      { title: "Decision memory", tone: "action", detail: "Strategic outputs should be saved for later review." },
    ],
    suggestions: [
      "Compare options clearly",
      "Track strategic decisions",
      "Connect strategy to missions",
    ],
  },
};

export function getEnterpriseBriefing(key: string): EnterpriseBriefing {
  return briefings[key] ?? briefings.dashboard;
}
