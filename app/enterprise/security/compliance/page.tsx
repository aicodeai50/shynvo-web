"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Compliance"
      intro="Strengthen enterprise trust by shaping the workspace around policy, governance, and preparation."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Governance Structure", desc: "Support a more controlled enterprise environment.", href: "/enterprise/admin/compliance" },
        { title: "Policy Alignment", desc: "Bring rules, operations, and safety expectations together.", href: "/enterprise/security/ai-policy" },
        { title: "Readiness Signals", desc: "Make the workspace look more enterprise-ready to teams and customers.", href: "/enterprise/admin/billing" },
        { title: "Trust Building", desc: "Use compliance posture to support adoption confidence.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review governance posture", desc: "Check whether controls are visible and coherent.", href: "/enterprise/admin/compliance" },
        { title: "Coordinate with audit", desc: "Use traceability to support enterprise discipline.", href: "/enterprise/security/audit" },
        { title: "Prepare safer defaults", desc: "Align settings, permissions, and workflows.", href: "/enterprise/settings" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Admin Compliance", href: "/enterprise/admin/compliance" },
        { label: "Security Audit", href: "/enterprise/security/audit" },
      ]}
    />
  );
}
