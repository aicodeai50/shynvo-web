import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="AI Guidance"
      intro="Explain how AI and OS Core support enterprise work across strategy, missions, workflows, and support."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Enterprise AI Role", desc: "Clarify how AI helps users inside the enterprise environment.", href: "/enterprise/settings/ai" },
        { title: "OS Core Connection", desc: "Show how execution systems and AI layers work together.", href: "/enterprise/os" },
        { title: "User Understanding", desc: "Reduce uncertainty around how AI should be used.", href: "/enterprise/help/workspace-support" },
        { title: "Adoption Support", desc: "Make AI feel more useful, trustworthy, and operational.", href: "/enterprise/security/ai-policy" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review AI settings", desc: "Connect AI guidance with configurable behavior.", href: "/enterprise/settings/ai" },
        { title: "Open strategy", desc: "See how AI reasoning supports decision-making.", href: "/enterprise/strategy" },
        { title: "Open OS Core", desc: "Explore how enterprise and execution layers connect.", href: "/enterprise/os" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Help Home", href: "/enterprise/help" },
        { label: "AI Settings", href: "/enterprise/settings/ai" },
        { label: "OS Core", href: "/enterprise/os" },
      ]}
    />
  );
}
