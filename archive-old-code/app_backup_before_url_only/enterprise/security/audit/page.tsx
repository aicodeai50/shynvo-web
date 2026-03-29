import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Security Audit"
      intro="Keep enterprise activity visible and easier to review for safety, accountability, and governance."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Traceability", desc: "Follow enterprise changes across modules and access controls.", href: "/enterprise/admin/audit" },
        { title: "Activity Review", desc: "Observe meaningful user and admin actions.", href: "/enterprise/admin/audit" },
        { title: "Governance Visibility", desc: "Support enterprise trust through reviewable actions.", href: "/enterprise/security/compliance" },
        { title: "Operational Confidence", desc: "Make the workspace feel safer and more controlled.", href: "/enterprise/security" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review recent activity", desc: "Look for meaningful admin and security changes.", href: "/enterprise/admin/audit" },
        { title: "Check risky areas", desc: "Watch sensitive actions around permissions and structure.", href: "/enterprise/admin/permissions" },
        { title: "Support governance review", desc: "Use audit signals to improve enterprise confidence.", href: "/enterprise/security/compliance" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Admin Audit", href: "/enterprise/admin/audit" },
        { label: "Compliance", href: "/enterprise/security/compliance" },
      ]}
    />
  );
}
