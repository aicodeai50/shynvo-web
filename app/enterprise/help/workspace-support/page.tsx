"use client";

import EnterpriseDetailPage from "@/components/enterprise/EnterpriseDetailPage";

export default function Page() {
  return (
    <EnterpriseDetailPage
      label="Enterprise Help"
      eyebrow="Help & Support"
      title="Workspace Support"
      intro="Help users understand navigation, structure, and the operating logic of Shynvo Enterprise."
      focusTitle="Focus Areas"
      focusItems={[
        { title: "Navigation Guidance", desc: "Clarify how users move across modules and enterprise sections.", href: "/enterprise" },
        { title: "Structure Support", desc: "Explain how workspace areas relate to each other.", href: "/enterprise/settings/modules" },
        { title: "Usage Understanding", desc: "Reduce confusion about how the product is meant to be used.", href: "/enterprise/help/getting-started" },
        { title: "Operational Flow", desc: "Support smoother movement between overview, control, and execution.", href: "/enterprise/os" },
      ]}
      actionTitle="Recommended Actions"
      actionItems={[
        { title: "Review navigation flow", desc: "Confirm that users can find key enterprise areas.", href: "/enterprise" },
        { title: "Link support with onboarding", desc: "Use getting-started guidance to reduce confusion.", href: "/enterprise/help/getting-started" },
        { title: "Support deeper adoption", desc: "Guide users into settings, missions, and teams.", href: "/enterprise/settings" },
      ]}
      relatedTitle="Related Areas"
      relatedLinks={[
        { label: "Help Home", href: "/enterprise/help" },
        { label: "Getting Started", href: "/enterprise/help/getting-started" },
        { label: "OS Core", href: "/enterprise/os" },
      ]}
    />
  );
}
