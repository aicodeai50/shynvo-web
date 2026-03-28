"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Team Management"
      intro="Create teams, define structure, assign leads, and align team design with the workspace operating model."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Team Creation", desc: "Set up new teams and shape how they appear in the enterprise environment.", href: "/enterprise/teams" },
        { title: "Lead Assignment", desc: "Connect managers and leads with the right operational scope.", href: "/enterprise/directory" },
        { title: "Structure Review", desc: "Keep organizational structure clear, scalable, and easy to navigate.", href: "/enterprise/teams" },
        { title: "Cross-Team Clarity", desc: "Reduce confusion in ownership, execution, and reporting lines.", href: "/enterprise/rooms" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Create missing teams", desc: "Add missing departments and support organizational growth.", href: "/enterprise/teams" },
        { title: "Assign or update leads", desc: "Keep leadership ownership visible across the platform.", href: "/enterprise/directory" },
        { title: "Review org shape", desc: "Confirm that team structure matches enterprise execution needs.", href: "/enterprise/analytics" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Teams", href: "/enterprise/teams" },
        { label: "Directory", href: "/enterprise/directory" },
      ]}
    />
  );
}
