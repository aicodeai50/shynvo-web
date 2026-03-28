"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="AI"
      intro="Adjust assistance behavior, enterprise reasoning style, and how AI supports users inside the workspace."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "AI Behavior", desc: "Shape how assistance should feel across enterprise interactions.", href: "/enterprise/help/ai-guidance" },
        { title: "Reasoning Style", desc: "Support more structured decision assistance where needed.", href: "/enterprise/strategy" },
        { title: "Operational Role", desc: "Clarify what AI should support in the enterprise environment.", href: "/enterprise/os" },
        { title: "Trust and Guidance", desc: "Make AI feel more aligned with user expectations.", href: "/enterprise/security/ai-policy" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review AI support style", desc: "Decide how AI should help users day to day.", href: "/enterprise/help/ai-guidance" },
        { title: "Coordinate with policy", desc: "Align AI settings with enterprise safety direction.", href: "/enterprise/security/ai-policy" },
        { title: "Connect AI to workflows", desc: "Support missions, settings, and OS Core behavior.", href: "/enterprise/os" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "AI Policy", href: "/enterprise/security/ai-policy" },
        { label: "AI Guidance", href: "/enterprise/help/ai-guidance" },
      ]}
    />
  );
}
