"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Access Control"
      intro="Define who can access what, across enterprise modules, operational tools, and sensitive areas."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Role Access", desc: "Match workspace roles to appropriate visibility and control.", href: "/enterprise/admin/permissions" },
        { title: "Team Scope", desc: "Limit access by responsibility and organizational position.", href: "/enterprise/admin/teams" },
        { title: "Module Boundaries", desc: "Protect strategy, admin, and sensitive operational areas.", href: "/enterprise/security" },
        { title: "Governed Collaboration", desc: "Keep enterprise collaboration open, but controlled.", href: "/enterprise/rooms" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review role boundaries", desc: "Confirm each role has the right access range.", href: "/enterprise/admin/permissions" },
        { title: "Check sensitive areas", desc: "Protect admin, strategy, and security functions.", href: "/enterprise/security" },
        { title: "Coordinate with team structure", desc: "Align permissions with enterprise org design.", href: "/enterprise/admin/teams" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Permissions", href: "/enterprise/admin/permissions" },
        { label: "Teams", href: "/enterprise/admin/teams" },
      ]}
    />
  );
}
