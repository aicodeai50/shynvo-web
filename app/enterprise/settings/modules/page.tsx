"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Modules"
      intro="Control which enterprise modules are emphasized and how the workspace is organized around them."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Module Visibility", desc: "Decide which areas matter most in the enterprise environment.", href: "/enterprise/dashboard" },
        { title: "Workspace Structure", desc: "Support a cleaner experience by shaping visible priorities.", href: "/enterprise/settings/profile" },
        { title: "Operational Relevance", desc: "Keep important modules prominent for users.", href: "/enterprise/analytics" },
        { title: "Enterprise Simplicity", desc: "Reduce clutter and improve navigation confidence.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review visible modules", desc: "Check whether the workspace reflects current priorities.", href: "/enterprise/dashboard" },
        { title: "Align with user needs", desc: "Support clearer navigation and adoption.", href: "/enterprise/help/workspace-support" },
        { title: "Coordinate with settings", desc: "Keep module emphasis aligned with identity and automation.", href: "/enterprise/settings/identity" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "Identity", href: "/enterprise/settings/identity" },
        { label: "Dashboard", href: "/enterprise/dashboard" },
      ]}
    />
  );
}
