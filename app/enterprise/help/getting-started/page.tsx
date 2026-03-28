"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="Getting Started"
      intro="Guide new enterprise users through workspace setup, team structure, and first-step configuration."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Workspace Setup", desc: "Start with the right enterprise structure and visible operating areas.", href: "/enterprise/settings" },
        { title: "Team Readiness", desc: "Make teams easier to onboard into a shared environment.", href: "/enterprise/teams" },
        { title: "Module Familiarity", desc: "Help users understand what each enterprise area does.", href: "/enterprise" },
        { title: "Adoption Confidence", desc: "Reduce friction during first use.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review workspace structure", desc: "Start with settings, teams, and permissions.", href: "/enterprise/settings" },
        { title: "Open help overview", desc: "Return to the support center for more guidance.", href: "/enterprise/help" },
        { title: "Prepare first admin flow", desc: "Move into admin and settings for setup.", href: "/enterprise/admin" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Help Home", href: "/enterprise/help" },
        { label: "Settings", href: "/enterprise/settings" },
        { label: "Admin", href: "/enterprise/admin" },
      ]}
    />
  );
}
