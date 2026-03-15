import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Settings"
      eyebrow="Workspace Settings"
      title="Notifications"
      intro="Control how the workspace communicates alerts, updates, reminders, and important signals."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Alerts", desc: "Surface meaningful enterprise activity without creating noise.", href: "/enterprise/security/audit" },
        { title: "Updates", desc: "Keep teams informed about changes and movement.", href: "/enterprise/chat" },
        { title: "Reminders", desc: "Support follow-through on schedules, missions, and tasks.", href: "/enterprise/schedule" },
        { title: "Communication Rhythm", desc: "Make enterprise communication feel more consistent.", href: "/enterprise/help/workspace-support" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review alert priorities", desc: "Decide what should be emphasized across the workspace.", href: "/enterprise/security/audit" },
        { title: "Reduce notification overload", desc: "Balance visibility with user attention.", href: "/enterprise/help/workspace-support" },
        { title: "Align with operations", desc: "Support meetings, missions, and admin actions.", href: "/enterprise/schedule" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Settings Home", href: "/enterprise/settings" },
        { label: "Schedule", href: "/enterprise/schedule" },
        { label: "Chat", href: "/enterprise/chat" },
      ]}
    />
  );
}
