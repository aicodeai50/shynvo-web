import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Admin"
      eyebrow="Administration"
      title="Billing"
      intro="Review plan state, usage posture, and readiness for enterprise-scale access and operations."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Plan Readiness", desc: "Understand current enterprise plan posture and growth direction.", href: "/pricing" },
        { title: "Usage View", desc: "Track how workspace activity relates to platform usage.", href: "/enterprise/analytics" },
        { title: "Subscription Oversight", desc: "Keep billing visibility aligned with operational scale.", href: "/pricing" },
        { title: "Expansion Planning", desc: "Use billing context to support team and module growth.", href: "/enterprise/admin/teams" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review current plan", desc: "Check if workspace scope matches enterprise usage needs.", href: "/pricing" },
        { title: "Monitor growth", desc: "Prepare for more members, teams, and module usage.", href: "/enterprise/analytics" },
        { title: "Coordinate admin readiness", desc: "Align billing posture with organization expansion.", href: "/enterprise/admin" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Admin Home", href: "/enterprise/admin" },
        { label: "Analytics", href: "/enterprise/analytics" },
        { label: "Pricing", href: "/pricing" },
      ]}
    />
  );
}
