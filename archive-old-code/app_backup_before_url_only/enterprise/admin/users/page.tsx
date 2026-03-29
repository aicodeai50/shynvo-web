import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="User Management"
      intro="Manage workspace membership, access state, invite flow, and participation visibility from one place."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Member Directory", desc: "Review active members, invite status, and current workspace participation.", href: "/enterprise/directory" },
        { title: "Access Status", desc: "Track who has access, pending approval, or restricted workspace entry.", href: "/enterprise/security/access" },
        { title: "Admin Oversight", desc: "Keep control over enterprise membership changes and access governance.", href: "/enterprise/admin/audit" },
        { title: "Participation Health", desc: "Monitor whether users are engaged across teams, rooms, and missions.", href: "/enterprise/analytics" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Invite new members", desc: "Extend workspace access safely with role-aware onboarding.", href: "/enterprise/help/getting-started" },
        { title: "Review dormant accounts", desc: "Identify inactive or misaligned workspace access.", href: "/enterprise/analytics" },
        { title: "Prepare role assignment", desc: "Coordinate roles with team and permission settings.", href: "/enterprise/admin/permissions" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Permissions", href: "/enterprise/admin/permissions" },
        { label: "Directory", href: "/enterprise/directory" },
      ]}
    />
  );
}
