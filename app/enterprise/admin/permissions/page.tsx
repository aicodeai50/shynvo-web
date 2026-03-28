"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Permissions"
      intro="Manage role rules, access levels, and module permissions so the workspace stays secure and usable."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Role Rules", desc: "Define which roles can view, manage, or control enterprise features.", href: "/enterprise/security/access" },
        { title: "Access Scope", desc: "Control team-level, room-level, and workspace-level access boundaries.", href: "/enterprise/security/access" },
        { title: "Module Permissions", desc: "Limit access to sensitive enterprise modules when needed.", href: "/enterprise/security" },
        { title: "Operational Safety", desc: "Reduce accidental changes and keep enterprise control disciplined.", href: "/enterprise/security/ai-policy" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review access gaps", desc: "Check for roles with too much or too little workspace access.", href: "/enterprise/security/access" },
        { title: "Align roles to teams", desc: "Coordinate permissions with team structure and ownership.", href: "/enterprise/admin/teams" },
        { title: "Protect sensitive modules", desc: "Apply tighter controls to strategy, security, and admin tools.", href: "/enterprise/security" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Security", href: "/enterprise/security" },
        { label: "Access Control", href: "/enterprise/security/access" },
      ]}
    />
  );
}
