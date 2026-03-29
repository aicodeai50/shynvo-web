import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Security"
      eyebrow="Security & Governance"
      title="Protected Workflows"
      intro="Strengthen how enterprise workflows are structured, protected, and coordinated across teams and operations."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Controlled Flow", desc: "Support enterprise execution with more disciplined workflow structure.", href: "/enterprise/settings/automation" },
        { title: "Operational Safety", desc: "Reduce avoidable errors in important processes.", href: "/enterprise/security/access" },
        { title: "Protected Coordination", desc: "Make team workflows clearer and more reliable.", href: "/enterprise/schedule" },
        { title: "Execution Confidence", desc: "Help enterprise operations feel safer at scale.", href: "/enterprise/missions" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review sensitive workflow areas", desc: "Check what should be more protected or governed.", href: "/enterprise/security/access" },
        { title: "Align with automation", desc: "Coordinate workflow safety with enterprise automation defaults.", href: "/enterprise/settings/automation" },
        { title: "Support access control", desc: "Keep workflow protection connected to permissions.", href: "/enterprise/admin/permissions" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Security Home", href: "/enterprise/security" },
        { label: "Automation", href: "/enterprise/settings/automation" },
        { label: "Permissions", href: "/enterprise/admin/permissions" },
      ]}
    />
  );
}
