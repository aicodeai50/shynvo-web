import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Identity"
      intro="Shape how the workspace is presented through brand direction, logo logic, and enterprise identity."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Brand Direction", desc: "Define how the enterprise workspace should feel and be recognized.", href: "/enterprise/settings/profile" },
        { title: "Visual Identity", desc: "Support a stronger workspace presence through clearer identity cues.", href: "/enterprise/settings/profile" },
        { title: "Environment Consistency", desc: "Keep identity aligned across modules and enterprise sections.", href: "/enterprise/settings/modules" },
        { title: "Trust Signaling", desc: "Make the workspace feel more mature and intentional.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review brand posture", desc: "Confirm how the workspace should present itself.", href: "/enterprise/settings/profile" },
        { title: "Coordinate with profile", desc: "Align identity with workspace naming and structure.", href: "/enterprise/settings/profile" },
        { title: "Support user recognition", desc: "Use identity to reduce confusion and strengthen trust.", href: "/enterprise/help/workspace-support" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "Profile", href: "/enterprise/settings/profile" },
        { label: "Modules", href: "/enterprise/settings/modules" },
      ]}
    />
  );
}
