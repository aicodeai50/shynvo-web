"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Audit Visibility"
      intro="Track meaningful enterprise actions and maintain visibility into administrative and operational changes."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Activity Logs", desc: "Review key workspace actions and changes across enterprise modules.", href: "/enterprise/security/audit" },
        { title: "Recent Changes", desc: "Understand what changed recently and where operational movement happened.", href: "/enterprise/security/audit" },
        { title: "Governance Review", desc: "Support accountability with clear traceability.", href: "/enterprise/security/compliance" },
        { title: "Control Confidence", desc: "Make enterprise administration easier to trust and verify.", href: "/enterprise/security" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review recent admin actions", desc: "Check latest changes in permissions, users, and controls.", href: "/enterprise/security/audit" },
        { title: "Inspect governance flow", desc: "Confirm that changes are visible and auditable.", href: "/enterprise/security/compliance" },
        { title: "Prepare compliance review", desc: "Use audit visibility to support enterprise readiness.", href: "/enterprise/admin/compliance" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Security Audit", href: "/enterprise/security/audit" },
        { label: "Compliance", href: "/enterprise/admin/compliance" },
      ]}
    />
  );
}
