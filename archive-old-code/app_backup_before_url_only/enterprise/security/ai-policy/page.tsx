import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="AI Policy"
      intro="Guide how AI operates inside the enterprise so support, automation, and reasoning stay aligned with rules."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "AI Boundaries", desc: "Define how AI should behave in enterprise workflows.", href: "/enterprise/settings/ai" },
        { title: "Safe Assistance", desc: "Keep AI helpful without making enterprise operations feel risky.", href: "/enterprise/help/ai-guidance" },
        { title: "Operational Alignment", desc: "Match AI behavior to governance and enterprise needs.", href: "/enterprise/security/compliance" },
        { title: "Trustworthy Guidance", desc: "Make AI easier for organizations to accept.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Set AI behavior norms", desc: "Clarify how AI should assist in enterprise workflows.", href: "/enterprise/settings/ai" },
        { title: "Coordinate with settings", desc: "Align AI policy with workspace AI preferences.", href: "/enterprise/settings" },
        { title: "Protect sensitive workflows", desc: "Reduce AI overreach in controlled enterprise areas.", href: "/enterprise/security/workflows" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "AI Settings", href: "/enterprise/settings/ai" },
        { label: "AI Guidance", href: "/enterprise/help/ai-guidance" },
      ]}
    />
  );
}
