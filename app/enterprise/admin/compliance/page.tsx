"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Compliance Controls"
      intro="Coordinate governance readiness, policy structure, and operational controls for enterprise customers."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Policy Controls", desc: "Shape how rules and governance expectations appear in the workspace.", href: "/enterprise/security/compliance" },
        { title: "Governance Readiness", desc: "Prepare the enterprise environment for stronger control standards.", href: "/enterprise/security/compliance" },
        { title: "Operational Discipline", desc: "Support trustworthy enterprise operations through consistent structure.", href: "/enterprise/security/workflows" },
        { title: "Customer Confidence", desc: "Present a stronger enterprise posture for adoption and scale.", href: "/enterprise/security" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review governance coverage", desc: "Check whether core admin and security controls are aligned.", href: "/enterprise/security" },
        { title: "Prepare policy structure", desc: "Use compliance thinking to organize enterprise rules.", href: "/enterprise/security/compliance" },
        { title: "Coordinate with security", desc: "Align compliance posture with access and audit decisions.", href: "/enterprise/security/access" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Security", href: "/enterprise/security" },
        { label: "Compliance", href: "/enterprise/security/compliance" },
      ]}
    />
  );
}
