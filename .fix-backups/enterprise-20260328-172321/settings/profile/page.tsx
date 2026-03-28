import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Profile"
      intro="Manage workspace identity basics like name, ownership, description, and operational state."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Workspace Name", desc: "Keep naming clear and aligned with enterprise identity.", href: "/enterprise/settings/identity" },
        { title: "Ownership", desc: "Clarify who leads and governs the workspace.", href: "/enterprise/admin/users" },
        { title: "Operational State", desc: "Track whether the workspace is active, growing, or under review.", href: "/enterprise/dashboard" },
        { title: "Identity Base", desc: "Use profile as the foundation for wider enterprise settings.", href: "/enterprise/settings/identity" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review workspace name", desc: "Confirm it matches your enterprise positioning.", href: "/enterprise/settings/identity" },
        { title: "Check operational state", desc: "Use profile settings to reflect readiness.", href: "/enterprise/dashboard" },
        { title: "Align with identity", desc: "Coordinate profile with organization branding.", href: "/enterprise/settings/identity" },
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
